import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { CountUp } from "countup.js";
const PORT = "https://ai-powered-wildlife-identification.onrender.com";

const Info = () => {
  const { isLoading } = useAuth0();

  const [Users, setUsers] = useState(0);
  const [Searches, setSearches] = useState(0);
  const [Reports, setReports] = useState(0);

  // Function to animate counters
  const animateCounters = () => {
    new CountUp("countto1", Users, { duration: 2 }).start();
    new CountUp("countto2", Searches, { duration: 2 }).start();
    new CountUp("countto3", Reports, { duration: 2 }).start();
  };

  // Fetch information from the server
  const GetInfo = async () => {
    try {
      const res = await axios.get(`${PORT}/GetInfo`);

      if (res.data.data1 && res.data.data1.length > 0) {
        const data = res.data.data1[0];
        setUsers(data.Users || 0);
        setSearches(data.Searches || 0);
        setReports(data.Reports || 0);
      } else {
        console.warn("Data1 is empty or undefined.");
      }
    } catch (err) {
      console.error("Couldn't fetch user data", err);
    }
    animateCounters();
  };

  // Effect to fetch data and trigger CountUp animation after state update
  useEffect(() => {
    GetInfo();
    
  }, [isLoading]); // Runs once on mount

  useEffect(() => {
    // Trigger CountUp animation after state has been updated with the fetched values
    if (Users !== 0 || Searches !== 0 || Reports !== 0) {
      animateCounters();
    }
  }, []); // Runs when any of the counters change

  if (isLoading) {
    return (
      <div className="h-96 w-full flex justify-center items-center mb-16 mt-16">
        <div className="flex flex-col items-center">
          <div className="loader w-24 h-64 mb-4"></div>
          <div className="text-2xl font-semibold">Loading . . .</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-2xl rounded-lg my-10">
      <div className="container flex flex-col mx-auto bg-white">
        <div className="flex flex-col items-center gap-16 mx-auto my-32">
                    <div className="flex w-full flex-col md:flex-row justify-center items-center gap-14">

            {/* Total Users */}
            <div className="flex flex-col items-center p-6 bg-green-100 rounded-lg shadow-md">
              <h3 className="text-5xl font-extrabold leading-tight text-center text-gray-900">
                <span id="countto1">{Users}</span>
              </h3>
              <p className="text-base font-medium leading-7 text-center text-gray-600">
                Total Users
              </p>
            </div>
            {/* Total Searches */}
            <div className="flex flex-col items-center p-6 bg-green-100 rounded-lg shadow-md">
              <h3 className="text-5xl font-extrabold leading-tight text-center text-gray-900">
                <span id="countto2">{Searches}</span>
              </h3>
              <p className="text-base font-medium leading-7 text-center text-gray-600">
                Total Searches
              </p>
            </div>
            {/* Reports Submitted */}
            <div className="flex flex-col items-center p-6 bg-green-100 rounded-lg shadow-md">
              <h3 className="text-5xl font-extrabold leading-tight text-center text-gray-900">
                <span id="countto3">{Reports}</span>
              </h3>
              <p className="text-base font-medium leading-7 text-center text-gray-600">
                Reports Submitted
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 my-5">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1">
            More analytics will be added soon (contact me if you're interested to contribute).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
