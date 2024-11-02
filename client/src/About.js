import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const About = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, logout, user } = useAuth0();

 
  // Loading state handling
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

  return (
    <>
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg my-10">
      
      <p className="text-lg text-gray-700 mb-6">
        Welcome to my AI-Powered Wildlife Identification Platform—a space designed to bring the world of wildlife closer to you. 
        My mission is to help people discover, identify, and learn about various animal species in an accessible and engaging way, 
        using the power of AI.
      </p>
      
      <h2 className="text-2xl font-semibold text-green-600 mb-4">What I Do</h2>
      <p className="text-gray-700 mb-6">
        This platform allows users to upload images of wildlife, which my AI model, powered by TensorFlow.js, analyzes to predict the species. 
        In just moments, users receive not only the animal’s name but also a wealth of information sourced from reliable resources like Wikipedia. 
        This educational experience gives people, from casual nature lovers to wildlife enthusiasts, a deeper understanding and appreciation for 
        the animal kingdom.
      </p>
      
      <h2 className="text-2xl font-semibold text-green-600 mb-4">My Goals</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
        <li>
          <strong>Educate and Inspire:</strong> By providing accurate and detailed information, I aim to inspire users to learn more about wildlife and the vital role it plays in our ecosystem.
        </li>
        <li>
          <strong>Accessible Wildlife Knowledge:</strong> I strive to make wildlife knowledge available to everyone, whether you’re a seasoned naturalist or a curious beginner.
        </li>
        <li>
          <strong>Support Conservation Efforts:</strong> By identifying species that may be at risk, users can make informed decisions and take actions that support wildlife conservation.
        </li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-green-600 mb-4">Future Scope</h2>
      <p className="text-gray-700 mb-6">
        I envision building a vibrant community of wildlife enthusiasts and conservation advocates. In the future, this platform aims to:
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>
          <strong>Connect Like-Minded People:</strong> Build a global community of nature lovers who can share their findings, experiences, and conservation efforts.
        </li>
        <li>
          <strong>Contribute to Wildlife Conservation:</strong> Enable users to report sightings of endangered species, helping contribute to conservation research.
        </li>
        <li>
          <strong>Expand Identification Capabilities:</strong> Continuously improve the AI model to recognize a wider range of species, including those with critical conservation status.
        </li>
      </ul>
      
      <p className="text-lg text-gray-700 mt-6">
        Join me in exploring the wonders of the wild and become part of a community that values and protects our planet’s biodiversity!
      </p>
    </div>
    </>
  );
};

export default About;
