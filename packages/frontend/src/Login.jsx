export const Login = () => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            query: `
            mutation Login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                ... on Session {
                  session
                }
              }
            }
          `,
            variables: {
              email: e.target.login.value,
              password: e.target.password.value,
            },
          }),
        });

        const result = await response.json();

        console.log(result);
      }}
    >
      <input type="text" id="login" name="login" value="john@gmail.com" />
      <input type="password" id="password" name="password" value="123" />
      <button type="Submit">Login</button>
    </form>
  );
};
