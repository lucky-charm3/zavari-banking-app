import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Register from './components/register.jsx';
import SignIn from './components/sign-in.jsx';
import MainPage from './components/main-page.jsx';
import DashBoard from './components/dashboard.jsx';
import TransactionList from './components/transaction-list.jsx';
import AccountOverview from './components/account-overview.jsx';
import './index.css'
import App from './App.jsx'
let router=createBrowserRouter([
  {
    path:'/',
   element:<App/>,
   children:[
    {
  path:'register',
  element:<Register/>
    },
    {
  index:true,
  element:<Register/>
    },
    {
      path:'sign-in',
      element:<SignIn/>
    },
    {
      path:'main-page',
      element:<MainPage/>,
      children:[
      {
        path:'dashboard',
        element:<DashBoard/>
      },
      {
        index:true,
        element:<DashBoard/>
      },
      {
        path:'transaction-list',
        element:<TransactionList/>
      },
      {
        path:'account-overview',
        element:<AccountOverview/>
      }
      ]
    }
   ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
