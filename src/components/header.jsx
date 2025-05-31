import {useContext} from 'react';
import {BankContext} from './context.jsx';
import {FaMoon, FaSun} from 'react-icons/fa';
export default function Header()
{
    const{currentUser,theme,setTheme}=useContext(BankContext);
    return(
        <header className={`p-2 ${theme==='light'? 'bg-blue-950':'bg-blue-700'} flex fixed w-full justify-between shadow-xl z-50 top-0 left-0 right-0`}>
        <div className='flex space-x-3'>
            <img src='/emptypic.jpg' alt='user' className='h-12 w-12 rounded-full'/>
            <div className='flex flex-col space-y-1 text-lg font-semibold'>
            <h1>Hello,</h1>
            <h1>{currentUser.name.split(" ")[0]}</h1>
            </div>
        </div>
        <div>
            <h1 style={{fontFamily:"Bebas Neue"}} className='text-2xl font-bold md:tracking-wide'>ZAVARI</h1>
        </div>
        <div className='h-12 w-12 rounded-full p-1 border-2 border-white flex items-center justify-center cursor-pointer' onClick={()=>setTheme(theme==='light'?'dark':'light')}>
        {theme==='light'?<FaMoon size={20}/>:<FaSun size={20}/>}
        </div>
        </header>
    )
}