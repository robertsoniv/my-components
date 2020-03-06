import { useEffect, useState, useMemo, useCallback } from "react";
import { Auth, Tokens, DecodedToken } from "ordercloud-javascript-sdk";
import { parse, isValid } from "../helpers/token.helpers";

interface UseAuthResult {
  loading: boolean;
  tokenPayload?: DecodedToken;
  error?: Error;
  login: (u: string, p: string) => void;
  logout: () => void;
}

const useAuth = (clientId: string, scope: any[], anonymous?: boolean) => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [decoded, setDecoded] = useState<DecodedToken | undefined>(
    parse(Tokens.GetAccessToken())
  );

  useEffect(() => {
    let unmounted = false;
    setError(undefined);
    if (!isValid(decoded, clientId, anonymous, 30)) {
      Tokens.RemoveAccessToken();
      if (anonymous) {
        setLoading(true);
        Auth.Anonymous(clientId, scope)
          .then(auth => {
            if (unmounted) return;
            setDecoded(parse(auth.access_token));
            Tokens.SetAccessToken(auth.access_token as string);
            setLoading(false);
          })
          .catch(ex => {
            if (unmounted) {
              console.warn(ex);
            } else {
              setError(ex.response.data);
              setLoading(false);
            }
          });
      } else if (decoded) {
        setDecoded(undefined);
      }
    }
    return () => {
      unmounted = true;
    };
  }, [clientId, scope, decoded, anonymous]);

  const handleLogin = useCallback(
    (username: string, password: string) => {
      if (!username)
        return setError(
          '[OC Hooks] > useAuth > handleLogin: "username" is required'
        );
      if (!password)
        return setError(
          '[OC Hooks] > useAuth > handleLogin: "password" is required'
        );
      if (username && password) {
        setLoading(true);
        Auth.Login(username, password, clientId, scope)
          .then(auth => {
            setDecoded(parse(auth.access_token));
            Tokens.SetAccessToken(auth.access_token as string);
            setLoading(false);
          })
          .catch(ex => {
            setError(ex.response.data);
            setLoading(false);
          });
      }
    },
    [clientId, scope]
  );

  const handleLogout = useCallback(() => {
    setDecoded(undefined);
  }, []);

  const result = useMemo((): UseAuthResult => {
    return {
      loading,
      tokenPayload: decoded,
      error,
      login: handleLogin,
      logout: handleLogout
    };
  }, [decoded, error, handleLogin, handleLogout, loading]);

  return result;
};

export default useAuth;
