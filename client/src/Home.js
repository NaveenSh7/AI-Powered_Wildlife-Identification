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
    const [isSave, setisSave] = useState(false);
    const [isRepo, setisRepo] = useState(false);
    const imageRef = useRef();
    const textInputRef = useRef();
    const fileInputRef = useRef();
    const [toggle, setToggle] = useState(true);
    const { isAuthenticated, isLoading, user } = useAuth0();
      
    const PORT = 5000;
     // report handlling
const [isPopupOpen, setIsPopupOpen] = useState(false);
const [formData2, setFormData2] = useState({  topic:'',  Info: '' });

const openPopup = () => setIsPopupOpen(true);
const closePopup = () => setIsPopupOpen(false);
 



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
        setToggle(false)
        if (model && imageRef.current) {
            try {
                const results = await model.classify(imageRef.current);
                setResults(results);
                console.log(results)
                setAnimalName(results[0].className);
                IncrSearch();
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
        setAnimalInfo('')
        if (animalName === '') {
            return (<p>No animal</p>);
        }
        const namesArray = animalName.split(',').map(name => name.trim());

        namesArray.map(async (val, key) => {
            const title = val;
            const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts|pageimages&exintro&explaintext&format=json&origin=*`;
            const response = await axios.get(url);
            const page = response.data.query.pages;
            const pageId = Object.keys(page)[0];
            if (page[pageId].extract != "") {
                setAnimalInfo(page[pageId].extract);
                return;
            }


        })
        if (animalInfo === '') { setAnimalInfo("couldnt predict properly please upload image again by cropping or with different angle else submit a report") }
        // const title = namesArray[0];

        // const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts|pageimages&exintro&explaintext&format=json&origin=*`;
        // const response = await axios.get(url);
        // const page = response.data.query.pages;
        // const pageId = Object.keys(page)[0];

        // setAnimalInfo(page[pageId].extract);
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


        if (!selectedFile) {
            console.log("No file selected");
            return;
        }
        if (!isAuthenticated) {
            alert("Please Login to Save ur searches");
            return;
        }
        setisSave(true);
        try {
            const formData = new FormData();
            formData.append("image", selectedFile); // Pass the selected file
            formData.append("UserEmail", user.email); // User's email
            formData.append("Name", animalName);

            const response = await axios.put(`http://localhost:${PORT}/SaveImg`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setisSave(false)
            alert("Saved succesfully")
        } catch (err) {
            console.log("Failed to save image from frontend", err);
        }
    };
    //incrementings

    const IncrSearch = () => {
        try {
            axios.put(`http://localhost:${PORT}/IncSearch`, {

            })
        } catch (err) {
            console.log("Couldnt incr search", err);

        }
    }

 // report handling


const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData2({ ...formData2, [name]: value });
};

const handleSubmit = (e) => {
 e.preventDefault();

if (!isAuthenticated) {
            alert("Please Login to Save ur searches");
            return;
        }
        

ReportImg();
 console.log(formData2);
 closePopup(); // Close popup after form submission
};

const ReportImg = async () => {
    setisRepo(true);
    try {

        const formData = new FormData();
       
        formData.append("image", selectedFile); // Pass the selected file
        formData.append("UserEmail", user.email); // User's email
        formData.append("Info", formData2.Info);
        formData.append("topic", formData2.topic);
      

        const response = await axios.put(`http://localhost:${PORT}/ReportImg`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setisSave(false)
        alert("report succesfully")
    } catch (err) {
        console.log("Failed to report image from frontend", err);
    }
    setisRepo(false);
}



const TypingEffect = ({ text, speed }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index += 1;

            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId); // Clean up on unmount
    }, [text, speed]);

    return <p className="text-gray-700 leading-relaxed text-lg">{displayedText}</p>;
};



    return (

        <div className="App flex flex-col items-center bg-[#E9EFEC] p-8 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">AI-Powered Wildlife Identification</h1>
            {/* 1 dabba */}

            {toggle ? (

<div className="inputHolder flex flex-col items-center mb-8 space-y-4">


<label class="w-64 flex flex-col items-center  py-6text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue bg-green-500 text-white py-2 px-4  hover:bg-green-600">
    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
    </svg>
    <a class="mt-2 text-base leading-normal "
        onClick={triggerUpload}
    > Upload Image</a>
    <input type="file" accept="image/*" capture="camera" className="hidden" onChange={uploadImage} ref={fileInputRef} />

</label>
<div className="imageHolder mb-4 flex justify-center">
    {imageURL && (
        <img src={imageURL} alt="Upload Preview" ref={imageRef} className=" h-64 rounded-md shadow-lg" />
    )}
</div>
<button className="relative cursor-pointer h-10 w-36 overflow-hidden border border-green-600 text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80" onClick={identify} disabled={isModelLoading || !imageURL}>
        <span class="relative z-10">Identify !</span>
    </button>

{/* <span className="text-gray-600 text-sm">OR</span>
<input type="text" placeholder="Paste image URL" ref={textInputRef} onChange={handleOnChange} className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" /> */}
</div>

            ):(<>

                  {/* second dabba */}
             <div className='flex flex-col '>
                {/* topbox */}
                <div className=' w-screen  flex  flex-row justify-center '>

                     <div className='flex flex-col gap-5 ml-16 mt-2 w-2/5 items-end '>
                     <button className="relative cursor-pointer h-10 w-36 overflow-hidden border border-black text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80 rounded-lg" onClick={() => { fetchAnimalInfo(animalName) }} disabled={isModelLoading || !animalName} >
                       <span class="relative z-10"> Get Info</span>

                          </button>
                          {
                  !isSave ? (<button className="relative cursor-pointer  h-10 w-36 overflow-hidden border border-black text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80 rounded-lg" onClick={() => { SaveImg() }} >
                      <span class="relative z-10"
                      > Save</span>  </button>) : (<button className=" relative cursor-pointer h-10 w-36 overflow-hidden border border-black text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80 rounded-lg"  >
                          <span class="relative z-10"
                          >Saving...</span>  </button>)
              }
               {
                  !isRepo ? (<button className="relative cursor-pointer  h-10 w-36 overflow-hidden border border-black text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80 rounded-lg" onClick={() => setIsPopupOpen(true)} >
                      <span class="relative z-10"
                      > Report</span>  </button>) : (<button className=" relative cursor-pointer h-10 w-36 overflow-hidden border border-black text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80 rounded-lg"  >
                          <span class="relative z-10"
                          >Reporting...</span>  </button>)
              }
            

                        
                <button className="relative cursor-pointer h-10 w-36 overflow-hidden border border-black text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80 rounded-lg" onClick={() => { 
                          imageRef.current = null;
                        setToggle(true);
                      
                     }}  >
                       <span class="relative z-10"> Identify Again</span>

                          </button>
                     </div>

                     {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Report your finding</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Choose the topic:</label>
                <select
                  name="topic"
                  value={formData2.topic}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                  Select Option 
                  </option>
                  <option value="Option 1">Found a Critically Endangered Specie</option>
                  <option value="Option 2">Found a Extinct Specie</option>
                  <option value="Option 3">Wrong Identification</option>
                  <option value="Option 4">Irrelevant Information</option>
                  <option value="Option 5">Something Else</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold">Provide Details:</label>
                <input
                  type="text"
                  name="Info"
                  value={formData2.info}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
         
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
                

                 

                     <div className='w-3/5 flex justify-center items-center'>
                   
                         <div className="imageHolder mb-4 flex justify-center px-2">
                          {imageURL && (
                           <img src={imageURL} alt="Upload Preview" ref={imageRef} className="h-72 rounded-md shadow-lg overflow-hidden" />
                         )}
                           </div>
                     </div>



                            <div className="mainWrapper flex flex-col w-3/5 items-start ">
                              {results.length > 0 && (
                           <div className="resultsHolder grid grid-rows-1 sm:grid-rows-3 gap-4 ">
                               {results.slice(0, 3).map((result, index) => (
                                   <div key={result.className} className="bg-white p-2 rounded-lg shadow-md text-center">
                                       <span className="block text-lg font-bold text-gray-700">{result.className}</span>
                                       <span className="text-sm text-gray-500">
                                           Confidence level: {(result.probability * 100).toFixed(2)}%
                                           {index === 0 && <span className="text-green-500"> (Best Guess)</span>}
                                       </span>
                                   </div>
                               ))}
                           </div>
                       )}
              
                     </div>
                           </div>

       

                </div>



                 {/* btmBox */}
                 <div className='flex flex-col justify-center items-center '>
    {animalInfo && (<>
   
         <div className="flex justify-center text-3xl font-bold text-green-800  mt-6 bg-white px-16 p-2 rounded-lg shadow-lg">
         {animalName}
     </div>
        <div className="animalInfo mt-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
           
            <TypingEffect text={animalInfo} speed={20} /> {/* Adjust speed as needed */}
        </div>
        </>
    )}
</div>



             

              


              
                    
                  
               
                  

                





           </>)}
           
      

            
             
            
           


        </div>
    );
};

export default Home;





{/* <input type="file" accept="image/*" capture="camera" className="hidden" onChange={uploadImage} ref={fileInputRef} />
                <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600" onClick={triggerUpload}>
                    Upload Image
                </button> */}


























//                 import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import * as mobilenet from "@tensorflow-models/mobilenet";
// import * as tf from '@tensorflow/tfjs';
// import './Loader.css'
// import { useAuth0 } from "@auth0/auth0-react";
// import Sidebar from './Sidebar.js';
// import Slider from './Slider.js';
// const Home = () => {
//     const [isModelLoading, setIsModelLoading] = useState(false);
//     const [model, setModel] = useState(null);
//     const [imageURL, setImageURL] = useState(null);
//     const [results, setResults] = useState([]);
//     const [history, setHistory] = useState([]);
//     const [animalName, setAnimalName] = useState('');
//     const [animalInfo, setAnimalInfo] = useState('');
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isSave, setisSave] = useState(false);
//     const imageRef = useRef();
//     const textInputRef = useRef();
//     const fileInputRef = useRef();
//     const [toggle, setToggle] = useState(true);
//     const { isAuthenticated, isLoading, user } = useAuth0();
//     const PORT = 5000;


