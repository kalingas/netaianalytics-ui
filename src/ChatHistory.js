import React, { useEffect, useRef } from 'react';
import FileUpload from './FileUpload';
import './App.css';

const ChatHistory = ({ messages, showFileUpload, onFileUpload, aiTyping, currentAiMessage }) => {
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, currentAiMessage]);

    return (
        <div className="chat-history">
          {showFileUpload && <FileUpload onFileUpload={onFileUpload} />}
          {messages.map((message, index) => (
            <div key={index} className={`message-container ${message.sender}-container`}>
              {message.text && (
                <div className={`message ${message.sender === 'ai' ? 'message-ai' : 'message-user'}`}>
                  <div className="message-content">
                    <strong>{message.sender === 'ai' ? 'NetAIAnalytics:' : 'You:'}</strong>
                    <div>{message.text}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {aiTyping && (
            <div className="message-container ai-container">
              <div className="message message-ai">
                <div className="message-content">
                  <strong>NetAIAnalytics:</strong>
                  <div>{currentAiMessage}<span className="typing-indicator">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </span></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      );
    };

export default ChatHistory;