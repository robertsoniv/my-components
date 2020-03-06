import { useEffect, useState, useMemo } from "react";
import { Auth, Me, Tokens, MeUser } from "ordercloud-javascript-sdk";
import jwtDecode from "jwt-decode";

type CurrentUser = MeUser | undefined;

const tokenIsValid = (token: string, clientid: string, scope: any[]) => {
  const parsedToken = jwtDecode<any>(token);
  if (!parsedToken) return false;
  if (!parsedToken.cid || !parsedToken.role) return false;
  if (parsedToken.cid !== clientid.toLowerCase()) return false;
  if (parsedToken.role !== (scope.length > 1 ? scope : scope[0])) return false;
  return true;
};

const useCurrentUser = (clientId: string, scope: any[]) => {
  const [error, setError] = useState<Error | undefined>();
  const [token, setToken] = useState<string | undefined>(
    Tokens.GetAccessToken()
  );
  const [user, setUser] = useState<MeUser | undefined>();

  useEffect(() => {
    let unmounted = false;
    setError(undefined);
    if (token && tokenIsValid(token, clientId, scope)) {
      Me.Get().then(user => {
        if (unmounted) return;
        setUser(user);
      });
    } else {
      Auth.Anonymous(clientId, scope)
        .then(auth => {
          if (unmounted) return;
          setToken(auth.access_token);
          Tokens.SetAccessToken(auth.access_token as string);
          if (auth.refresh_token) {
            Tokens.SetRefreshToken(auth.refresh_token);
          }
        })
        .catch(ex => setError(ex.response.data));
    }
    return () => {
      unmounted = true;
    };
  }, [clientId, scope, token]);

  const result = useMemo((): [CurrentUser, Error | undefined] => {
    return [user, error];
  }, [user, error]);

  return result;
};

export default useCurrentUser;
