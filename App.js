import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Cotizacion from './Components/Cotizacion';
import axios from 'axios';

const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptoMoneda] = useState('');
  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        console.log(url);
        const resultado = await axios.get(url);
        guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
        guardarConsultarApi(false);
      }
    };
    cotizarCriptomoneda();
  }, [consultarApi]);

  return (
    <>
      <Header />
      <Image
        style={styles.image}
        source={require('./assets/assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptoMoneda={criptoMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
          guardarMoneda={guardarMoneda}
          guardarConsultarApi={guardarConsultarApi}
        />
        <Cotizacion resultado={resultado} />
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
