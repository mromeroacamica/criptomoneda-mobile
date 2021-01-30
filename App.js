import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Cotizacion from './Components/Cotizacion';
import axios from 'axios';

const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptoMoneda] = useState('');
  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        guardarCargando(true);
        //Ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
          guardarConsultarApi(false);
          guardarCargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarApi]);

  //mostrar el spinner o el resultado

  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5e49e2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <>
      <ScrollView>
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
        </View>
        <View style={{marginTop: 40}}>{componente}</View>
      </ScrollView>
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
