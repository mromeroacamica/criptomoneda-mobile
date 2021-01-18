import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptoMoneda] = useState('');
  const [criptoMonedas, guardarCriptoMonedas] = useState('');

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
  const obtenerCriptoMoneda = (moneda) => {
    guardarCriptoMoneda(moneda);
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
        onValueChange={(moneda) => obtenerCriptoMoneda(moneda)}
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
});

export default Formulario;
