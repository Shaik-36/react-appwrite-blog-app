
        Tech Stack Used
----------------------------------------
We use 
--> Aapwrite for backend as service 
--> Tinymce rich text editor for text editor functionality
--> Html-react-parser using to parse html 
--> React Hook Forms to hamdle input forms
--> Creating .env file to store environment variable

=========================================
    Install Dependencies
=========================================
--> @reduxjs/toolkit    react-redux     react-router-dom
--> appwrite
--> @tinymce/tinymce-react
--> html-react-parser
--> react-hook-form

=========================================
    Setting Environment Variables
=========================================

--> whenever you make a env variables it should be in root folder

--> Select the root folder and create a file called " .env "
--> we don't export anything in .env
--> ****ALL the ENV value should be in STRING **** 
--> ****Whenever you update .env file make sure to restart the project**** 
--> (optional) we also create a " .env.sample " for other devs to get the env vars at one palce (****they are empty env vars****)
---------------------------------------------

VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""

---------------------------------------------

--> Now how to take access to this file ? 
--> This env vars access is taken diffently in Backend, Frontend, react, vite-react, vite

in Vite - you need to write ---> import.meta.env.VITE_APPWRITE_URL

---------------------------------------------
Getting the files from Appwrite 
---------------------------------------------

Create project, database, collection, storage and get the id's of all of them


=========================================
    Configuration of Environmenmt Variables
=========================================
To make sure we don't make errors using - import.meta.env.VITE_APPWRITE_URL is in STRING format. we use config to replace it


--> create a folder in src .... conf
--> create a file config.js

--> Check wht config.js file for more info

============================================================================
    Build authentication service with appwrite (Authentication Service)
============================================================================

--> To make sure if a feature of app is removed it should have impact on the app and it should work fine

--> create a folder appwrite
--> inside create auth.js
--> Now we create a AuthService which has a constructor which handles create, login, check current, logout user  
-----------------------------------------------------------------

// ***************************  AuthService  ****************************
export class AuthService {
    client = new Client();
    account;

// ***********     Constructor  *********
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client)
    }

// *********      Create Account  ***********

    //To make sure we are not depandent on Appwrite
    async createAccount({email, password, name }) 

// *********      Login Account  *********
    async login({email, password}) 

// ********  Verification Check Account  ********
    async getCurrentUser()
    // *********  Logout Account  ***********

    async logout() 
}

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
============================================================================
    Appwrite database, file upload and custom queries (Storage Service)
============================================================================

--> Now we need the maojr configuration for the Appwrite (backend) 

--> Create a file called ' config.js ' in the appwrite folder


============================================================================
    How to configure redux toolkit in big projects - Creating Store 

    Store - A store holds the whole state tree of your application. 

    The only way to change the state inside it is to dispatch an action on it,   
    which triggers the root reducer function to calculate the new state.
    
    A store is not a class. It's just an object with a few methods on it.
============================================================================


---------------------------------------------------------------------------------------------------------------
--> Till now we have configured Database service by using auth.js and config.js 
    And database API connection configuration ( config/conf.js )

    conf.js - for configure and connection of Backend (appwrite) to front end

    auth.js - for user authentication (create user, login, logout)

    config.js - for Blog Posts managing ( Create Post, Update Post, Delete Post, get Posts etc....)


--> And we have database connection configuration config.js

---------------------------------------------------------------------------------------------------------------
        Create a store file 
---------------------------------------------------------------------------------------------------------------

--> Now create new fodler in src ..../store/ store.js

-> First import {configureStore} from '@reduxjs/toolkit'    

-> create a store using configureStore and initiate reducers in it

    const store = configureStore( { reducer: {} } )

    export default store

---------------------------------------------------------------------------------------------------------------
        Now we create another store (authSlice.js) *****  to Track User Authentication  *****
---------------------------------------------------------------------------------------------------------------

