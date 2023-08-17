import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PlaceholderImage = require('../assets/images/logo.jpg');

const Image1 = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const imageWidth = screenWidth;
  const imageHeight = (18 / 9) * screenWidth; // Relación de aspecto de 16:9

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src={PlaceholderImage} style={{ ...styles.image, width: imageWidth, height: imageHeight }} alt="Placeholder" />
      </div>
    </div>
  );
};

const HomeScreenContent = () => {
  return (
    <div>
      <Image1 />
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    borderRadius: '18px',
  },
};

const HomeScreen = () => {
  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <HomeScreenContent />
      </div>
    </div>
  );
};

export default HomeScreen;
