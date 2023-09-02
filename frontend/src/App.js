// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import FolderStructure from './components/FolderStructure';

function App() {
  const [folderData, setFolderData] = useState(null);

  useEffect(() => {
    // Fetch your JSON data here and set it in the state
    // For example, if you have the JSON file locally:
    import('./directory_structure.json').then((data) => {
      setFolderData(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Folder Structure</h1>
      {folderData && <FolderStructure data={folderData} />}
    </div>
  );
}

export default App;
