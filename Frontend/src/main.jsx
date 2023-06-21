import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './Redux/Store.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'


ReactDOM.createRoot(document.getElementById('root')).render(

    <GoogleOAuthProvider clientId='422107966113-26n4bt3jhmjj36rshaspbnhips35jfjt.apps.googleusercontent.com' >
        <Provider store={Store} >
            <ToastContainer autoClose={1500} hideProgressBar={true} />
            <App />
        </Provider>
    </GoogleOAuthProvider>

)
