import * as React from "react";
import { storiesOf } from "@storybook/react";
import useAuthNotes from "../notes/useAuth.md";
import { withKnobs, text, array, boolean } from "@storybook/addon-knobs";
import useAuth from "../hooks/useAuth";

const stories = storiesOf("Authentication", module);

const clientId = process.env.STORYBOOK_ANONYMOUS_CLIENT_ID as string;
const scope = (process.env.STORYBOOK_ANONYMOUS_SCOPE as string).split(" ");

stories
  .add(
    "Kitchen Sink",
    () =>
      React.createElement(() => {
        const anonymous = boolean("anonymous", true);
        const { loading, tokenPayload, error, login } = useAuth(
          text("clientid", clientId),
          array("scope", scope),
          anonymous
        );
        React.useEffect(() => {
          if (!anonymous) {
            const username = text("username", "");
            const password = text("password", "");
            login(username, password);
          }
        }, [anonymous]);

        return loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <pre style={{ color: "red" }}>
            {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
          </pre>
        ) : (
          <pre>{JSON.stringify(tokenPayload, null, 2)}</pre>
        );
      }),
    {
      notes: useAuthNotes
    }
  )
  .addDecorator(withKnobs);
