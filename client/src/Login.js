import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const { loginWithRedirect, isAuthenticated,isLoading,logout,user } = useAuth0();
console.log(user)
if (isLoading) {
  return <div>Loading...</div>;
}

if (!isAuthenticated) {
  return <div>User is not authenticated

<button
                className="text-black-700 hover:text-white border border-black-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-green-400 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-900"
                onClick={() => {
                  loginWithRedirect();
                  
                }}
              >
                Login 
              </button>

  </div>;
}
  
    return (
        <>
    
    <div class="flex justify-center w-screen flex-row items-center h-20 ">
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
<button onClick={() => loginWithRedirect()}>Log In</button>

     
     <button onClick={() => logout({returnTo: "localhost:3000"})}>
      Log Out
    </button>
        
    </div>
  
         </>
);

  };

export default Login