import {Outlet} from 'react-router-dom';
import BankProvider from './components/provider.jsx';
export default function App()
{
  return(
    <BankProvider>
    <div>
     <Outlet/>
    </div>
    </BankProvider>
  )
}