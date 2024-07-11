import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './Components/Home/Home'
import Essays from './Components/Essays/Essays';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import AnimatedCursor from "react-animated-cursor"
import Login from './Components/RegisterAndLogin/Login';
import Register from './Components/RegisterAndLogin/Register';
import ShowNavFoot from './Components/ShowNavFoot';
import { UserContextProvider } from './UserContext';
import CreateEssay from './Components/CreateEssay/CreateEssay';
import EssayPage from './Components/EssayPage/EssayPage';
import EditEssay from './Components/EditEssay/EditEssay';

function App() {
  return (
    <div className="App">

      <UserContextProvider>
        <BrowserRouter>
          <ShowNavFoot>
            <Navbar/>
          </ShowNavFoot>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/essays' element={<Essays/>} />
              <Route path='/createEssay' element={<CreateEssay/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/essays/:id' element={<EssayPage/>} />
              <Route path='/essays/edit/:id' element={<EditEssay/>} />
            </Routes>
          <ShowNavFoot>
            <Footer />
          </ShowNavFoot>
        </BrowserRouter>
      </UserContextProvider>
      <AnimatedCursor 
        outerSize={30}
        clickables={[
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link'
        ]}
      />
    </div>
  );
}

export default App;
