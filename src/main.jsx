import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProvider from './context/userContext.jsx';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import AddMedicine from './pages/AddMedicine.jsx';
import EditMedicine from './pages/UpdateMedicine.jsx';
import ViewMedicine from './pages/ViewPage.jsx';




const router = createBrowserRouter([
  { path : '/register', element :<Register />},
  { path : '/', element :<Login />},
  { path : '/home', element :<Home />},
  { path : '/add', element :<AddMedicine />},
  { path: '/edit/:id', element: <EditMedicine/> },
  {path:'/view/:id', element:<ViewMedicine/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserProvider>
  </React.StrictMode>
);