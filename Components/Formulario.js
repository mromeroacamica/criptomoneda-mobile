import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptoMoneda,
  guardarMoneda,
  guardarCriptoMoneda,
  guardarConsultarApi,
}) => {
  const [criptoMonedas, guardarCriptoMonedas] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      guardarCriptoMonedas(resultado.data.Data);
      console.log(resultado.data.Data);
    };
    consultarApi();
  }, []);

  const obtenerMoneda = (moneda) => {
    guardarMoneda(moneda);
  };
  const obtenerCriptoMoneda = (cripto) => {
    guardarCriptoMoneda(cripto);
  };
  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptoMoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    guardarConsultarApi(true);
  };
  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios', [{text: 'Ok'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(moneda) => obtenerMoneda(moneda)}
        itemStyle={{height: 120}}>
        <Picker.Item label="--Seleccione--" value="" />
        <Picker.Item label="Dolar EEUU" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra" value="GBP" />
      </Picker>
      <Text style={styles.label}>Cryptomoneda</Text>
      <Picker
        selectedValue={criptoMoneda}
        onValueChange={(cripto) => obtenerCriptoMoneda(cripto)}
        itemStyle={{height: 120}}>
        <Picker.Item label="--Seleccione--" value="" />
        {criptoMonedas.map((cripto) => (
          <Picker.Item
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
            key={cripto.CoinInfo.Id}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
