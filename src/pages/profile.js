import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function Profile({ user }) {
  return <div>Hello {user.name}, this is a protected page</div>;
});
