import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from "axios";
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20409a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white', // Color de texto blanco
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    maxWidth: 300,
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    width: 150,
    textDecoration: 'none', // Agrega un estilo para eliminar la decoración de enlace
  },
  buttonR: {
    marginHorizontal: 10,
    width: 150,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

function AdminScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    try {
      const res = await axios.post("http://172.18.4.15:9000/admin-login", {
        email,
        password,
      });

      if (res.data === "exist") {
        // Redirige a la pantalla deseada después del inicio de sesión
        window.location.href = '/HomeScreen';
      } else if (res.data === "incorrectPassword") {
        alert("Contraseña incorrecta");
      } else if (res.data === "notexist") {
        alert("El usuario no se ha registrado");
      }
    } catch (error) {
      alert("Error al procesar la solicitud");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ahora estás navegando como administrador</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo de Administrador"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Link to="/" style={styles.button}>
          <Button title="Volver" />
        </Link>
        <button style={styles.buttonR} onClick={submit}>Login</button>
      </View>
    </View>
  );
}

export default AdminScreen;
