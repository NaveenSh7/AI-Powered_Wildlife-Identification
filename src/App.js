import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';

function App() {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([]);
    const [history, setHistory] = useState([]);

    const [animalName, setAnimalName] = useState('');
    const [animalInfo, setAnimalInfo] = useState('');

    const imageRef = useRef();
    const textInputRef = useRef();
    const fileInputRef = useRef();


    const setTensorFlowBackend = async () => {
        try {
            await tf.setBackend('webgl');  // You can also try 'cpu' or 'wasm'
            console.log('TensorFlow.js backend set to WebGL');
        } catch (error) {
            console.error('Error setting backend:', error);
        }
    };

    const loadModel = async () => {
        await setTensorFlowBackend();  // Ensure backend is set before loading the model
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
        } else {
            setImageURL(null);
        }
    };

    const identify = async () => {
        textInputRef.current.value = '';
        if (model && imageRef.current) {
            try {
                const results = await model.classify(imageRef.current);
                setResults(results);
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

    if (isModelLoading) {
        return <h2>Model Loading...</h2>;
    }
    //capitalize


    const capitalizeFirstLetterOfEachWord = (input) => {
        const firstName = input.split(',')[0].trim();
        return firstName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    
    //Wiki api

    const fetchAnimalInfo = async () => {
        if (animalName === '') {
            return (<p>No animal</p>)
        }
        const namesArray = animalName.split(',').map(name => name.trim());
        console.log(namesArray)
        //  const title = capitalizeFirstLetterOfEachWord(animalName);
        const title = namesArray[0];

        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts|pageimages&exintro&explaintext&format=json&origin=*`;
        console.log(url)
        const response = await axios.get(url);

        const page = response.data.query.pages;
        const pageId = Object.keys(page)[0];
        setAnimalInfo(page[pageId].extract)
        console.log(page[pageId].extract)

    };





    return (
        <div className="App">
            <h1 className="header">AI-Powered Wildlife Identification</h1>
            <div className="inputHolder">
                <input type="file" accept="image/*" capture="camera" className="uploadInput" onChange={uploadImage} ref={fileInputRef} />
                <button className="uploadImage" onClick={triggerUpload}>Upload Image</button>
                <span className="or">OR</span>
                <input type="text" placeholder="Paste image URL" ref={textInputRef} onChange={handleOnChange} />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} style={{ width: '224px', height: '224px' }} />}
                    </div>
                    {results.length > 0 && (
                        <div className="resultsHolder">
                            {results.map((result, index) => (
                                <div className="result" key={result.className}>
                                    <span className="name">{result.className}</span>
                                    <span className="confidence">Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className="bestGuess">Best Guess</span>}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button className="button" onClick={identify} disabled={isModelLoading || !imageURL}>
                    {isModelLoading ? 'Loading Model...' : 'Identify Image'}
                </button>
            </div>
            <div>
                Name : {animalName}
            </div>
            <button className="button" onClick={() => { fetchAnimalInfo(animalName) }} disabled={isModelLoading || !animalName} >
                Get Info
            </button>

            {animalInfo && (
                <div className="animalInfo">
                    <h3>Animal Info:</h3>
                    <p>{animalInfo}</p>
                </div>
            )}

            {/* {history.length > 0 && (
                <div className="recentPredictions">
                    <h2>Recent Images</h2>
                    <div className="recentImages">
                        {history.map((image, index) => (
                            <div className="recentPrediction" key={`${image}${index}`}>
                                <img src={image} alt="Recent Prediction" onClick={() => setImageURL(image)} />
                            </div>
                        ))}
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default App;
