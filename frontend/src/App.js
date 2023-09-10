// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import FolderStructure from './components/FolderStructure';

function App() {
  const [folderData, setFolderData] = useState(null);

  useEffect(() => { 
    getData();
  }, []);

  function findFirstPagesFolder(node) {
    if (node && typeof node === 'object') {
        if (node.name === 'pages') {
            return node;
        }
        if (node.children && Array.isArray(node.children)) {
            for (const child of node.children) {
                const result = findFirstPagesFolder(child);
                if (result) {
                    return result;
                }
            }
        }
    }
    return null;
}

  const getData = async()=>
  {
    let data = await fetch('http://localhost:8000/getData');
    data = await data.json();
    console.log('Data===========',data);
    const modifiedData = findFirstPagesFolder(data);
    console.log("modified Data ",modifiedData);
    const parentName = data.children[0].name;
    const parentType = data.children[0].type;
    const obj = 
  {
    name:parentName,
    type:parentType,
    children:[modifiedData]
  }
  console.log('obj==========',obj);
    setFolderData(obj);
  }

  return (
    <div className="App">
      <h1>Folder Structure</h1>
      {folderData && <FolderStructure data={folderData} />}
    </div>
  );
}

export default App;
