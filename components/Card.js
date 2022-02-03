import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  return (
    <View
      style={{ ...styles.card, ...props.style }}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 17,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 7,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});

export default Card;
