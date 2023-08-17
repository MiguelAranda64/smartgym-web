import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import UsuarioScreenContent from './screens/UsuarioScreen';
import RealTimeChart from './screens/RealTimeChart';
import AdminScreen from './screens/AdminScreen'
import RoutineScreen from './screens/RoutineScreen'
import HomeScreen from './screens/HomeScreen'


//asignacion de rutas para cada pantalla
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/RegistrationScreen" element={<RegistrationScreen />} />
        <Route path="/UsuarioScreen" element={<UsuarioScreenContent />}/>
        <Route path="/RealTimeChart" element={<RealTimeChart />} />
        <Route path="/AdminScreen" element={<AdminScreen />} /> 
        <Route path="/RoutineScreen" element={<RoutineScreen />} /> 
        <Route path="/HomeScreen" element={<HomeScreen />} /> 

      </Routes>
    </Router>
  );
};

export default App;
