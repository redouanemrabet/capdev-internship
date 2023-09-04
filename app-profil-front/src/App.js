import logo from './logo.svg';
import './App.css';
import Formulaire from './component/Formulaire';

import Contact from './component/profile/Profiles';
import Navbar from './Navbar';
import Home from './component/Home';
import {Route,Routes} from "react-router-dom"
import Profiles from './component/profile/Profiles';
import Archive from './component/profile/Archive';

function App() {
  // let component;
  // switch (window.location.pathname) {
  //   case "/":
  //     component = <Home/>
  //     break;
  //   case "/contact":
  //     component = <Contact/>
  //     break;
  //   case "/about":
  //     component=<About/>
  //     break;
  // }
  console.log(window.location);
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className='container'>
      {/* {component} */
      }
     
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-new-profile" element={<Formulaire/>}/>
        <Route path="/show-profiles" element={<Profiles/>}/>
        <Route path='/archives' element={<Archive/>}/>
      </Routes>
      </div>
   
    </div>
  );
}

export default App;
