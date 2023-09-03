// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import FolderStructure from './components/FolderStructure';

function App() {
  const [folderData, setFolderData] = useState(null);

  useEffect(() => { 
    getData();
  }, []);

  const getData = async()=>
  {
    let data = await fetch('http://localhost:8000/getData');
    data = await data.json();
    console.log('Data===========',data);
    setFolderData(data);
  }

  return (
    <div className="App">
      <h1>Folder Structure</h1>
      {folderData && <FolderStructure data={folderData} />}
    </div>
  );
}

export default App;
