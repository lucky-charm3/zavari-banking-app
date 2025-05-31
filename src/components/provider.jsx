import {useState,useEffect} from 'react';
import {users} from '../database/users.jsx';
import {BankContext} from './context.jsx';
export default function BankProvider({children})
{
    const modalStyles={
        outer:'fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4',
        inner:'relative p-4 bg-blue-300 rounded-lg space-y-4 flex flex-col items-center justify-center w-full max-w-md animate-fade-in',
        button:'p-2 bg-blue-400 rounded-md hover:bg-blue-500 transition',
        spinner:'h-12 w-12 border-4 border-t-blue-500 border-gray-500 rounded-full spinner ',
        buttonsdiv:'flex space-x-4 items-center justify-center',
        title:'',
        message:null,
        isSpinning:null,
        openModal:null
    }

    const[loggedUsers, setLoggedUsers]=useState(()=>{
        let stored=localStorage.getItem('loggedUsers');
        return stored?JSON.parse(stored):users;
    });

    const[currentUser,setCurrentUser]=useState(()=>{
        let stored=localStorage.getItem('currentUser');
        return stored?JSON.parse(stored):null;
    });

    const[modal,setModal]=useState(modalStyles)

    const[theme,setTheme]=useState("light");

    useEffect(()=>{
     localStorage.setItem('loggedUsers',JSON.stringify(loggedUsers));
    },[loggedUsers])

    useEffect(()=>{
        localStorage.setItem('currentUser',JSON.stringify(currentUser));
    },[currentUser])

    useEffect(()=>{
        document.body.className=theme;
    },[theme])

    
    return(
        <BankContext.Provider value={{loggedUsers,setLoggedUsers,currentUser,
            setCurrentUser,theme,setTheme,modal,setModal
        }}>
            {children}
        </BankContext.Provider>
    )
}