import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, logout, user } = useAuth0();
 
  // Loading state handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="flex flex-row justify-center">
    <button onClick={() => loginWithRedirect()}>Log In</button>
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
    Log Out
    </button>
    </div>
     
      

      {/* Only render if authenticated and user object exists */}
      {isAuthenticated && user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </>
  );
};

export default Login;
