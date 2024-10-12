import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const PORT = 5000;
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [saved , setsaved] = useState([]);
  //getting user data
 const limit = 7;
  const GetUser = async () => {
    
    try {
        const res = await axios.get(`http://localhost:${PORT}/GetUser`, {
            params: { UserEmail: user.email } // Pass UserEmail as query parameter
        });
        console.log(res.data.data1.Saved); 
        setsaved(res.data.data1.Saved);
        console.log(saved)
    } catch (err) {
        console.log("didn't get user data", err);
    }
};

useEffect(() => {
    GetUser(); 
}, [isAuthenticated]);

 
  if (isLoading ) {
    return <div>Loading ...</div>;
  }
  if (!isAuthenticated) {
    return <div>Login first</div>;
  }
     




  return (
    <>
    <div className="bg-[#E9EFEC] ">


    <div className="pt-8  ">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="Profile"
                    src={user.picture}
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  >
                  </img>
                </div>
              </div>
              <div className="w-full px-4 text-center mt-16">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {saved.length}
                    </span>
                    <span className="text-sm text-blueGray-400">Findings Saved</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-sm text-blueGray-400">Reports Filed</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                    0
                    </span>
                    <span className="text-sm text-blueGray-400">Contribution</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2">
              <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                {user?.name || "Jenna Stones"}
              </h3>

            </div>
           
              </div>
            </div>
          </div>     
    </div>

    <div className="flex flex-row w-screen justify-center space-x-20 ">

      <div className="w-1/3 basis-1/3  bg-blueGray-50  bg-white  shadow-xl">
          
      <div className="flex justify-center mb-6 mt-4">
  <p className="text-base md:text-xl font-medium text-gray-800 m-auto">Saved Findings</p>
</div>


{ saved.slice().reverse().map((val, key) => (
  
              <div key={key} className="shadow hover:shadow-md w-8/12 bg-white rounded-lg overflow-hidden cursor-pointer m-auto mb-8">
                <img
                  className="object-cover w-full h-48"
                  src={val.Url} // Image URL
                  alt="Saved finding"
                />
                <div className="relative p-4">
                  <h3 className="text-base md:text-xl font-medium text-gray-800">
                    {val.Name} {/* Title */}
                  </h3>
                </div>
              </div>
            ))}

          
  
              </div>
           <div className="w-1/3 basis-1/3 mb-2 bg-blueGray-50  bg-white  shadow-xl">
           <div className="flex justify-center mb-6 mt-4">  <p class="text-base md:text-xl font-medium text-gray-800 m-auto"> Reports</p>   </div> 

           <div class="flex flex-col xl:flex-row shadow hover:shadow-md w-96 m-auto bg-white rounded-lg overflow-hidden cursor-pointer mt-8 mb-8">
	            <img
	           	 class="object-cover w-full h-48"
	       	 src="https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=420&q=80"
	         	 alt="Flower and sky"
	         	 />

           <div class="relative p-4">
	          <h3 class="text-base md:text-xl font-medium text-gray-800">
	        	This is card title
	          </h3>

	  <p class="mt-4 text-base md:text-lg text-gray-600">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit ad assumenda.
	  </p>
                	</div>

                  </div >
               
                  <div class="flex flex-col xl:flex-row shadow hover:shadow-md w-96 m-auto bg-white rounded-lg overflow-hidden cursor-pointer mt-8 mb-8">
	            <img
	           	 class="object-cover w-full h-48"
	       	 src="https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=420&q=80"
	         	 alt="Flower and sky"
	         	 />

           <div class="relative p-4">
	          <h3 class="text-base md:text-xl font-medium text-gray-800">
	        	This is card title
	          </h3>

	  <p class="mt-4 text-base md:text-lg text-gray-600">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit ad assumenda.
	  </p>
                	</div>

                  </div>

                  
  
              </div>
    </div>
    </div>
</>
  );
};

export default Profile;
