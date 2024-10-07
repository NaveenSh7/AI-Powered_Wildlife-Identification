import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const { loginWithRedirect, isAuthenticated,isLoading,loginWithPopup,logout } = useAuth0();
  
    return (
        <>
       
    <div>
<button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
     <div>
     <button onClick={() => logout({returnTo: "localhost:3000"})}>
      Log Out
    </button>
         </div>
         </>
);

  };

export default Login