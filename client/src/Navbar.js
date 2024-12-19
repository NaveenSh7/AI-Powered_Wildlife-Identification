import React from 'react'
import {useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
const Navbar = ()=>{
    const { loginWithRedirect,loginWithPopup, isAuthenticated, isLoading, logout, user } = useAuth0();
	const PORT = "http://localhost:5000";
	const Loginfun = async () => {
		  await loginWithPopup();
	  
		  
	  };

	  useEffect(() => {
		if (isAuthenticated && user) {
		  axios.post(`${PORT}/SaveUser`, {
			UserEmail: user.email,
			UserName: user.name,
		  }).then(response => {
			console.log("User saved:", response.data);
		  }).catch(error => {
			console.error("Error saving user:", error);
		  });
		}
	  }, [isAuthenticated, user]);

    return(
    <>
    
<nav class="bg-[#396b58] shadow shadow-gray-300 w-100 px-8 md:px-auto ">
	<div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
		
		<div class="text-white md:order-1">
			
			<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
			</svg>
		</div>
		<div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
			<ul class="flex font-semibold justify-between text-lg">
              
				<li class="md:px-4 md:py-2 hover:text-white text-[#000000] bold"><a href="/">Search</a></li>
				<li class="md:px-4 md:py-2 hover:text-white text-[#000000] bold"><a href="/About">About</a></li>
				<li class="md:px-4 md:py-2 hover:text-white text-[#000000] bold"><a href="/Contact">Contact-me</a></li>
			</ul>
		</div>
		<div class="order-2 md:order-3">
			<div class="px-4 py-2 bg-white hover:bg-[#1a2822] hover:text-white text-black rounded-xl flex items-center gap-2 cursor-pointer">

               
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>

				{isAuthenticated ? (
                  <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                            Log Out
                          </button>
						  
                      ) : (
                    <button onClick={Loginfun}>
                         Log In
                   </button>
)}


            </div>
		</div>
	</div>
</nav>
    </>
    );
}

export default Navbar