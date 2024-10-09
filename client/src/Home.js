import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';
import './Loader.css'
import { useAuth0 } from "@auth0/auth0-react";
const Home = () => {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([]);
    const [history, setHistory] = useState([]);
    const [animalName, setAnimalName] = useState('');
    const [animalInfo, setAnimalInfo] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const imageRef = useRef();
    const textInputRef = useRef();
    const fileInputRef = useRef();

    const { loginWithRedirect, isAuthenticated,isLoading,loginWithPopup,logout,user } = useAuth0();

    const setTensorFlowBackend = async () => {
        try {
            await tf.setBackend('webgl');
            console.log('TensorFlow.js backend set to WebGL');
        } catch (error) {
            console.error('Error setting backend:', error);
        }
    };

    const loadModel = async () => {
        await setTensorFlowBackend();
        setIsModelLoading(true);
        try {
            const model = await mobilenet.load();
            setModel(model);
            setIsModelLoading(false);
            console.log("Model loaded successfully!");
        } catch (error) {
            console.error("Error loading model:", error);
            setIsModelLoading(false);
        }
    };

    const uploadImage = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageURL(url);
            setSelectedFile(files[0]);
        } else {
            setImageURL(null);
        }
    };

    const identify = async () => {
        // textInputRef.current.value = '';
        if (model && imageRef.current) {
            try {
                const results = await model.classify(imageRef.current);
                setResults(results);
                console.log(results)
                setAnimalName(results[0].className);
            } catch (error) {
                console.error('Error during classification:', error);
            }
        } else {
            console.error('Model is not loaded yet or image is missing');
        }
    };

    const handleOnChange = (e) => {
        setImageURL(e.target.value);
        setResults([]);
    };

    const triggerUpload = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        loadModel();
    }, []);

    useEffect(() => {
        if (imageURL) {
            setHistory((prevHistory) => [imageURL, ...prevHistory].slice(0, 5));
        }
    }, [imageURL]);

    const capitalizeFirstLetterOfEachWord = (input) => {
        const firstName = input.split(',')[0].trim();
        return firstName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
//wiki api
    const fetchAnimalInfo = async () => {
        if (animalName === '') {
            return (<p>No animal</p>);
        }
        const namesArray = animalName.split(',').map(name => name.trim());
        const title = namesArray[0];

        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts|pageimages&exintro&explaintext&format=json&origin=*`;
        const response = await axios.get(url);

        const page = response.data.query.pages;
        const pageId = Object.keys(page)[0];
        setAnimalInfo(page[pageId].extract);
    };

    if (isModelLoading) {
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
    
   // Saving img function on the frontend
   const SaveImg = async () => {
    console.log("Image Upload Initiated");

    if (!selectedFile) {
        console.log("No file selected");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("image", selectedFile); // Pass the selected file
        formData.append("UserEmail", "naveen@gmail.com"); // User's email

        const response = await axios.put("http://localhost:5000/SaveImg", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Saved succesfully")
    } catch (err) {
        console.log("Failed to save image from frontend", err);
    }
};

    

    return (
        <div className="App flex flex-col items-center bg-[#E9EFEC] p-8 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">AI-Powered Wildlife Identification</h1>

            <div className="inputHolder flex flex-col items-center mb-8 space-y-4">
                <input type="file" accept="image/*" capture="camera" className="hidden" onChange={uploadImage} ref={fileInputRef} />
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600" onClick={triggerUpload}>
                    Upload Image
                </button>
                {/* <span className="text-gray-600 text-sm">OR</span>
                <input type="text" placeholder="Paste image URL" ref={textInputRef} onChange={handleOnChange} className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" /> */}
            </div>

            <div className="mainWrapper flex flex-col items-center">
                <div className="mainContent">
                    <div className="imageHolder mb-4">
                        {imageURL && (
                            <img src={imageURL} alt="Upload Preview" ref={imageRef} className="w-56 h-56 rounded-md shadow-lg" />
                        )}
                    </div>
                    {results.length > 0 && (
                        <div className="resultsHolder grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                            {results.slice(0, 3).map((result, index) => (
                                <div key={result.className} className="bg-white p-4 rounded-lg shadow-md text-center">
                                    <span className="block text-xl font-bold text-gray-700">{result.className}</span>
                                    <span className="text-sm text-gray-500">
                                        Confidence level: {(result.probability * 100).toFixed(2)}%
                                        {index === 0 && <span className="text-green-500"> (Best Guess)</span>}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button className="relative cursor-pointer h-10 w-36 overflow-hidden border border-green-600 text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80" onClick={identify} disabled={isModelLoading || !imageURL}>
                <span class="relative z-10">Identify !</span>
                </button>
            </div>

            <div className="mt-8 text-lg">
                <p className="font-bold">Name:</p> 
                {animalName}
            </div>
            <button className="relative cursor-pointer h-10 w-36 overflow-hidden border border-green-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80" onClick={() => { fetchAnimalInfo(animalName) }} disabled={isModelLoading || !animalName} >
            <span class="relative z-10"> Get Info</span>
              
            </button>

            <button className="relative cursor-pointer mt-4 h-10 w-36 overflow-hidden border border-green-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80" onClick={()=>{SaveImg()}} >
            <span class="relative z-10"> Save</span>

           
              
            </button>

            {animalInfo && (
                <div className="animalInfo mt-6 bg-white p-4 rounded-md shadow-md">
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">Animal Info:</h3>
                    <p className="text-gray-600">{animalInfo}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