--> Let's create another store for Authentications called ' store/ authSlice.js ' 

            import { createSlice } from "@reduxjs/toolkit";

            const initialState = {
                status: false,
                userData: null
            }

            const authSclice = createSlice({
                name:"auth",
                initialState,
                reducers: { }
            })


            export default authSclice.reducer


-> This above is the basic structure of authSclice

-> We have reducer individual funciton which needs to be declarted and then exported as well

--> Now we have different methods for reducers for every reducer has state and action
---------------------------------
    state  - current state 
    action - which you will get payload
-----------------------------------
                reducers: {

                     login: (state, action) => {}
                }

--> Create two methods in reducers i.e login and logout


============================================================================
            Components
============================================================================

--> Create two components Header/Header.jsx and Footer/Footer.jsx

--> Then create a index.js in components folder to export Header and Footer together


-------------- index.js (to bring all the components at one place and export then at once) -----------------

                    import Header from "./Header/Header";
                    import Footer from "./Footer/Footer";
                    import Container from './container/Container'
                    import Logo from "./Logo";

                    export { Header, Footer, Container, Logo }

============================================================================
            App.jsx
============================================================================

--> Now we have to check if user is logged in or not and decide to show or not the dispay

        We need here useState, useEffect .......... useDispatch

        And then authService from appwrite/auth.js - to authnticate the user

--> Now use useEffect to run and check if the user is logged in or not

--> To perform conditional rendering put a conditino in return in app.jsx

============================================================================
            main.jsx - setting upi provider
============================================================================

import { Provider } from 'react-redux'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(

  <Provider store={store} >
    <App />
  </Provider>,
  
)

============================================================================
        Pages - configuring Routing (   Production grade react components   )
============================================================================

--> Create a folder in components called 'container/container.jsx'

-> Container is a box where we will have different values

<div className='w-full max-w-7xl mx-auto px-4'  >
        
    {children}
    
</div>

-----------------------------------------------------------------------------
            Footer.jsx
-----------------------------------------------------------------------------

--> copy the code of Footer.jsx from github

--> Then you need to import Link from react routers and also create a new componenet Logo and import it as well


-----------------------------------------------------------------------------
            Header - Logout Button
-----------------------------------------------------------------------------

--> Create a new file LogoutBtn.jsx inside Header folder and  import it in the Header.jsx

--> When you click on Logout button you need to dispacth the logout thing and you need Sclice( reducer) as well for that (action on the click )
    And logout action as well

                import {useDispatch} from 'react-redux'
                import authService from '../../appwrite/config'
                import {logout} from '../../store/authSclice'

--> After import done create - dispatch
--> And create a logoutHandler --> In this call authService.logout()  (which refers to appwrite/ auth.js )


-----------------------------------------------------------------------------
            Containerizing Header componenets
-----------------------------------------------------------------------------

Note:- all the components are in component/index.js

--> import all the necessery funcitons for Header.jsx

        import {Container, Logo, LogoutBtn } from '../index'
        import { Link } from 'react-router-dom'
        import { useSelector } from 'react-redux'
        import { useNavigate } from 'react-router-dom'


--> Now in the          Header() {
                            const authStatus = useSelector((state) => state.auth.status)
                        }

--> Here above we are accesssing the authSclice.js (initialstate.status)

--> Now the navigation

                const navigate = useNavigate()

                const navItems = [
                    
                    {   name: 'Home',
                        slug: "/",
                        active: true
                    }, 
                    
                    {}, {}

                ]

--> Now these menu buttons will be decide to show or not show using authStatus which asks for the true or false from authSclice

--> Next write the code in the return to display the header bar in website (check Header.jsx)



-----------------------------------------------------------------------------
            Common Button - that can be used for many things (Create Custom Buttons using one declaration)
-----------------------------------------------------------------------------
--> create a button in the components


In this button we pass all the properties that are main and any other props are added using spreadout operator

This button can be customized and used anywhere in the project. props and children are passed to function and they are palced in their right place that can me manipulated/updated as required

    function Button({
                            children,
                            properties,
                            ...props                  }) {


  return (
    <button 
            className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}  {...props}
    >
            {children}

    </button>
  )
}

