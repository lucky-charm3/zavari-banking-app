import {bills} from '../database/bills.jsx';
import {useContext,useState} from 'react';
import {BankContext} from './context.jsx';
export default function PayBills()
{
   const{setCurrentUser,setModal,modal,currentUser}=useContext(BankContext);
    const[bill, setBill]=useState('');
   const payBill=async ()=>{
           let today=new Date();
           let date=String(today.getDate()).padStart(2,'0');
           let month=String(today.getMonth()).padStart(2,'0');
           let year=String(today.getFullYear()).slice(2);
           let finalDate=`${date}-${month}-${year}`;
           let matchedBill=bills.find(b=>b.name===bill)
           const newTransaction={
             id:crypto.randomUUID(),
             date:finalDate,
             action:'TRANSFERRED',
             status:Math.random()>0.5?'FAILED':'SUCCEEDED',
             amount:matchedBill.price
           }
         
            let updatedAccounts=currentUser.accounts.map(a=>{
            if(a.name==="Main Account")
            {
                return {...a,balance:a.balance-matchedBill.price}
            }
            return a;
           })
           if(bill.price>=currentUser.accounts[0].balance)
 {
    alert("Insufficient balance in the main account!");
    return;
 }
           setModal(prev=>({...prev, message:'Sending payment',isSpinning:true}));
           await new Promise(resolve=>setTimeout(resolve,2000))
            setModal(prev=>({...prev, message:'Payment sent✅',isSpinning:false}));
           setCurrentUser(prev=>({...prev,transactions:[...prev.transactions,newTransaction],accounts:[...updatedAccounts]}))
           setTimeout(()=>{setModal(prev=>({...prev,openModal:false}))},800)
       
       }
    return(
        <div className='flex flex-col space-y-2'>
            <div>
                <label>Payment Bill:{'  '}</label>
                <select onChange={(e)=>setBill(e.target.value)} value={bill}  className='rounded-lg h-10 p-2 text-black'>
                 {bills.map(bill=>(
                    <option key={bill.id}>
                        {bill.name}
                    </option>
                 ))}
                </select>
            </div>
            <div className={modal.buttonsdiv}>
                <button onClick={()=>setModal(prev=>({...prev, openModal:false}))} className={modal.button}>Cancel</button>
                <button onClick={payBill} className={modal.button}>Pay Bill</button>
            </div>
        </div>
    )
}
