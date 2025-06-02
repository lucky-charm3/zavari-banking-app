import {useContext} from 'react';
import {BankContext} from'./context.jsx';
export default function AccountForm({formData,onInputChange,setFormData})
{
    const{modal,setModal,currentUser,setCurrentUser}=useContext(BankContext)
    const resetForm=()=>{
        setFormData({id:crypto.randomUUID(),name:'',amount:''})
    }
     const addAccount=async ()=>{
    if(!formData.amount||!formData.name)
    {
        alert("Hey user, fill all details!")
        return;
    }
    let convertedAmount=parseFloat(formData.amount)
    if(isNaN(convertedAmount)||convertedAmount<0)
    {
        alert("Input a correct amount");
        return;
    }
     try
     {
      setModal(prev=>({...prev,openModal:true,isSpinning:true,message:'Adding account..',title:'Add Account'}))
      await new Promise(resolve=>setTimeout(resolve,2000));
      if(formData.amount>=currentUser.accounts[0].balance)
     {
        alert('You dont have enough balance in your account, top it up and try again later!');
        return;
     }
     if(currentUser.accounts.length>=4)
     {
        alert('You cannot have more than four accounts!');
        return;
     }
     let newAccount={id:crypto.randomUUID(),name:formData.name,balance:parseFloat(formData.amount)};
     let updatedAccounts=currentUser.accounts.map(a=>{
        if(a.name==='Main Account')
        {
            return {...a,balance:a.balance-formData.amount}
        }
        return a;
     })
     setCurrentUser(prev=>({...prev,accounts:[...updatedAccounts,newAccount]}));
      setModal(prev=>({...prev,message:'Account added✅'}));
     }
     catch(error)
     {
        setModal(prev=>({...prev,message:'❌Failed to add account'}));
        console.error(error.message);
     }
     finally
     {
        setModal(prev=>({...prev,isSpinning:false,mode:''}));
         resetForm()
       
     }
    }
    return(
        <div className='flex flex-col space-y-2'>
         <h1>Add Account</h1>
                <div className='flex flex-col space-y-2'>
                    <label>Amount:</label>
                    <input type='number' 
                    placeholder='Amount from the main account(tshs)'
                    onChange={onInputChange}
                    value={formData.amount}
                    name='amount'
                    className='rounded-lg h-10 p-2 text-black'
                    />
                </div>
                <div className='flex flex-col space-y-1'>
                    <label>Name:</label>
                    <input type='text'
                    placeholder='name of your account'
                    onChange={onInputChange}
                    value={formData.name}
                    name='name'
                    className='rounded-lg h-10 p-2 text-black'
                    />
                </div>
                <div className={modal.buttonsdiv}>
                    <button onClick={()=>setModal(prev=>({...prev,openModal:false}))} className={modal.button}>Cancel</button>
                    <button onClick={addAccount} className={modal.button}>Add Account</button>
                </div>
                </div>
    )
}