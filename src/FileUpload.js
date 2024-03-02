import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const FileUpload = ({ onFileUpload }) => {
  const [progress, setProgress] = useState(0);
  const [uploadState, setUploadState] = useState('idle');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadState('inProgress');
      setProgress(0); // Start the progress at 0
      // Simulate file upload progress
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 10, 100);
          if (newProgress === 100) {
            clearInterval(interval);
            setUploadState('complete'); // Set state to complete once 100% is reached
          }
          return newProgress;
        });
      }, 100);

      // Simulate a delay for the upload process
      setTimeout(() => {
        onFileUpload(file); // Call the onFileUpload prop with the selected file
        setUploadState('complete');
        setProgress(100); // Indicate completion
      }, 1000);// Adjust the delay to simulate upload time based on file size
    }
  };

  return (
    <div className="file-upload-container" style={{ opacity: uploadState === 'complete' ? 0 : 1 }}>
      <div className="file-upload-prompt">
        <p>Hello, NetApper</p>
        <p>Upload your CSV/Excel file to start</p>
      </div>
      <label htmlFor="file-upload" className="file-upload-label">
      <FontAwesomeIcon icon={faFileUpload} size="2x" className="file-upload-icon" />
        <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} 
        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
      </label>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor: uploadState === 'complete' ? 'var(--progress-bar-complete-color)' : 'var(--progress-bar-fill-color)'
          }}
        ></div>
      </div>
      {/* {uploadState === 'complete' && (
        <p className="file-upload-success">The file uploaded successfully.</p>
      )} */}
    </div>
  );
};

export default FileUpload;
