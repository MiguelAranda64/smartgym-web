import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaChartLine, FaChild } from 'react-icons/fa'; // Importa los íconos de react-icons



const CustomDrawerContent = ({navigation}) => {


  // const handleGoToUsuario = () => {
  //   navigation.navigate('UsuarioScreen');
  // }

  // const handleGoToRegistro = () => {
  //   navigation.navigate('Registro');
  // }

  // const handleGoToGraficas = () => {
  //   navigation.navigate('Graficas');
  // }
 /* Creo que esto sonlas ventanas, pero no ocupamos tantas
  const handleGoToDoctor = () => {
    navigation.navigate('DoctorScreen');
  }

 
  const handleGoToEnfermera = () => {
    navigation.navigate('EnfermeraScreen');
  }

  const handleGoToHospital = () => {
    navigation.navigate('HospitalScreen');
  }

  const handleGoToUsuario = () => {
    navigation.navigate('CrudUsuario');
  }
*/
return (
  <div style={styles.drawerContent}>
    {/* Logo o título de la aplicación */}
    <h1 style={styles.appTitle}>SmartGym</h1>
    <div style={styles.menuItems}>
      {/* Enlace a la ruta de registro */}
      <Link to="/registro" style={styles.menuItem}>
        <div style={styles.itemWithIcon}>
          <FaUserPlus size={24} color="#fff" style={styles.icon} />
          <span style={styles.drawerItemText}>Registro</span>
        </div>
      </Link>
      {/* Enlace a la ruta de gráficas */}
      <Link to="/graficas" style={styles.menuItem}>
        <div style={styles.itemWithIcon}>
          <FaChartLine size={24} color="#fff" style={styles.icon} />
          <span style={styles.drawerItemText}>Gráficas</span>
        </div>
      </Link>
      {/* Enlace a la ruta de usuario */}
      <Link to="/usuario" style={styles.menuItem}>
        <div style={styles.itemWithIcon}>
          <div style={styles.iconCircle}>
            <FaChild size={20} color="#2196f3" style={styles.icon} />
          </div>
          <span style={styles.drawerItemText}>Usuario</span>
        </div>
      </Link>
    </div>
  </div>
);
};

const styles = {
drawerContent: {
  flex: 1,
  padding: '32px',
  justifyContent: 'flex-start',
  backgroundColor: '#2196f3', // Fondo del menú lateral con color de hospital
},
appTitle: {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: '16px',
  textAlign: 'center', // Alineación del texto al centro
},
menuItems: {
  flex: 1,
},
menuItem: {
  display: 'block',
  marginTop: '16px', // Espacio entre los elementos del menú
  textDecoration: 'none',
  cursor: 'pointer',
},
drawerItemText: {
  fontSize: '20px',
  color: '#fff',
  marginLeft: '16px',
},
itemWithIcon: {
  display: 'flex',
  alignItems: 'center',
},
icon: {
  marginRight: '8px', // Espacio entre el icono y el texto
},
iconCircle: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: '#fff',
  marginRight: '8px',
},
};

export default CustomDrawerContent;