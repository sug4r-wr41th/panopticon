import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider as Router, createHashRouter } from 'react-router-dom'
import App from './App.tsx'

import Dashboard from "./routes/Dashboard";

import { Result } from 'antd';

const router = createHashRouter([
  {
    path: "/",  element: <App />, children: [
      {
        path: "/", element: <Dashboard /> 
      },
      {
        path: "/*", element: <Result status="404" title="404" subTitle="Sorry, the page you visited doesn't exist." />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router router={router} />
  </React.StrictMode>,
)
