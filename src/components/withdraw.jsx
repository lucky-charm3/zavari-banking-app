import {useState, useContext} from 'react';
import {BankContext} from './context.jsx';
export  default function WithDraw()
{
    const{currentUser,modal,setModal,setCurrentUser}=useContext(BankContext);
    const[amount, setAmount]=useState('');
    const withdraw=async ()=>{
        let today=new Date();
        let date=String(today.getDate()).padStart(2,'0');
        let month=String(today.getMonth()).padStart(2,'0');
        let year=String(today.getFullYear()).slice(2);
        let fullDate=`${date}-${month}-${year}`;
        let newTransaction={
            id:crypto.randomUUID(),
            date:fullDate,
            amount:parseFloat(amount),
            action:'RECEIVED',
            status:Math.random()>0.5?'FAILED':'SUCCEEDED'
        }
        let realAmount=parseFloat(amount);
        try{
    if(realAmount>=currentUser.accounts[0].balance)
 {
    setModal(prev => ({...prev,  isSpinning: false,openModal:false})); 
    alert("Insufficient balance in the main account!");
    return;
 }
 if(!amount||realAmount<0)
 { 
      setModal(prev => ({...prev,  isSpinning: false, openModal:false})); 
    alert('Please input the correct amount');
    return;
 }
           let updatedAccounts=currentUser.accounts.map(a=>{
            if(a.name==="Main Account")
            {
                return {...a,balance:a.balance-realAmount}
            }
            return a;
           })
             setModal(prev=>({...prev, message:'Withdrawal in progress',isSpinning:true}));
           await new Promise(resolve=>setTimeout(resolve,2000))
            setModal(prev=>({...prev, message:'Money Withdrawed✅',isSpinning:false}));
           setCurrentUser(prev=>({...prev,transactions:[...prev.transactions,newTransaction],accounts:[...updatedAccounts]}))
        }
        catch(error)
        {
           setModal(prev => ({...prev, message: error.message, isSpinning: false})); 
        }
        finally{
             setTimeout(()=>{setModal(prev=>({...prev,openModal:false}))},800)
        }
          
    }
    return(
        <div  className='flex flex-col space-y-2'>
         <div>
            {modal.openModal}
            <label>Amount:{' '}</label>
            <input type='number'
            placeholder='XXXXX'
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            className='rounded-lg h-10 p-2 text-black'
            required
            />
               </div>
       <div className={modal.buttonsdiv}>
        <button onClick={()=>setModal(prev=>({...prev,openModal:false}))} className={modal.button}>Cancel</button>
        <button onClick={withdraw} className={modal.button}>Withdraw money</button>
       </div>

      
        </div>
    )
}