import Footer from './footer.jsx';
import Header from './header.jsx';
import {useContext} from 'react';
import {BankContext} from './context.jsx';
import { Outlet } from 'react-router-dom';
export default function MainPage()
{
    const{theme}=useContext(BankContext)
    return(
        <div className={`text-white ${theme==='light'?" bg-blue-700":'bg-blue-950'} min-h-screen flex flex-col`}>
            <Header/>
            <div className='flex-1 overflow-y-auto  pb-16'>
            <Outlet />
            </div>
            <Footer/>
        </div>
    )
}