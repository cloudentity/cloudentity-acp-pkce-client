# What is It?

This is a client application built in [React](https://reactjs.org/) to authenticate against Cloudentity Authorization Control plane using OAuth2 PKCE login flow. [PKCE Spec](https://tools.ietf.org/html/rfc7636).


# Prerequisites

* The provider url, e.g. `https://<acp-tenant>.authz.cloudentity.io/<acp-tenant>/default/oauth2`
* OAuth2 client credentials (client id),
  where the client is allowed to use the
  [Authorization code grant](https://tools.ietf.org/html/rfc6749#section-4.1).
* A React application, which is supposed to be secured via OAuth2 (or
  rather, needs an `access_token` to authenticate e.g. calls to APIs).

# How To

## Use

First, edit App.js and provide Cloudentity tenant information:

```js
const clientId = "<clientid>"
const provider = "https://<acp-tenant>.authz.cloudentity.io/<acp-tenant>/default/oauth2"

```

Include auth context where needed using `export`:

```js
export { AuthContext, Authenticated, useToken }
```

Next, use the `AuthContext` to wrap anything that may require
an authenticated user / an access token for an authenticated user.
Typically, you would wrap the whole app inside of an `AuthContext`:

```js
function App() {
  return (
    <AuthContext>
      // ... all my other components, e.g. router, pages, etc.
    </AuthContext>
  )
}
```

Thirdly, when implementing a component that requires an authenticated user,
wrap anything you want to protect from the public in an `Authenticated`
component. This will ensure the user gets authanticated, before anything
wrapped by `Authenticated` gets mounted / rendered:

```js
function ProtectedComponent() {
  return (
    <Authenticated>
      <ProtectedComponent />
    </Authenticated>
  )
}
```

Lastly, if you require the access token, you can use the `useToken()` hook:

```js
function ComponentWithToken() {
  const { access_token } = useToken()
  const [data, setData] = useState(null)
  useEffect(() => {
    if (!data) {
      fetchData({ token: access_token }).then(setData)
    }
  }, [access_token])
  return (
    // render the data (or a loading indicator, while data === null)
  )
}
```

## Options

In addition to the required properties (`clientId` etc), the following properties can be specified when calling `createAuthContext()`:

- `busyIndicator`: A React element to be rendered while logging in, e.g. `<Spinner />`.
- `fetch`: HTTP requests to talk to the OAuth2 provider are done using `window.fetch`, unless you specify your own `fetch` function as a property.
- `storage`: By default, authentication information (the token) is kept in `window.sessionStorage`.
- `tokenEndpoint`: The default token endpoint is `${provider}/token`. 

# Run ACP Client

You can run the Cloudentity-acp-pkce-client, after cloning the repo, and:

```bash
npm i
npm run start
```

... then connect to http://localhost:3001.

# Develop

As the Cloudentity-acp-pkce-client runs via `react-scripts`, you
can live-edit the scripts, and the code of this package,
which lives under `./src/lib`.

# Status

It's fully functional, but does not deal with token expiry and/or certain error conditions. 
