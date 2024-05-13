import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import {createRoot} from "react-dom/client";

// ReactDOM.render(
//   <React.StrictMode>
//       <App/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);