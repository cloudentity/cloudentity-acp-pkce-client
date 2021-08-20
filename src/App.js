import React, {useState} from 'react'
import createAuthContext from './lib/createAuthContext'


const clientId = process.env.REACT_APP_CLIENT_ID || "c4d8sjf3qv43hjs4k2q0"
const provider = process.env.REACT_APP_PROVIDER || "https://sd.authz.cloudentity.io/sd/default/oauth2"

const {AuthContext, Authenticated, useToken} = createAuthContext({
  clientId,
  provider,
  //client_secret,
  // tokenEndpoint: 'http://localhost:3020/token' // If token endpoint is not "provider + '/token'"
})

function ProtectedStuff() {
  return <Authenticated>
    This message is showed when logged in!
  </Authenticated>
}

function decodeJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base64));
}

const UseAccessTokenWithoutAuthenticated = () => {
  const token = useToken()
  return <p><font color="blue">{(token == null) ? 'null' : JSON.stringify(decodeJwt(token.access_token),null,4)}</font></p>
  // return <p>{JSON.stringify(token.id_token)}</p>
}


const UseTokenWithoutAuthenticated = () => {
  const token = useToken()
  return <p><font color="blue">{(token == null) ? 'null' : JSON.stringify(decodeJwt(token.id_token),null,4)}</font></p>
  // return <p>{JSON.stringify(token.id_token)}</p>
}

function App() {
  const [showProtected, setShowProtected] = useState(false)
  const [showInvalidTokenUse, setShowInvalidTokenUse] = useState(false)

  return (
    <AuthContext>
      <center>
      <p>
        ACP Client SPA uses OAuth2 PKCE login flow to authenticate against Cloudentity Authorization Control Plane.
        Click the button below to initiate login.
      </p>
      <button onClick={() => setShowProtected(!showProtected)}>Login to ACP</button>
      { showProtected && <ProtectedStuff/> }
     
      <br></br><br></br>
      <button onClick={() => setShowInvalidTokenUse(!showInvalidTokenUse)}>Show ID Token</button>
      { showInvalidTokenUse && <UseTokenWithoutAuthenticated />}

      <br></br><br></br>
      <button onClick={() => setShowInvalidTokenUse(!showInvalidTokenUse)}>Show Access Token</button>
      { showInvalidTokenUse && <UseAccessTokenWithoutAuthenticated />}
      
      </center>
    </AuthContext>
  )
}

export default App
