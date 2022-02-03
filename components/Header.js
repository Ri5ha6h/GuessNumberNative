import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import Colors from '../constants/colors';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 85,
    paddingTop: 26,
    backgroundColor:
      Platform.OS === 'ios'
        ? 'white'
        : Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth:
      Platform.OS === 'ios' ? 2 : 0,
    borderBottomColor:
      Platform.OS === 'ios'
        ? '#ccc'
        : 'transparent',
  },
  title: {
    color:
      Platform.OS === 'ios'
        ? Colors.primary
        : 'white',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default Header;
