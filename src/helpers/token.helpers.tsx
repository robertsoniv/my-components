import jwtDecode from "jwt-decode";
import { DecodedToken } from "ordercloud-javascript-sdk";

export const parse = (token?: string) => {
  if (!token) return;
  return jwtDecode<DecodedToken>(token);
};

export const isValid = (
  token?: string | DecodedToken,
  clientId?: string,
  anonymous?: boolean,
  expBufferInSeconds?: number
) => {
  if (!token) return false;
  const parsedToken = typeof token === "string" ? parse(token)! : token;
  if (clientId && parsedToken.cid !== clientId.toLowerCase()) return false;
  if (anonymous && !parsedToken.orderid) return false;
  return (
    parsedToken.exp > new Date().getTime() / 1000 + (expBufferInSeconds || 0)
  );
};
