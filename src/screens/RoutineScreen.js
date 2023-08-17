import React, { useState, useEffect } from 'react';

const RoutineScreen = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    fetch('http://172.18.4.15:9000/ejercicios') // Cambia la URL a la dirección de tu API de ejercicios
      .then(response => response.json())
      .then(data => setSelectedExercises(data))
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  return (
    <div style={styles.container}>
      <button onClick={() => window.location.href = '/'} style={styles.backButton}>
        &#8592; Volver
      </button>
      <h1 style={styles.title}>Rutinas de Ejercicio</h1>
      <div style={styles.exerciseList}>
        {selectedExercises.map((exercise, index) => (
          <div key={index} style={styles.exerciseContainer}>
            <h2 style={styles.bodyPartTitle}>{exercise.parte_cuerpo}</h2>
            <div style={styles.selectedExercise}>
              <h3 style={styles.exerciseName}>{exercise.name}</h3>
              <p style={styles.exerciseDifficulty}>{exercise.difficulty}</p>
              <img
                style={styles.exerciseImage}
                src={exercise.img}
                alt={exercise.name}
              />
              <h4 style={styles.exerciseStepsTitle}>Pasos:</h4>
              <p style={styles.exerciseSteps}>{exercise.steps}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
    padding: '32px',
  },
  backButton: {
    fontSize: '20px',
    marginBottom: '32px',
    padding: '8px 16px',
    backgroundColor: '#007AFF', // Color azul
    color: 'white', // Texto en blanco
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '32px',
    color: '#333',
    textAlign: 'center',
  },
  exerciseList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  exerciseContainer: {
    marginBottom: '32px',
    maxWidth: '600px',
    width: '100%',
  },
  bodyPartTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#555',
  },
  selectedExercise: {
    border: '1px solid #ccc',
    padding: '24px',
    borderRadius: '8px',
    background: '#fff',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  exerciseName: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  },
  exerciseDifficulty: {
    fontSize: '18px',
    marginBottom: '16px',
    color: '#777',
  },
  exerciseImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '16px',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  exerciseStepsTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  },
  exerciseSteps: {
    fontSize: '18px',
    lineHeight: '1.5',
    color: '#555',
  },
};

export default RoutineScreen;