-----------------------------------------------------------------------------
            ForwardRef Hook
-----------------------------------------------------------------------------

When working with complex applications, 

there are cases where you need direct access to a child component's DOM element or instance from a parent component.

when you need to access the component instance of a child component from the parent component. This can be useful when triggering a method or changing a state variable on the child component.

Example :-  syntax - forwardRef(   function  MyInput(props, ref) {}  )

           
Call forwardRef() to let your component receive a ref and forward it to a child component:

        import { forwardRef } from 'react';

        const MyInput = forwardRef(function MyInput(props, ref) {
        // ...
        });

-----------------------------------------------------------------------------
        Input ( same like button above - one componenet reuse everywhere)
-----------------------------------------------------------------------------

--> Create a component Input.jsx in the componenet

--> Place the label and input box which can be reused anywhere


============================================================================
        How to use React hook form in production
============================================================================

-----------------------------------------------------------------------------
        Select (same like Input and button )
-----------------------------------------------------------------------------
--> Let's create a Select button

export default React.forwardRef(Select)


-----------------------------------------------------------------------------
        PostCard Component (same like Input and button )
-----------------------------------------------------------------------------

--> The post card is shown in the all posts pages. and once you click on post card it will take you to the next page

--> Now we need to show the data of that post so we need to get it thru  appwriteService  which we named as DatabaseService ( from appwrite/config.js )

--> and we need a Link as well

--> Now to display the post card we need to be passed thru props. Then we make query to appwrite using props and receive data and show it on display


-----------------------------------------------------------------------------
            Login Component 
-----------------------------------------------------------------------------

--> Here we create a complete Login Form using the pre-made Inputs, buttons that we made above

--> We also use useForm() to handleSubmit() - which will automatically handle when submitted

Here we have the following struture: 

Login 
    Logo
        Link : to Sign In page
    
        Displat: If any error
    
    Login Form
        Email Input
        Password Input
    Submit Button


-----------------------------------------------------------------------------
            Sign In  Component  
-----------------------------------------------------------------------------

--> Similarly like Login above we will create SignUp Page as well


-----------------------------------------------------------------------------
            Authentication Layout - Mechanisam to Protext pages and routes
-----------------------------------------------------------------------------

--> It is a protected container which is empty and it and decides to display or not display the values in it

--> Create a file called AuthLayout.jsx


export default function Protected({ children, authentication= true }) {

  return (
    <div>AuthLayout</div>
  )
}

============================================================================
        Adding form and slug values
============================================================================
--> Now we will have a seperate comnponenet for all posts handling
--> create a new component slug called RTE.jsx

--> This is where we have editor have we edit and post the blog posts

--> There are lot of complex codes here. 


============================================================================
        Building pages | chai aur react
============================================================================

-> Now we will create pages and that's it we are almost done

--> create a folder in src called pages

-> create a file called Signup.jsx in it


--> And in component/index.js make sure all the componenets are imported.
-> imprt RTE and Signup components that were not added before 

----------------------------------------------------------------------------
--> Now go to pages/signup.jsx and import the signup component

import { Signup as SignupComponent} from '../component'

    function() {
        return <SignupComponent />
    }

--> Similarly do for pages/Login.jsx


-----------------------------------------------------------------------------
           Page -  Add Post 
-----------------------------------------------------------------------------

-----------------------------------------------------------------------------
           Page -  All Posts
-----------------------------------------------------------------------------

--> Create similarly all the pages AddPost, AllPost, EditPost, Home, Post


============================================================================
        Building Routers
============================================================================
--> Go to main.jsx



============================================================================
        Debugging
============================================================================


============================================================================
        TODOs- Next steps to make this app better
============================================================================

--> In store there is only one reducer. 
--> create another reducer in here. If you can do this....you don't need a interview to get a job

        const store = configureStore({
            reducer: {
                auth : authSlice,
                //TODO: add more slices here for posts
            }
        });

--> Try to make the app visually better