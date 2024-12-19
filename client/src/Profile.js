import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const PORT = "https://ai-powered-wildlife-identification.onrender.com";
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [saved, setsaved] = useState([]);
  const [Report, setReport] = useState([]);
  //getting user data
  const limit = 7;
  const GetUser = async () => {

    try {
      const res = await axios.get(`${PORT}/GetUser`, {
        params: { UserEmail: user.email } // Pass UserEmail as query parameter
      });
      console.log(res.data.data1.Saved);
      setsaved(res.data.data1.Saved);
      setReport(res.data.data1.Reports)
      console.log(saved)
    } catch (err) {
      console.log("didn't get user data", err);
    }
  };

  useEffect(() => {
    GetUser();
  }, [isAuthenticated]);


  if (isLoading) {
    return (
      <div className=" h-96 w-full flex justify-center items-center mb-16 mt-16 ">
        <div className="flex flex-col items-center">
          {/* Adjusted loader size */}
          <div className="loader w-24 h-64 mb-4"></div>
          <div className="text-2xl font-semibold">Loading . . . .</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-md text-xl font-semibold text-gray-800">
          Please <span className="text-green-600">login</span> first
        </div>
      </div>
    );
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
                          {Report.length}
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


            {saved.slice().reverse().map((val, key) => (

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
            {Report.slice().reverse().map((val, key) => (
              <div class="flex flex-col xl:flex-row shadow hover:shadow-md w-96 m-auto bg-white rounded-lg overflow-hidden cursor-pointer mt-8 mb-8">
              <img
                class="object-cover w-1/3 h-48"
                src={val.Url}
                alt="Flower and sky"
              />

              <div class="relative p-4">
                <h3 class="text-base md:text-xl font-medium text-gray-800">
                  {val.Topic}
                </h3>

                <p class="mt-4 text-base md:text-lg text-gray-600">
                 {val.Data}
                </p>
              </div>

            </div >

))}
            





          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