//     const setTensorFlowBackend = async () => {
//         try {
//             await tf.setBackend('webgl');
//             console.log('TensorFlow.js backend set to WebGL');
//         } catch (error) {
//             console.error('Error setting backend:', error);
//         }
//     };

//     const loadModel = async () => {
//         await setTensorFlowBackend();
//         setIsModelLoading(true);
//         try {
//             const model = await mobilenet.load();
//             setModel(model);
//             setIsModelLoading(false);
//             console.log("Model loaded successfully!");
//         } catch (error) {
//             console.error("Error loading model:", error);
//             setIsModelLoading(false);
//         }
//     };

//     const uploadImage = (e) => {
//         const { files } = e.target;
//         if (files.length > 0) {
//             const url = URL.createObjectURL(files[0]);
//             setImageURL(url);
//             setSelectedFile(files[0]);
//         } else {
//             setImageURL(null);
//         }
//     };

//     const identify = async () => {
//         // textInputRef.current.value = '';
//         setToggle(false)
//         if (model && imageRef.current) {
//             try {
//                 const results = await model.classify(imageRef.current);
//                 setResults(results);
//                 console.log(results)
//                 setAnimalName(results[0].className);
//                 IncrSearch();
//             } catch (error) {
//                 console.error('Error during classification:', error);
//             }
//         } else {
//             console.error('Model is not loaded yet or image is missing');
//         }
//     };

