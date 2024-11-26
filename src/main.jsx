import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route  } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'




import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
        <Route path="/all-posts" element={<AuthLayout authentication><AllPosts /></AuthLayout>} />
        <Route path="/add-post" element={<AuthLayout authentication><AddPost /></AuthLayout>} />
        <Route path="/edit-post/:slug" element={<AuthLayout authentication><EditPost /></AuthLayout>} />
        <Route path="/post/:slug" element={<Post />} />
      </Route>
    )
  );
  


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
