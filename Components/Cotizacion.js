import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Cotizacion = ({resultado}) => {
  if (Object.keys(resultado).length === 0) return null;
  return <Text>Este es el precio de cripto{resultado.PRICE}</Text>;
};

export default Cotizacion;