//     const handleOnChange = (e) => {
//         setImageURL(e.target.value);
//         setResults([]);
//     };

//     const triggerUpload = () => {
//         fileInputRef.current.click();
//     };

//     useEffect(() => {
//         loadModel();
//     }, []);

//     useEffect(() => {
//         if (imageURL) {
//             setHistory((prevHistory) => [imageURL, ...prevHistory].slice(0, 5));
//         }
//     }, [imageURL]);

//     const capitalizeFirstLetterOfEachWord = (input) => {
//         const firstName = input.split(',')[0].trim();
//         return firstName.split(' ')
//             .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//             .join(' ');
//     };
//     //wiki api
//     const fetchAnimalInfo = async () => {
//         setAnimalInfo('')
//         if (animalName === '') {
//             return (<p>No animal</p>);
//         }
//         const namesArray = animalName.split(',').map(name => name.trim());

//         namesArray.map(async (val, key) => {
//             const title = val;
//             const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts|pageimages&exintro&explaintext&format=json&origin=*`;
//             const response = await axios.get(url);
//             const page = response.data.query.pages;
//             const pageId = Object.keys(page)[0];
//             if (page[pageId].extract != "") {
//                 setAnimalInfo(page[pageId].extract);
//                 return;
//             }


//         })
//         if (animalInfo === '') { setAnimalInfo("couldnt predict properly please upload image again by cropping or with different angle else submit a report") }
//         // const title = namesArray[0];

