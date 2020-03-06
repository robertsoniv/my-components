import * as React from "react";
import { storiesOf } from "@storybook/react";
// import useAuth from "../hooks/useAuth";
import useAnonymousAuthNotes from "../notes/useAnonymousAuth.md";
import useAnonymousAuth from "../hooks/useAnonymousAuth";
import { withKnobs, text, array } from "@storybook/addon-knobs";

const stories = storiesOf("Authentication", module);

const clientId = process.env.STORYBOOK_ANONYMOUS_CLIENT_ID as string;
const scope = (process.env.STORYBOOK_ANONYMOUS_SCOPE as string).split(" ");

stories
  .add(
    "Anonymous",
    () =>
      React.createElement(() => {
        const [user, error] = useAnonymousAuth(
          text("clientid", clientId),
          array("scope", scope)
        );
        return error ? (
          <pre style={{ color: "red" }}>{JSON.stringify(error, null, 2)}</pre>
        ) : (
          <pre>{JSON.stringify(user, null, 2)}</pre>
        );
      }),
    {
      notes: useAnonymousAuthNotes
    }
  )
  .addDecorator(withKnobs);

// stories.add("Login", () =>
//   React.createElement(() => {
//     const clientId = process.env.STORYBOOK_ANONYMOUS_CLIENT_ID as string;
//     const scope = process.env.STORYBOOK_ANONYMOUS_SCOPE as string;
//     const [error, setError] = React.useState<any>();
//     const [user, login, logout] = useAuth(clientId, scope.split(","));
//     const username = React.createRef<HTMLInputElement>();
//     const password = React.createRef<HTMLInputElement>();

//     const handleSubmit = React.useCallback(
//       async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (
//           username.current &&
//           username.current.value &&
//           password.current &&
//           password.current.value
//         ) {
//           setError(undefined);
//           try {
//             await login(username.current.value, password.current.value);
//           } catch (ex) {
//             setError(ex);
//           }
//         }
//       },
//       [login, username, password]
//     );

//     return user ? (
//       <React.Fragment>
//         <button type="button" onClick={() => logout()}>
//           Logout
//         </button>
//         <pre>{JSON.stringify(user, null, 2)}</pre>
//       </React.Fragment>
//     ) : (
//       <form id="" onSubmit={handleSubmit}>
//         <label htmlFor="#username">Username:</label>
//         <input
//           id="username"
//           name="username"
//           type="text"
//           required
//           ref={username}
//         />
//         <label htmlFor="#password">Password:</label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           required
//           ref={password}
//         />
//         <button type="submit">Login</button>
//         {error && (
//           <pre style={{ color: "red" }}>
//             {JSON.stringify(error.response.data, null, 2)}
//           </pre>
//         )}
//       </form>
//     );
//   })
// );

// stories.add("Anonymous", () =>
//   React.createElement(() => {
//     const clientId = process.env.STORYBOOK_ANONYMOUS_CLIENT_ID as string;
//     const scope = process.env.STORYBOOK_ANONYMOUS_SCOPE as string;
//     debugger;
//     const [user] = useAuth(clientId, scope.split(","), true);
//     return <pre>{JSON.stringify(user, null, 2)}</pre>;
//   })
// );
