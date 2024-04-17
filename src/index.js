import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// routes 
import Blogs from './pages/Blogs';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import BlogPost from './components/BlogPost';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App now acts as the layout with the navigation
    children: [
      {
        index: true,
        element: <Home />, // The home page is now an index route
      },
      {
        path: 'blogs',
        element: <Blogs />,
      },{
        path: '/blog/:slug',
        element: <BlogPost/>
      },
      {
        path: 'aboutus',
        element: <AboutUs />,
      },
    ],
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
