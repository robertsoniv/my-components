# Password Authentication

```tsx
import { useAuth } from "@ordercloud/react-hooks";

const ORDERCLOUD_CLIENT_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
const ORDERCLOUD_SCOPE = ["Shopper"];

const MyLoginComponent = () => {
  const { loading, error, tokenPayload, login, logout } = useAuth(
    ORDERCLOUD_CLIENT_ID,
    ORDERCLOUD_SCOPE
  );
  const username = "YOUR_USERNAME";
  const password = "YOUR_PASSWORD";

  const handleLogin = (e: React.MouseEvent) => {
    login(username, password);
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <pre>{error}</pre>
  ) : tokenPayload ? (
    <div>
      <button onClick={logout}>Logout</button>
      <pre>{tokenPayload}</pre>
    </div>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
};
```

# Anonymous Authentication

To enable anonymous shopping, the OrderCloud API client must have a `DefaultContextUserName` and `IsAnonBuyer` set to `true`.

```tsx
import { useAuth } from "@ordercloud/react-hooks";

const ORDERCLOUD_CLIENT_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
const ORDERCLOUD_SCOPE = ["Shopper"];

const MyAnonymous = () => {
  const { loading, tokenPayload, error } = useAuth(
    ORDERCLOUD_CLIENT_ID,
    ORDERCLOUD_SCOPE,
    true
  );
  return loading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <pre>{error}</pre>
  ) : (
    <pre>{tokenPayload}</pre>
  );
};
```
