import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import ChatHistory from './ChatHistory';
import UserInput from './UserInput';
import FileUpload from './FileUpload';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [lightTheme, setLightTheme] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const [currentAiMessage, setCurrentAiMessage] = useState(''); 


  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
    // Simulate AI response
    // setTimeout(() => {
    //   setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'ai' }]);
    // }, 100);
    typeMessage(message, 'ai');
    
    
  };

  const typeMessage = (message, sender) => {
    setAiTyping(true);
    let typedMessage = '';
    const typingSpeed = 1; // Milliseconds between each character
  
    for (let i = 0; i < message.length; i++) {
      setTimeout(() => {
        typedMessage += message[i];
        setCurrentAiMessage(typedMessage);
        //setMessages((prevMessages) => [...prevMessages.filter(m => m.sender !== 'typing'), { text: typedMessage, sender }]);
        // If it's the last character, remove the typing indicator
        if (i === message.length - 1) {
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
    console.log('File uploaded:', file);
    setFileUploaded(true); // Update the state to indicate the file has been uploaded
    setInputDisabled(false); // Enable the input after the file is uploaded
    setUploadedFileName(file.name); // Store the uploaded file name
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
        <ChatHistory messages={messages} showFileUpload={!fileUploaded} onFileUpload={handleFileUpload}  aiTyping={aiTyping} currentAiMessage={currentAiMessage}/>
        {fileUploaded && (
          <div className="upload-success-message">
            File {uploadedFileName} has been uploaded successfully.
            <p>Enter your prompt to start the analysis.</p>
          </div>
        )}
        <UserInput onSendMessage={handleSendMessage} disabled={inputDisabled} />
      </div>
      {/* <footer className="app-footer">By aToi()</footer> */}
    </div>
  );
}

export default App;