//         // const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts|pageimages&exintro&explaintext&format=json&origin=*`;
//         // const response = await axios.get(url);
//         // const page = response.data.query.pages;
//         // const pageId = Object.keys(page)[0];

//         // setAnimalInfo(page[pageId].extract);
//     };

//     // if (isModelLoading) {
//     //     return (
//     //         <div className=" h-96 w-full flex justify-center items-center mb-16 mt-16 ">
//     //             <div className="flex flex-col items-center">
//     //                 {/* Adjusted loader size */}
//     //                 <div className="loader w-24 h-64 mb-4"></div> 
//     //                 <div className="text-2xl font-semibold">Loading . . . .</div>
//     //             </div>
//     //         </div>
//     //     );
//     // }

//     // Saving img function on the frontend
//     const SaveImg = async () => {


//         if (!selectedFile) {
//             console.log("No file selected");
//             return;
//         }
//         if (!isAuthenticated) {
//             alert("Please Login to Save ur searches");
//             return;
//         }
//         setisSave(true);
//         try {
//             const formData = new FormData();
//             formData.append("image", selectedFile); // Pass the selected file
//             formData.append("UserEmail", user.email); // User's email
//             formData.append("Name", animalName);

//             const response = await axios.put(`http://localhost:${PORT}/SaveImg`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             setisSave(false)
//             alert("Saved succesfully")
//         } catch (err) {
//             console.log("Failed to save image from frontend", err);
//         }
//     };
//     //incrementings

//     const IncrSearch = () => {
//         try {
//             axios.put(`http://localhost:${PORT}/IncSearch`, {

//             })
//         } catch (err) {
//             console.log("Couldnt incr search", err);

//         }
//     }


//     return (

//         <div className="App flex flex-col items-center bg-[#E9EFEC] p-8 min-h-screen">
//             <h1 className="text-4xl font-bold text-gray-800 mb-8">AI-Powered Wildlife Identification</h1>
//             {/* 1 dabba */}

//             {toggle ? (

// <div className="inputHolder flex flex-col items-center mb-8 space-y-4">


// <label class="w-64 flex flex-col items-center  py-6text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue bg-green-500 text-white py-2 px-4  hover:bg-green-600">
//     <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//         <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
//     </svg>
//     <a class="mt-2 text-base leading-normal "
//         onClick={triggerUpload}
//     > Upload Image</a>
//     <input type="file" accept="image/*" capture="camera" className="hidden" onChange={uploadImage} ref={fileInputRef} />

