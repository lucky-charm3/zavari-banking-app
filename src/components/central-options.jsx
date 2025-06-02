import {RiSendPlaneFill,RiBankLine} from 'react-icons/ri';
import {BiReceipt} from 'react-icons/bi';
import {useContext} from 'react';
import {BankContext} from './context.jsx';
import PayBills from './paybills.jsx';
import Send from './send.jsx';
import WithDraw from './withdraw.jsx';
export default function CentralOptions()
{
    const{theme,modal,setModal}=useContext(BankContext);
    const triggerAction=(action)=>{
   if(action==='send')
   {
    setModal(prev=>({...prev,message:<Send/>}));
   }
   else if(action==='withdraw')
   {
     setModal(prev=>({...prev,message:<WithDraw/>}))
   }
   else
   {
     setModal(prev=>({...prev,message:<PayBills/>}))
   }
   setModal(prev=>({...prev,openModal:true}))
    }
    
    return(
        <div className='grid grid-cols-2 gap-4 mt-20 md:justify-around md:flex p-2'>
            <div className={`p-1 shadow-md rounded-md ${theme==='light'?'bg-blue-950':'bg-blue-700 hover:shadow-2xl hover:translate-y-5'} flex flex-col
            items-center justify-center space-y-10 cursor-pointer h-60 md:w-60 md:p-4`} onClick={()=>triggerAction('send')}>
         <RiSendPlaneFill size={40}/>
         <h1 className='font-semibold text-xl'>Send Money</h1>
            </div>
            <div className={`p-1 shadow-lg rounded-md ${theme==='light'?'bg-blue-950':'bg-blue-700'} flex flex-col
            items-center justify-center space-y-10 cursor-pointer h-60 md:w-60 md:p-4`} onClick={()=>triggerAction('paybills')}>
                <BiReceipt size={40}/>
                <h1 className='font-semibold text-xl'>PayBills</h1>
            </div>
            <div className={`p-1 shadow-lg rounded-md ${theme==='light'?'bg-blue-950':'bg-blue-700'} flex flex-col
            items-center justify-center space-y-10 cursor-pointer h-60 md:w-60 md:p-4`} onClick={()=>triggerAction('withdraw')}>
                <RiBankLine size={40}/>
                <h1 className='font-semibold text-xl'>Withdraw Money</h1>
            </div>
            {modal.openModal&&
            <div className={modal.outer}>
                <div className={modal.inner}>
                   {modal.message}
                   {modal.isSpinning&&<div className={modal.spinner}></div>}
                </div>
            </div>
            }
        </div>
    )
}