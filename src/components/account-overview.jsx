import {useContext,useState,useEffect} from 'react';
import {FaTrash} from 'react-icons/fa';
import {BankContext} from './context.jsx';
export default function AccountOverview()
{
    const{currentUser,setCurrentUser,modal, setModal}=useContext(BankContext);
    const[deleteId, setDeleteId]=useState(null);
    const[formData,setFormData]=useState({id:crypto.randomUUID(),name:'',amount:0});

    useEffect(()=>{
        console.log('Full current user ',[currentUser])
        if(currentUser?.accounts)
        {
            console.log("Account id's",currentUser.accounts.map(a=>a.id));
        }
    },[currentUser])

    const resetForm=()=>{
        setFormData({id:crypto.randomUUID(),name:'',amount:''})
    }

    const addAccount=async ()=>{
    if(!formData.amount||!formData.name)
    {
        alert("Hey user, fill all details!")
        return;
    }
    if(isNaN(parseFloat(formData.amount)||formData.amount<0))
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
        setModal(prev=>({...prev,isSpinning:false}));
         resetForm()
       
     }
    }

    const onInputChange=(e)=>{
     const{name,value}=e.target;
     setFormData(prev=>({...prev,[name]:value}))
    }
    
    let form=<div>
         <h1>{modal.title}</h1>
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
                </div>

    const deleteAccount=async ()=>{
        try{
        setModal(prev=>({...prev,message:'Deleting',isSpinning:true}))
        let accountToDelete=currentUser.accounts.find(a=>a.id===deleteId);
        console.log('The account to delete is ',accountToDelete.id)
        if (!accountToDelete) {
            setModal(prev=>({...prev,message:'❌Account not found'}));
            return;
        }
       await new Promise((resolve)=>setTimeout(resolve,2000));
       const updatedAccounts=currentUser.accounts.map(a=>{
        if(a.name==='Main Account')
        {
            return {...a,balance:a.balance+accountToDelete.balance}
        }
        return a;
       }).filter(a=>a.id!==deleteId);
       setCurrentUser(prev=>({...prev,accounts:updatedAccounts}));         
        setModal(prev=>({...prev,message:'Deleted✅'}));
        setTimeout(()=>setModal(prev=>({...prev,openModal:false})),800);
        
        }
        catch(error)
        { 
            setModal(prev=>({...prev,message:"❌Failed to delete"}));
            setTimeout(()=>setModal(prev=>({...prev,openModal:false})),800);
            console.log(error.message);
        }
        finally{
            setModal(prev=>({...prev,isSpinning:false}));
            setDeleteId(null)
        }
    }

    const triggerDelete=(id)=>{
        console.log('Trigger delete ID:', id);
        let accountToDelete=currentUser.accounts.find(a=>a.id===id)
        console.log('Found account:', accountToDelete.name);
        setModal(prev=>({...prev,openModal:true,message:`Are you sure you want to delete ${accountToDelete.name}? The balance will be transferred to the main account`}))
        setDeleteId(id);
    }

    const cancel=()=>{
        setModal(prev=>({...prev,openModal:false}));
    }

    const triggerAdd=()=>{
        setModal(prev=>({...prev,openModal:true,message:form}))
    }
   
    return(
        <div className='mt-20'>
            <table className='w-full text-center'>
                <tbody>
            {currentUser.accounts.map((a)=>(
                <tr className='shadow-md hover:shadow-lg' key={a.id}>
                <td className='p-4'>{a.name} balance:</td>
                <td className='p-4'>{a.balance}</td>
                <td className='p-4'>
                <button onClick={()=>triggerDelete(a.id)} aria-label={`delete ${a.name}`} style={{display:a.name==='Main Account'?'none':''}} className='cursor-pointer'>
                <FaTrash />
                    </button>
               </td>
               </tr>
            ))}
            </tbody>
            </table>
            {modal.openModal&&
            <div className={modal.outer}>
                <div className={modal.inner}>
                    <div>{modal.message} </div>
                    {modal.isSpinning&&<div className='spinner w-12 h-12 rounded-full bg-gray-400 border-t-blue-400 border-4'></div>}
                    {(!modal.isSpinning)&&
                    <div className='flex items-center justify-center space-x-4'>
                        <button className={modal.button} onClick={cancel}>Cancel</button>
                        {typeof modal.message==='string'?(
                            modal.message.includes('Are you sure')&&
                            <button onClick={deleteAccount} className={modal.button}>Confirm</button>):
                        <button onClick={addAccount} className={modal.button}>Add</button>
                        
                          
                        }
                       
                    </div>
                    }
                </div>
            </div>
            }
            <div className='rounded-full p-2 border-2 h-12 w-12 flex items-center justify-center text-3xl font-bold fixed bottom-16 right-0'>
                <button onClick={triggerAdd}>+</button>
            </div>
        </div>

    )
}