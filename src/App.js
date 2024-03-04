import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import ChatHistory from './ChatHistory';
import UserInput from './UserInput';
import FileUpload from './FileUpload';
import './App.css';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [lightTheme, setLightTheme] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const [currentAiMessage, setCurrentAiMessage] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);


  const handleSendMessage = (message) => {

    setMessages([...messages, { text: message, sender: 'user' }]);
    // Simulate AI response
    // setTimeout(() => {
    //   setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'ai' }]);
    // }, 100);
    // const message = { text: message, isBot: false };
    // setMessages((messages) => [ ...messages,message]);
    setAiTyping(true); // Start showing the AI typing/loading indicator
    setInputDisabled(true); // Disable the input while waiting for the AI response
    console.log(message);

    axios
      .post('/chat/message', { message: message })
      .then((response) => {

        console.log(response.data.text);
        const reply = { text: response.data, sender: 'ai' };
        setMessages((messages) => [...messages, reply]);
        //typeMessage(response.data.text, 'ai');
        setAiTyping(false); // Stop showing the AI typing/loading indicator
        setInputDisabled(false); // Re-enable the input
      })
      .catch((error) => {
        console.error('Error:', error);
        const errorMessage = { text: 'An error occurred. Please try again later.', sender: 'ai' };
        setMessages((messages) => [...messages, errorMessage]);
        //typeMessage('An error occurred. Please try again later.', 'ai');
        setAiTyping(false); // Stop showing the AI typing/loading indicator
        setInputDisabled(false); // Re-enable the input
      });
    //typeMessage(message, 'ai');


  };

  const typeMessage = (message, sender) => {
    console.log(message);
    setAiTyping(true);
    let typedMessage = '';
    const typingSpeed = 1; // Milliseconds between each character
    console.log(message.length);
    for (let i = 0; i < message.length; i++) {
      console.log(message.length);
      setTimeout(() => {
        typedMessage += message[i];
        setCurrentAiMessage(typedMessage);
        //setMessages((prevMessages) => [...prevMessages.filter(m => m.sender !== 'typing'), { text: typedMessage, sender }]);
        // If it's the last character, remove the typing indicator
        if (i === message.length - 1) {
          console.log(typedMessage, sender);
          setMessages((prevMessages) => [...prevMessages, { text: typedMessage, sender }]);
          setAiTyping(false);
          //setCurrentAiMessage('');
        }
      }, typingSpeed * i);
    }

    // Add a temporary 'typing' message to indicate the AI is typing
    setMessages((prevMessages) => [...prevMessages, { text: '', sender: 'typing' }]);
  };

  const handleFileUpload = (file) => {
    // Handle file upload here
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        setFileUploaded(true);
        setInputDisabled(false);
        // const message = {
        //   text: 'File uploaded successfully. You can now start querying the data.',
        //   isBot: true,
        // };
        // setMessages((messages) => [...messages, message]);
      })
      .catch((error) => {
        console.error('Error:', error);
        setFileUploaded(false);
        setIsFileUploaded(false);
        setInputDisabled(true);
        // const errorMessage = { text: 'Failed to upload file. Please try again.', isBot: true };
        // setMessages((messages) => [...messages, errorMessage]);
      });
    console.log('File uploaded:', file);
    //setFileUploaded(true); // Update the state to indicate the file has been uploaded
    // setInputDisabled(false); // Enable the input after the file is uploaded
    setUploadedFileName(file.name); // Store the uploaded file name
  };
  const handleCancel = () => {
    setAiTyping(false); // This should stop showing the AI typing indicator
    setInputDisabled(false); // This should re-enable the input
    // You might need additional logic to actually cancel the AI's response if possible
  };

  const toggleTheme = () => {
    setLightTheme(!lightTheme);
  };

  return (
    <div className={`app-container ${lightTheme ? 'light-theme' : ''}`}>
      <header className="app-header">
        NetAIAnalytics
        <div className="theme-toggle" onClick={toggleTheme}>
          <FontAwesomeIcon icon={lightTheme ? faMoon : faSun} />
        </div>
      </header>
      <div className="chat-container">
        <ChatHistory messages={messages} showFileUpload={!fileUploaded} onFileUpload={handleFileUpload} aiTyping={aiTyping} currentAiMessage={currentAiMessage} />
        {fileUploaded && (
          <div className="upload-success-message">
            File {uploadedFileName} has been uploaded successfully.
            <p>Enter your prompt to start the analysis.</p>
          </div>
        )}


        <UserInput
          onSendMessage={handleSendMessage}
          disabled={inputDisabled || aiTyping}
          onCancel={handleCancel}
          aiTyping={aiTyping}
        />
      </div>
      {/* <footer className="app-footer">By aToi()</footer> */}
    </div>
  );
}

export default App;