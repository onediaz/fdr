import React, { useState } from 'react';
// import { Storage } from 'aws-amplify';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
//     try {
//         console.log(Storage);
//         const result = await Storage.put(file.name, file, {
//             contentType: file.type,
//         });
//         setUploading(false);
//         onUpload(result.key);
//         } catch (error) {
//         console.error("Error uploading file: ", error);
//         setUploading(false);
//         }
    };

  return (
        <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
        </button>
        </div>
    );
};

export default FileUpload;
