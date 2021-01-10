import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Header from './Components/Header';
import Formulario from './Components/Formulario';

const App = () => {
  return (
    <>
      <Header />
      <Image
        style={styles.image}
        source={require('./assets/assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
