import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import './styling/fileupload.css'

const FileUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        try {
            const result = await uploadData({
                key: file.name,
                data: file
            }).result;
            setUploading(false);
            setUploadSuccess(true);
            onUpload(result.key);
            setTimeout(() => {
                setUploadSuccess(false);
                setFile(null);
            }, 3000);
        } catch (error) {
            console.error("Error uploading file: ", error);
            setUploading(false);
        }
    };

    return (
        <div className="file-upload">
            <div className="file-container">
                {file ? (
                    <label
                        className="file-name"
                        for="file-name"
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        {file.name}
                    </label>
                ) : (
                    <button className="custom-file-upload" onClick={() => document.getElementById('fileInput').click()}>
                        Select File
                    </button>
                )}
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
            {file && (
                <div className="button-container">
                    <button className="upload-button" onClick={handleUpload} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            )}
            {uploadSuccess && <div className="upload-success">File uploaded successfully!</div>}
        </div>
    );
};

export default FileUpload;
