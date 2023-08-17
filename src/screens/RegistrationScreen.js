import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegistrationScreen = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const datosUsuario = {
      username,
      birthdate,
      gender,
      weight,
      height,
      email,
      password,
    };
    try {
      const respuesta = await axios.post('http://172.18.4.15:9000/register', datosUsuario);
      const resultado = respuesta.data; // Accede directamente a los datos en formato JSON

      
      if (resultado === 'success') {
        navigate('/'); // Cambia 'Login' por la ruta correcta
      } else {
        // Maneja el error de registro
        // Por ejemplo, muestra un mensaje de error al usuario
      }
    } catch (error) {
      console.error('Error de registro:', error);
      // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
    }
  };

  const handleBack = () => {
    // Navigate back to the previous screen (e.g., LoginScreen)
    navigate('/'); // Cambia 'Login' por la ruta correcta
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>REGISTRARSE</h1>
      <div style={styles.inputSection}>
        <label style={styles.fieldTitle}>Nombre de usuario</label>
        <input
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
        />
      </div>
      <div style={styles.inputSection}>
        <label style={styles.fieldTitle}>Fecha de Nacimiento</label>
        <input
          style={styles.input}
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          placeholder="DD/MM/AAAA"
        />
      </div>
      <div style={styles.inputSection}>
        <label style={styles.fieldTitle}>Género</label>
        <input
          style={styles.input}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Género"
        />
      </div>
      <div style={styles.inputSection}>
        <label style={styles.fieldTitle}>Peso</label>
        <input
          style={styles.input}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Peso (kg)"
        />
      </div>
      <div style={styles.inputSection}>
        <label style={styles.fieldTitle}>Altura</label>
        <input
          style={styles.input}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Altura (cm)"
        />
      </div>
      <div style={styles.inputSection}>
        <label style={styles.fieldTitle}>Correo Electrónico</label>
        <input
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electrónico"
          type="email"
        />
      </div>
      <div style={styles.inputSection}>
        <label style={styles.fieldTitle}>Contraseña</label>
        <input
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          type="password"
        />
      </div>
      <div style={styles.buttons}>
         <Link to="/" style={styles.buttonBack}>
          Volver
        </Link>
        <button style={styles.button} onClick={handleRegister}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '20px',
  },
  inputSection: {
    marginBottom: '20px',
    display: 'flex', // Cambio importante: usa flexbox para alinear en columna
    flexDirection: 'column', // Cambio importante: alinea en columna vertical
    alignItems: 'flex-start', // Alinea el contenido a la izquierda
  },
  fieldTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: '8px',
  },
  input: {
    width: '200px',
    padding: '10px',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderRadius: '4px',
    marginBottom: '10px',
    fontSize: '16px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', // Centra los botones horizontalmente
    width: '100%',
    marginTop: '10px',
  },
  button: {
    padding: '12px 35px',
    backgroundColor: '#007bff',
    borderRadius: '4px',
    alignItems: 'center',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '0 60px', // Reduce la separación horizontal entre botones
  },
};

export default RegistrationScreen;