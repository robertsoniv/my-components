# Username/Password Authentication

```ts
import { useAuth } from "@ordercloud/react-hooks";

const ORDERCLOUD_CLIENT_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
const ORDERCLOUD_SCOPE = ["FullAccess"];

const MyLoginComponent = () => {
  const [user, login, logout] = useAuth(
    ORDERCLOUD_CLIENT_ID,
    ORDERCLOUD_SCOPE,
    false
  );
  const username = "YOUR_USERNAME";
  const password = "YOUR_PASSWORD";

  return user ? (
    <button onClick={() => logout()}>Logout</button>
  ) : (
    <button onClick={() => login(username, password)}>Login</button>
  );
};
```

# Anonymous Authentication

```ts
import { useAuth } from "@ordercloud/react-hooks";

const ORDERCLOUD_CLIENT_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
const ORDERCLOUD_SCOPE = ["FullAccess"];

const MyAnonymous = () => {
  const [user] = useAuth(ORDERCLOUD_CLIENT_ID, ORDERCLOUD_SCOPE, true);
  return <pre>{JSON.stringfy(user, null, 2)}</pre>;
};
```
