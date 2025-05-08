import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import InsertData from './Ting/insertdata/insert/insertData';

function RouterApp() {
  const [TogglePage, setTogglePage] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App TogglePage={TogglePage} setTogglePage={setTogglePage} />} />
        <Route path="/insert" element={<InsertData TogglePage={TogglePage} setTogglePage={setTogglePage} />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
  <React.StrictMode>
    <RouterApp/>
  </React.StrictMode>
);

