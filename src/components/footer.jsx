import {FaTachometerAlt,FaExchangeAlt,FaUserCircle} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import {useContext} from 'react';
import {BankContext} from './context.jsx'
export default function Footer()
{
    const{theme}=useContext(BankContext)
return(
    <footer className={`flex justify-around ${theme==='light'?'bg-blue-950':'bg-blue-700'}  fixed bottom-0 left-0 right-0`}>
        <NavLink to='dashboard' className={({isActive})=>`${isActive?'bg-blue-800':''}`}>
        <div className='flex flex-col items-center p-2 cursor-pointer hover:bg-blue-800'>
            <FaTachometerAlt/>
            <h1>Dashboard</h1>
        </div>
        </NavLink>
        <NavLink to='transaction-list' className={({isActive})=>`${isActive?'bg-blue-800':''}`}>
        <div className='flex flex-col items-center p-2 cursor-pointer hover:bg-blue-800 '>
            <FaExchangeAlt/>
            <h1>Transactions</h1>
        </div>
        </NavLink>
        <NavLink to='account-overview' className={({isActive})=>`${isActive?'bg-blue-800':''}`}>
        <div className='flex flex-col items-center p-2 cursor-pointer hover:bg-blue-800 '>
            <FaUserCircle/>
            <h1>Overview</h1>
        </div>
        </NavLink>
    </footer>
)
}