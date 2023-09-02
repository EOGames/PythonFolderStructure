// src/components/FolderStructure.js
import React, { useState } from 'react';
import FolderTree from 'react-folder-tree';
import 'react-folder-tree/dist/style.css'; // Import the library's CSS

const FolderStructure = ({ data }) => {
  const [selectedFileData, setSelectedFileData] = useState(null);

  const handleFileClick = (fileData) => {
    console.log('file',fileData);
    setSelectedFileData(fileData);
  };

  return (
    <div>
      <FolderTree
        data={data}
        onNameClick	={handleFileClick}
        isFileHighlighted={(file) => file === selectedFileData}
        showCheckbox = {false}
      />
      
    </div>
  );
};

export default FolderStructure;
