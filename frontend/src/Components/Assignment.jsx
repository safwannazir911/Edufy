import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFile, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faFolder as farFolder } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import "./style/UpparArea.css"

const Assignment = () => {

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const backendEndpoint = 'http://localhost:3000/upload'; // Replace with your actual backend endpoint

  const handleFileChange = (event) => {
    const files = event.target.files;
    validateAndSetFiles(files);
  };

  const validateAndSetFiles = (files) => {
    const maxSizeInBytes = 1024 * 1024; // 1 MB

    const validateFile = (file) => {
      if (file.size > maxSizeInBytes) {
        setFileError('File size exceeds the maximum limit (1 MB).');
        return false;
      }
      return true;
    };

    if (files.length > 10) {
      setFileError('You can only upload up to 10 files.');
    } else {
      setFileError('');
      const validFiles = Array.from(files).filter(validateFile);
      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  const handleSave = () => {
    if (selectedFiles.length === 0) {
      return; // No files to upload
    }

    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    setUploading(true);

    axios
      .post(backendEndpoint, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        console.log('Files uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading files:', error.message);
      })
      .finally(() => {
        setUploading(false);
        setUploadProgress(0);
      });
  };

  const handleCancel = () => {
    setUploading(false);
    setUploadProgress(0);
  };

  const handleCloudIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    validateAndSetFiles(files);
  };

  return (
    <div className='container'>
    <div className='DicsussDIV'>
      <h2>Assignment</h2>
      <div>
      <div>
      <h1>Welcome, {username && username.split('@')[0]}!</h1>
      <p>Role: {role}</p>
    </div>
    </div>
    </div>

      <div className="input-group mt-3">
        <input type="text" className="form-control" placeholder="Search" />
        <div className="input-group-append">
          <button className="btn button_css" type="button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      <h4 className='f-b mt-4'>Assignment Activity</h4>
      <p className='f-b'>Write a short note about your assignment</p>
      <h4>File Submissions</h4>

      <div
        className='border rounded p-2 text-center'
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p className='fw-bold'>Maximum size 1MB. Maximum files 10</p>

        <div className='d-flex justify-content-center align-items-center'>
          <div className='border rounded bg-light m-1'>
            <FontAwesomeIcon icon={faFile} size='3x' className='m-2' style={{ color: "#5c98ff" }} />
          </div>

          <div className='border rounded bg-light m-1'>
            <FontAwesomeIcon icon={farFolder} size='3x' className='m-2' style={{ color: "#5c98ff" }} />
          </div>
        </div>

        <div
          className='d-flex flex-column justify-content-center align-items-center border rounded p-2 mt-3 bg-light'
        >
          <input
            type="file"
            multiple
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          {fileError && <p className="text-danger">{fileError}</p>}

          <FontAwesomeIcon
            icon={faCloudArrowUp}
            style={{ color: "#5c98ff", cursor: "pointer" }}
            size='3x'
            onClick={handleCloudIconClick}
          />
          <p className='fw-bold'>You can drag and drop files here to upload them.</p>
        </div>

        {selectedFiles.length > 0 && (
          <div className='mt-3'>
            <h6>Selected Files:</h6>
            <ul className="list-unstyled">
              {selectedFiles.map((file, index) => (
                <li key={index} className="bg-light p-2 mb-2 rounded">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {uploading && (
        <div className='progress mt-3'>
          <div
            className='progress-bar'
            role='progressbar'
            style={{ width: `${uploadProgress}%` }}
            aria-valuenow={uploadProgress}
            aria-valuemin='0'
            aria-valuemax='100'
          >
            {uploadProgress}%
          </div>
        </div>
      )}

      <div className='p-2'>
        <button
          className='btn button_css m-1'
          onClick={handleSave}
          disabled={uploading}
        >
          Save changes
        </button>
        <button
          className='btn button_css m-1'
          onClick={handleCancel}
          disabled={!uploading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Assignment;