// </label>
// <div className="imageHolder mb-4 flex justify-center">
//     {imageURL && (
//         <img src={imageURL} alt="Upload Preview" ref={imageRef} className=" h-64 rounded-md shadow-lg" />
//     )}
// </div>
// <button className="relative cursor-pointer h-10 w-36 overflow-hidden border border-green-600 text-green-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-green-600 before:duration-300 before:ease-out hover:text-white hover:shadow-green-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80" onClick={identify} disabled={isModelLoading || !imageURL}>
//         <span class="relative z-10">Identify !</span>
//     </button>

// {/* <span className="text-gray-600 text-sm">OR</span>
// <input type="text" placeholder="Paste image URL" ref={textInputRef} onChange={handleOnChange} className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" /> */}
// </div>

//             ):(<>
//                   {/* second dabba */}
//              <div className='flex flex-col'>
//                 {/* topbox */}
//                 <div>

//                      <div></div>
//                      <div></div>
//                      <div></div>



//                 </div>




//                  {/* btmBox */}
//                 <div></div>
//                 <div className="mainWrapper flex flex-col items-center">
//                      <div className="mainContent">
//                      <div className="imageHolder mb-4 flex justify-center">
//                       {imageURL && (
//                           <img src={imageURL} alt="Upload Preview" ref={imageRef} className=" h-64 rounded-md shadow-lg" />
//                       )}
//                          </div>
                 


//                      </div>
              
//                   </div>
//                   {results.length > 0 && (
//                   <div className="resultsHolder grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//                       {results.slice(0, 3).map((result, index) => (
//                           <div key={result.className} className="bg-white p-4 rounded-lg shadow-md text-center">
//                               <span className="block text-xl font-bold text-gray-700">{result.className}</span>
//                               <span className="text-sm text-gray-500">
//                                   Confidence level: {(result.probability * 100).toFixed(2)}%
//                                   {index === 0 && <span className="text-green-500"> (Best Guess)</span>}
//                               </span>
//                           </div>
//                       ))}
//                   </div>
//               )}
              
//                  <div className="mt-8 text-lg">
//               <p className="font-bold">Name:</p>
//               {animalName}
//                 </div>
//                     <button className="relative cursor-pointer h-10 w-36 overflow-hidden border border-green-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80" onClick={() => { fetchAnimalInfo(animalName) }} disabled={isModelLoading || !animalName} >
//                        <span class="relative z-10"> Get Info</span>

//                           </button>

//                   <div>
//               {
//                   !isSave ? (<button className="relative cursor-pointer mt-4 h-10 w-36 overflow-hidden border border-green-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80" onClick={() => { SaveImg() }} >
//                       <span class="relative z-10"
//                       > Save</span>  </button>) : (<button className=" relative cursor-pointer mt-4 h-10 w-36 overflow-hidden border border-green-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80"  >
//                           <span class="relative z-10"
//                           >Saving...</span>  </button>)
//               }
//                </div>
//                     <button className="relative cursor-pointer h-10 w-36 overflow-hidden border border-green-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80" onClick={() => { 
//                           imageRef.current = null;
//                         setToggle(true);
                      
//                      }}  >
//                        <span class="relative z-10"> Identify Again</span>

//                           </button>

//                   <div>
//                 </div>





//                    {animalInfo && (
//                    <div className="animalInfo mt-6 bg-white p-4 rounded-md shadow-md">
//                     <h3 className="text-2xl font-bold text-gray-700 mb-2">Animal Info:</h3>
//                   <p className="text-gray-600">{animalInfo}</p>
//                     </div>
//                  )}
//             </div></>)}
           
      

            
             
            
           


//         </div>
//     );
// };

// export default Home;




