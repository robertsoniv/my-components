#Anonymous Authentication
Use this OrderCloud hook when you want to authenticate a react component or application anonymously.

```tsx
import { useAuth } from "@ordercloud/react-hooks";

const CLIENT_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
const SCOPE = ["FullAccess"];

const AnonymousComponent = () => {
  const [user] = useAnonymousAuth(CLIENT_ID, SCOPE);
  return <pre>{JSON.stringfy(user, null, 2)}</pre>;
};
```
