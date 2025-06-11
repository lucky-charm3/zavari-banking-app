import {FaEye, FaEyeSlash, FaUser, FaLock, FaPhone} from 'react-icons/fa';
import {useState,useContext} from 'react';
import {BankContext} from './context.jsx';
import {Link,useNavigate} from 'react-router-dom';
import {validations} from './validations.jsx';
export default function Register()
{
     const{loggedUsers, setLoggedUsers,setCurrentUser,modal,setModal}=useContext(BankContext);
    const[formData, setFormData]=useState({name:'',pin:'',phoneNumber:''});
    const[isShowPassword, setIsShowPassword]=useState(false);
    const[errors, setErrors]=useState({name:'',phoneNumber:'',pin:''})
     let navigate=useNavigate();

    const onInputChange=(e)=>{
    const{name,value}=e.target;
    setFormData(prev=>({...prev,[name]:value}));
    if(!value)
    {
        setErrors(prev=>({...prev,[name]:''}))
        return;
    }
    if(!validations[name].regex.test(value))
    {
        setErrors(prev=>({...prev,[name]:validations[name].message}))
    }
    else 
    {
        setErrors(prev=>({...prev,[name]:null}))
    }
    }

    const signUp=async ()=>{
    setModal(prev=>({...prev,isSpinning:true,openModal:true,message:'Registering'}));
    if(!formData.name||!formData.pin||!formData.phoneNumber)
    {
        alert("Hey user, fill all details");
        setModal(prev=>({...prev,openModal:false}));
        return;
    }
    try
    {
    let message=await findUser();
    setModal(prev=>({...prev,message:message}));
    }
    catch(error)
    {
        setModal(prev=>({...prev,message:error.message}));
    }
    finally{
        setModal(prev=>({...prev,isSpinning:false}));
    }
    }

    const findUser=()=>{
        return new Promise((resolve,reject)=>{
        setTimeout(()=>{
             let user=loggedUsers.find(u=>(u.name===formData.name)&&(u.pin===formData.pin)&&(u.phone===formData.pin));
     if(user)
     {
    reject("❌User Already Exists!");
     }
     else
     {
        let newUser={
            name:formData.name,
            phone:formData.phoneNumber,
            pin:formData.pin,
            accounts:[
                {id:crypto.randomUUID(),name:'Main Account',balance:0},
                {id:crypto.randomUUID(),name:'Savings Account',balance:0},
            ],
            transactions:[]
        }
        setLoggedUsers(prev=>([...prev,newUser]))
        setCurrentUser(newUser);
        resolve("✅Succesfully signed up!");
     }
            },3000)
        }
        )
    }

    const ok=()=>{
        if(modal.message==="✅Succesfully signed up!")
        {
          navigate('/main-page/dashboard');
        }
        setModal(prev=>({...prev,openModal:false}));
    }

    return(
        <div className='min-h-screen bg-cover bg-center bg-no-repeat' style={{backgroundImage:"url('./zavari.jpeg')"}}>
            <div className='bg-blue-950 bg-opacity-60 absolute inset-5 flex flex-col items-center justify-center rounded-lg space-y-4'>
            <h1 className='font-bold text-3xl'>Sign Up</h1>
            <div className='flex flex-col space-y-6 bg-blue-950 p-20 rounded-lg max-w-sm'>
                <div className='flex flex-col relative'>
                <div className='fixed '><FaUser size={20} className='opacity-70'/></div>
                    <input type='text'
                    value={formData.name}
                    placeholder='Your username'
                    onChange={onInputChange}
                    name='name'
                    className='border-b-2 border-black text-center bg-transparent focus:outline-none'
                    required
                    />
                    <p className='text-xs text-red-600'>{errors.name}</p>
                    </div>
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
                      <p className='text-xs text-red-600'>{errors.phoneNumber}</p>
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
                      <p className='text-xs text-red-600'>{errors.pin}</p>
                    <div onClick={()=>setIsShowPassword(!isShowPassword)} className='absolute left-44 bottom-1 cursor-pointer'>
                    {isShowPassword?<FaEyeSlash/>:<FaEye/>}
                    </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='p-2 text-white rounded-lg' 
                        style={{ background: 'linear-gradient(to right, #1e3c72, #2a5298)' }}
                        onClick={signUp}
                        >
                            SIGN UP</button>
                        </div>
                        <div>
                            <p>Already a member of Zavari?{' '}<Link to='/sign-in' className='underline'>Sign in</Link></p>
                        </div>
            </div>
            </div>
            {modal.openModal&&
             <div className={modal.outer}>
            <div className={modal.inner}>
                <p className={`text-lg ${modal.isSpinning?'font-normal':'font-semibold'} text-center`}>{modal.message}</p>
                {modal.isSpinning&&
                <div className={modal.spinner}></div>
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