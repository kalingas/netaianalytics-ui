import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const UserInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    const textarea = textareaRef.current;
    // Reset the height to the minimum height initially
    textarea.style.height = 'inherit';
    // Set the height to scrollHeight only if it's less than max-height
    if (textarea.scrollHeight < textarea.style.maxHeight.replace('px', '')) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      // Reset the height of the textarea
      const textarea = textareaRef.current;
      textarea.style.height = 'inherit';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="user-input-container">
      <textarea 
        ref={textareaRef}
        className="user-input-textarea"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter your prompt..."
        disabled={disabled}
      />
      <button onClick={handleSend} className="send-button" disabled={disabled}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default UserInput;
