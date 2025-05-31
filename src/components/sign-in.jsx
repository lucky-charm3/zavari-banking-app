import {useState,useContext} from 'react';
import {BankContext} from './context.jsx';
import {FaPhone, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa';
import {useNavigate,Link} from "react-router-dom";
export default function SignIn()
{
     const{loggedUsers,setCurrentUser,modal, setModal}=useContext(BankContext);
     const[formData, setFormData]=useState({phoneNumber:'',pin:''})
     const[isShowPassword, setIsShowPassword]=useState(false);
     const navigate=useNavigate();

        const signIn=async ()=>{
            if(!formData.phoneNumber||!formData.pin)
            {
                alert("Hey User! Please fill all details");
                return;
            }
           try
           {
            setModal(prev=>({...prev,message:'Logging in',isSpinning:true,openModal:true}))
            let message=await findUser();
            setModal(prev=>({...prev,message:message}))
           }
           catch(error)
           {
            setModal(prev=>({...prev,message:error}))
           }
           finally
           {
           setModal(prev=>({...prev, isSpinning:false}))
           }
    }

    const findUser=()=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            let user=loggedUsers.find(u=>(u.phone===formData.phoneNumber&&u.pin===formData.pin));
            if(user)
            {
                setCurrentUser(user);
                resolve("✅Success!");
            }
            else 
            {
                reject("❌User doesnot exist!");
            }
            },3000)
        })
    }

    const onInputChange=(e)=>{
        const{name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }

    const ok=()=>{
        if(modal.message==="✅Success!")
        {
    navigate('/main-page/dashboard');
        }
        setModal(prev=>({...prev,openModal:false,message:'Logging in'}))
    }

    return(
        <div className='min-h-screen bg-cover bg-center bg-no-repeat' style={{backgroundImage:"url('./zavari.jpeg')"}}>
         <div className='bg-blue-950 bg-opacity-60 absolute inset-5 flex flex-col items-center justify-center rounded-lg space-y-4'>
        <h1 className='font-bold text-3xl'>Log in</h1>
        <div className='flex flex-col space-y-6 bg-blue-950 p-20 rounded-lg max-w-sm'>
        <div className='flex flex-col relative'>
        <div className='fixed'><FaPhone size={20} className='opacity-70'/></div>
        <input type='tel'
        pattern='\d*'
        inputMode='numeric'
        value={formData.phoneNumber}
        placeholder='Phone Number'
        onChange={onInputChange}
        name='phoneNumber'
        className='border-b-2 border-black text-center bg-transparent focus:outline-none'
        required
        />
        </div>
        <div className='flex flex-col relative'>
        <div className='fixed'><FaLock size={20} className='opacity-70'/></div>
        <input type={`${isShowPassword?'number':'password'}`}
        value={formData.pin}
        placeholder='Your PIN'
        onChange={onInputChange}
        name='pin'
        className='border-b-2 border-black text-center bg-transparent focus:outline-none'
        max='4'
        required
        />
        <div onClick={()=>setIsShowPassword(!isShowPassword)} className='absolute left-36'>
        {isShowPassword?<FaEyeSlash />:<FaEye/>}
        </div>
      </div>
     <div className=' flex items-center justify-center'>
    <button className='p-2 text-white rounded-lg' 
    style={{ background: 'linear-gradient(to right, #1e3c72, #2a5298)' }}
    onClick={signIn}
    >
        SIGN IN</button>
    </div>
     <p>A new member?{' '}<Link to="register" className='underline'>Sign up</Link></p>
     </div>
     </div>
     {modal.openModal&&
     <div className={modal.outer}>
            <div className={modal.inner}>
                <p className={`text-lg ${modal.isSpinning?'font-normal':'font-semibold'} text-center`}>{modal.message}</p>
                {modal.isSpinning&&
                <div className='spinner h-12 w-12 rounded-full border-t-blue-400 border-4 border-gray-400'></div>
                }
                <div className={modal.buttonsdiv}>
                    {!modal.isSpinning&&<button onClick={ok} className={modal.button}>Ok</button>}
                    <button onClick={()=>setModal(prev=>({...prev,openModal:false}))} className={modal.button}>❌Cancel</button>
                </div>
            </div>
            </div>
     }
     </div>
    )
}