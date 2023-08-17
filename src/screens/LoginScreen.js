import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate(); // Usa useNavigate

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    try {
      const res = await axios.post('http://172.18.4.15:9000/', {
        username,
        password,
      });

      if (res.data === 'exist') {
        navigate('/RoutineScreen', { state: { id: username } }); // Cambia navigate
      } else if (res.data === 'incorrectPassword') {
        alert('Contraseña incorrecta');
      } else if (res.data === 'notexist') {
        alert('El usuario no se ha registrado');
      }
    } catch (error) {
      alert('Error al procesar la solicitud');
      console.log(error);
    }
  }

  return (
    <div style={styles.container}>
      <img src={require('../assets/images/logosin.png')} style={styles.logo} alt="Logo" />
      <h1 style={styles.title}>LOGIN</h1>
      <div style={styles.inputSection}>
        <label style={styles.fieldTitle}>Username</label>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={styles.inputSection}>
        <label style={styles.fieldTitle}>Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button style={styles.button} onClick={submit}>Login</button>
      <button style={styles.buttonR} onClick={() => navigate('/RegistrationScreen')}>Registrarse</button>
      <Link to="/AdminScreen" style={styles.adminLink}>
        ¿Eres administrador? Entra aquí
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#20409a',
    padding: '40px',
  },
  logo: {
    width: '380px',
    height: '200px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: 'white',
  },
  inputSection: {
    margin: '10px 0',
  },
  fieldTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: 'white',
    position: 'absolute', // Coloca la etiqueta en posición absoluta
    top: '-18px', // Ajusta el espacio por encima del campo de entrada
    left: '10px', // Ajusta la posición horizontal
    background: '#20409a', // Añade un fondo similar al contenedor
    padding: '0 5px', // Añade un poco de espaciado alrededor de la etiqueta
  },
  input: {
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '18px',
    padding: '10px',
    width: '300px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#1E90FF',
    color: 'white',
    fontSize: '18px',
    padding: '10px 20px',
    borderRadius: '3px',
    border: 'none',
    cursor: 'pointer',
    margin: '10px 0',
  },  
  buttonR: {
    backgroundColor: '#136AE1',
    color: 'white',
    fontSize: '18px',
    padding: '10px 20px',
    borderRadius: '3px',
    border: 'none',
    cursor: 'pointer',
    margin: '10px 0',
  },
  adminLink: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 20,
  },

};

export default LoginScreen;
