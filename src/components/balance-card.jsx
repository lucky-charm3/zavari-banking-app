import {useContext} from 'react';
import {BankContext} from './context.jsx';
export default function BalanceCard()
{
    const{currentUser,theme}=useContext(BankContext);
    let account=currentUser?.accounts?.find(a=>a.name==="Main Account");
    let balance=0;
    if(account) balance=account.balance
    return(
        <div className='w-full flex items-center justify-center '>
            <div className={`${theme==='light'?'bg-blue-950':'bg-blue-700'} border-6 shadow-lg rounded-full h-56 w-56 flex flex-col justify-center items-center mt-24`}>
                <h1 className='text-xl font-semibold'>Main Account Balance:</h1>
                <h1 className='text-xl font-semibold'>Tshs{'  '}{balance.toFixed(2)}</h1>
            </div>
        </div>
    )
}