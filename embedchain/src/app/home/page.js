"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { handleFetch, baseUrl }  from "../../api";
import DataSourceInput from './dataInput';

const HomePage = () => {
  const [hasOpenAIKey, setHasOpenAIKey] = useState(false);

  const [openAIKey, setOpenAIKey] = useState('');

  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmitKey = (e) => {
    e.preventDefault();

    console.log("authenticating open ai key ", openAIKey);
    sendOpenAIKey(openAIKey);
  };

  const handleQuery = async (query) => {
    setChatHistory((prevHistory) => [...prevHistory, query]);
    var botResponse = await askQuestion(query);
    console.log("Answer", botResponse.response);
    setChatHistory((prevHistory) => [...prevHistory, botResponse.response]);
  };

  const getOpenAIKey = async () => {
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    try {
        const response = await handleFetch(baseUrl + "key/", options);
        if (!response.ok) {
            console.log("Getting key failed with ", response.status);
            return;
        } else {
            const data = await response.json();
            console.log("response received", data);
            let key = data["key"];
            console.log("Got open ai api key", key);
            setHasOpenAIKey(true);
            return;
        }
    } catch (error) {
        console.log("Error getting open ai key:", error)
    }
  };

  const sendOpenAIKey = async (openaiKey) => {

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ openaiKey }),
    };
    
    try {
        const response = await handleFetch(baseUrl + "authenticateKey/", options);
        console.log("Authenticating key ", response);
        if (!response.ok) {
            console.log("Authenticating key failed with ", response.status);
            return;
        } else {
            const data = await response.json();
            console.log("OpenAI key authenticated!", data);
            setHasOpenAIKey(true);
        }
    } catch (error) {
        console.log("Error authenticating open AI key", error);
    }
  };

  const addDataSource = async (data) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    };

    try {
        const response = await handleFetch(baseUrl + "addData/", options);
        console.log("Adding data source", response);
        if (!response.ok) {
            console.log("Adding source failed with ", response.status);
            return
        } else {
            const data = await response.json();
            console.log("Added data to the bot!", data);
            return
        }
    } catch(error) {
        console.log("Error adding data source with", error);
    }
  };

  const askQuestion = async (question) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    };

    try {
        const response = await handleFetch(baseUrl + "ask/", options);
        if (!response.ok) {
            console.log("Answering question failed with ", response.status);
            return
        } else {
            const data = await response.json();
            return data
        }
    } catch (error) {
        console.log("Error answering the user question ", error);
    }
  };

  useEffect(() => {
    getOpenAIKey();
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <header className="text-white p-4">
        <h1 className="text-3xl font-bold">Embedchain</h1>
      </header>
      <main className="flex flex-1">
        <DataSourceInput onAddDataSource={addDataSource} />
        {hasOpenAIKey ? (
          // User has provided the OpenAI key, show chat interface
          <div className="flex-1 p-4">
            <div className="bg-white rounded-lg p-4 mb-4 h-96 overflow-y-auto text-black">
              {chatHistory.map((message, index) => (
                <div key={index} className={`mb-2 ${index < chatHistory.length - 1 ? 'border-b border-gray-300' : ''}`}>
                    <p className='text-black'>{message}</p>
                </div>
              ))}
            </div>
            {/* Chat input form */}
            <form
              className="flex items-center space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleQuery(e.target.elements.query.value);
                e.target.elements.query.value = '';
              }}
            >
              <input
                type="text"
                name="query"
                className="flex-1 p-2 rounded-l-full border-none focus:outline-none text-black"
                placeholder="Ask a question..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-r-full hover:bg-blue-600 transition duration-300 focus:outline-none"
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          // User has not provided the OpenAI key, show key input form
          <div className="flex-1 flex items-center justify-center">
            <form onSubmit={handleSubmitKey} className="bg-white p-6 rounded-lg">
                <label className="block mb-4">
                <span className="text-gray-700">Enter your OpenAI key:</span>
                <input
                    type="text"
                    value={openAIKey}
                    onChange={(e) => setOpenAIKey(e.target.value)}
                    className="mt-1 p-2 w-full border rounded text-black"
                    required
                />
                </label>
                <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
                >
                Submit Key
                </button>
                </form>
            </div>
        )}
      </main>
      <footer className="text-white p-4 text-center">
        <Link href="/">
          <div className="underline">Back to Landing Page</div>
        </Link>
      </footer>
    </div>
  );
};

export default HomePage;
