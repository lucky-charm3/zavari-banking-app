import {useState, useContext} from 'react';
import {BankContext} from './context.jsx';
export default function Send()
{
const{setCurrentUser,setModal,modal,currentUser}=useContext(BankContext);
const[amount, setAmount]=useState('');
const[phone,setPhone]=useState('');
const sendMoney=async ()=>{
    let today=new Date();
    let date=String(today.getDate()).padStart(2,'0');
    let month=String(today.getMonth()).padStart(2,'0');
    let year=String(today.getFullYear()).slice(2);
    let fullDate=`${date}-${month}-${year}`
    let newTransaction={
        id:crypto.randomUUID(),
        date:fullDate,
        action:'TRANSFERRED',
        status:Math.random()>0.5?'FAILED':'SUCCEEDED',
        amount:parseFloat(amount)
    }
 setModal(prev=>({...prev, message:'Transferring money',isSpinning:true}));
 let realAmount=parseFloat(amount);
   if(!amount||realAmount<0)
 {
    alert('Please input the correct amount');
    return;
 }
 if(realAmount>=currentUser.accounts[0].balance)
 {
    alert("Insufficient balance in the main account!");
    return;
 }  
            let updatedAccounts=currentUser.accounts.map(a=>{
            if(a.name==="Main Account")
            {
                return {...a,balance:a.balance-realAmount}
            }
            return a;
           })
           await new Promise(resolve=>setTimeout(resolve,2000))
            setModal(prev=>({...prev, message:'Money Transferred✅',isSpinning:false}));
           setCurrentUser(prev=>({...prev,transactions:[...prev.transactions,newTransaction],accounts:[...updatedAccounts]}))
           setTimeout(()=>{setModal(prev=>({...prev,openModal:false}))},800)
}
return(
    <div className='flex flex-col space-y-2'>
   <div className='flex flex-col space-y-2'>
    <label>Phone Number/Account number:</label>
    <input type='text' value={phone} placeholder='Phone number'  className='rounded-lg h-10 p-2 text-black' onChange={(e)=>setPhone(e.target.value)} required />
   </div>
   <div className='flex flex-col space-y-2'>
    <label>Amount:</label>
    <input type='number' value={amount} placeholder='XXXXX' onChange={(e)=>setAmount(e.target.value)}  className='rounded-lg h-10 p-2 text-black' required/>
   </div>
   <div className={modal.buttonsdiv}>
    <button onClick={()=>setModal(prev=>({...prev,openModal:false}))} className={modal.button}>Cancel</button>
    <button onClick={sendMoney} className={modal.button}>Send Money</button>
   </div>
    </div>
)
}
