
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import {BrowserRouter, Routes,Router, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import MasterApi from './pages/MasterApi'
import Register from './pages/Register'
import AccountMaster from './pages/AccountMaster'
import SalesBill from './pages/SalesBill'
import SupplierItem from './pages/SupplierItem'
import PurchaseItem from './pages/PurchaseItem'
import PurchaseDummy from './pages/PurchaseDummy'
import {useEffect, useState } from 'react'
import {Route} from "react-router-dom";
import PurchaseNew from './pages/PurchaseNew'



// function useLocalStorage(key, initialValue){

//   const [storedValue, setStoredValue] = useState(() => {
//     try{
//     const item = window.localStorage.getItem(key);
//     return item ? JSON.parse(item) : initialValue;
//     }catch(error){
//       console.error("error  retirving the data", error);
//       return initialValue;

//     }
//   });

//   useEffect(() =>{
//     try{
//     window.localStorage.setItem(key, JSON.stringify(storedValue));
//     }catch(error){
//       console.error('Error to storing the data in locastorage', error);
//     }
//   }, [key, storedValue])

//   return [storedValue, setStoredValue];
// }
function App () {

  const [isAuthenticated, setIsAuthenticated] =useState(false);
  const login= () =>{
    setIsAuthenticated(true);
  }

  useEffect(() => {

    const storedUserName = localStorage.getItem('userName');
      setIsAuthenticated(true);
      const user = () =>{
      if(storedUserName != null){
        setIsAuthenticated(storedUserName);
      }
      else if(storedUserName === null){
        setIsAuthenticated(!!storedUserName);
      }
    }
  }, [isAuthenticated]);
    // if(storedUserName != null){
    // setIsAuthenticated(storedUserName);
    //  }else if(storedUserName === null){
    //   setIsAuthenticated(!!storedUserName);
    //  }
    
    

  
  //  useEffect(() =>{
  //   console.log('isAuthenticated', isAuthenticated);
    
  //  }, [isAuthenticated]);
   
  

  
  return (

   <BrowserRouter>
   {/* <Navbar/> */}
    <Routes>
   
      <Route path='/login' element={<Login/>} />
      {/* <Route path='/account' element={<AccountMaster/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/salesbill' element={<SalesBill/>} />
      <Route path='/master' element={<MasterApi/>} />
      <Route path='/register' element={<Register/>} /> */}


 

         <Route
          path="/account"
          element={ isAuthenticated ? <AccountMaster /> : <Navigate to="/login" />}
         /> 
         <Route 
         path="/salesbill"
         element={isAuthenticated ? <SalesBill /> : <Navigate to= "/login" />}
         />
         <Route 
         path='/home'
         element={ isAuthenticated ? <Home/> : <Navigate to= "/login" />}
         />
         <Route
         path='/master'
         element={ isAuthenticated ? <MasterApi /> : <Navigate to= "/login" />}
         />      
         <Route
         path='/register'
         element={ isAuthenticated ? <Register/> : <Navigate to= "/login" />}
         />

        <Route
        path='/supplier'
        element={isAuthenticated ? <SupplierItem/> : <Navigate to="/login" />}
        /> 
        {/* <Route
        path='/purchase'
        element={isAuthenticated ? <PurchaseItem/> : <Navigate to="/login"/>}
        /> */}
        {/* <Route 
        path='/dummy'
        element={isAuthenticated ? <PurchaseDummy/> : <Navigate to="/login"/>}
        /> */}
        <Route
        path='/new'
        element={isAuthenticated ? <PurchaseNew/> : <Navigate to="/login"/>}
        />
        

  </Routes>
  </BrowserRouter>
    

   
  )
}
function AuthenticatedRoutes  () {
  return (
  <>
  <Route path='/account' element={<AccountMaster />} />
  <Route path='/home' element={<Home />} />
  <Route path='/salesbill' element={<SalesBill />} />
  <Route path='/master' element={<MasterApi />} />
  {/* <Route path='/supplier' element={<SupplierItem/>} /> */}

  </>
  );
}

export default App;
