import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ForgetPassword from './Pages/ForgetPassword'
import { UserName, PopUpOpened, UserPosition, UserEmail, SidebarContext } from './Context'
import ChangePassword from './Pages/ChangePassword'
import AdminPanel from './Pages/AdminPanel'
import Developer from './Pages/Developer'
import Projects from './Pages/Projects'
import ClintTable from './Pages/ClintTable'
import DeveloperTable from './Pages/DeveloperTable'

const App = () => {
  const [userName, setUserName] = useState('');
  const [userPosition, setUserPosition] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(false);

  useEffect(()=>{
    if (isPopUpOpened){
      document.body.classList.add('no-scroll');
    }
    else {
      document.body.classList.remove('no-scroll');
    }
  },[isPopUpOpened])

  return (
    <div className='app-cont' id='app-cont'>
      <SidebarContext.Provider value={[sidebarOpened, setSidebarOpened]}>
        <UserEmail.Provider value={[userEmail, setUserEmail]}>
          <UserPosition.Provider value={[userPosition, setUserPosition]}>
            <PopUpOpened.Provider value={[isPopUpOpened, setIsPopUpOpened]}>
              <UserName.Provider value={[userName, setUserName]}>
                  <Routes>
                    <Route path='/' element={<AdminPanel/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/forgetPassword' element={<ForgetPassword/>}/>
                    <Route path='/resetPassword' element={<ChangePassword/>}/>
                    <Route path='/admin' element={<AdminPanel/>}/>
                    <Route path='/developer' element={<Developer/>}/>
                    <Route path='/projects' element={<Projects/>}/>
                    <Route path='/clients' element={<ClintTable/>}/>
                    <Route path='/developerDetails' element={<DeveloperTable/>}/>
                    <Route path='/leadDetails' element={<DeveloperTable/>}/>
                  </Routes>
              </UserName.Provider>
            </PopUpOpened.Provider>
          </UserPosition.Provider>
        </UserEmail.Provider>
      </SidebarContext.Provider>
    </div>
  )
}

export default App