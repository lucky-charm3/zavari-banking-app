import {BankContext} from './context.jsx';
import{useContext,useState} from 'react';
import {FaTrash} from 'react-icons/fa';
export default function TransactionList()
{
const{currentUser,setCurrentUser,modal,setModal}=useContext(BankContext);
const[deleteId, setDeleteId]=useState(null);

const deleteTransaction=async ()=>{
  try{
    setModal(prev=>({...prev,isSpinning:true,message:'Deleting'}))
     await new Promise(resolve=>setTimeout(resolve,2000));
     let filteredTransactions=currentUser.transactions.filter(t=>t.id!==deleteId);
     setCurrentUser(prev=>({...prev,transactions:filteredTransactions}));
     setModal(prev=>({...prev,message:'Deleted✅'}))
     setTimeout(()=>setModal(prev=>({...prev,openModal:false})),1000);
      }
   catch(error)
      {
        setModal(prev=>({...prev,message:'Failed to delete❌'}));
        console.error(error.message);
      }
    finally
      {
        setModal(prev=>({...prev,isSpinning:false}));
      }
}

const triggerDelete=(id)=>{
  console.log('Trigger delete ID:', id);
setDeleteId(id);
setModal(prev=>({...prev,openModal:true,message:"Are you sure you want to delete?"}));
}

const cancelDelete=()=>{
  setModal(prev=>({...prev,openModal:false}));
}
    return(
        <div className='mt-24 max-w-full'>
           <table className='table w-full text-center md:w-full'>
           <thead>
            <tr className='p-3'>
            <th>Date</th>
            <th>Amount</th>
           <th>Action</th>
           <th>Status</th>
           <th></th>
            </tr>
           </thead>
           <tbody>
             {currentUser.transactions.map((t)=>(
                <tr key={t.id}>
                    <td className='whitespace-nowrap'>{t.date}</td>
                  <td>{t.amount}</td>
                  <td>{t.action}</td>
                  <td>{t.status}</td>
                  <td>
                    <button onClick={()=>triggerDelete(t.id)} className='' >
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
              <h1>{modal.message}</h1>
              {modal.isSpinning&&
              <div className='spinner border-4 border-gray-400 border-t-blue-400 h-12 w-12 rounded-full'></div>}
              <div className='flex space-x-4 items-center justify-center'>
                
                <button onClick={cancelDelete} className={modal.button}>Cancel</button>
                {(modal.message==='Are you sure you want to delete?')&&
                <button onClick={deleteTransaction} className={modal.button}>Confirm</button>
                }
              </div>
              </div>
            </div>
            }
            </div>

    )
}