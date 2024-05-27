import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Register from "./components/Register";
import NavbarRooms from "./components/NavbarRooms";
import NavbarAdmin from "./components/NavbarAdmin";
import CrearSala from "./components/CrearSala";


function App() {
  {/**const [firebaseUser, setFirebaseUser] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged(user=>{
      if (user){
        setFirebaseUser(user);
      }else{
        setFirebaseUser(null);
      }
    })
  })**/}
  return  (

    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='admin' element={<NavbarAdmin />} />
          <Route path='user' element={<NavbarRooms />} />
          <Route path='addsalas' element={<CrearSala />} />

        </Routes>
      </Router>
    </React.Fragment>

  )

}

export default App;
