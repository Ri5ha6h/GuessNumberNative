import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import Number from '../components/Number';
import MyButton from '../components/MyButton';

const StartScreen = (props) => {
  const [inputVal, setInputVal] = useState('');
  const [confirmed, setConfirmed] =
    useState(false);
  const [selectedNum, setSelectedNum] =
    useState();

  const handleInput = (inputText) => {
    setInputVal(inputText.replace(/[^0-9]/g, ''));
  };

  const handleReset = () => {
    setInputVal('');
    setConfirmed(false);
  };

  const handleConfirm = () => {
    const chosenNum = parseInt(inputVal);
    if (
      isNaN(chosenNum) ||
      chosenNum <= 0 ||
      chosenNum > 99
    ) {
      Alert.alert(
        'Invalid Number!!',
        'Number should be between 1 to 99!!',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: handleReset,
          },
        ]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNum(chosenNum);
    setInputVal('');
    Keyboard.dismiss();
  };

  let confirmedVal;

  if (confirmed) {
    confirmedVal = (
      <Card style={styles.outputCont}>
        <Text>Selected number</Text>
        <Number>{selectedNum}</Number>
        <MyButton
          onPress={() =>
            props.onStart(selectedNum)
          }
        >
          START GAME
        </MyButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.startScreen}>
            <Text style={styles.startTitle}>
              Let's Play
            </Text>
            <Card style={styles.inputCont}>
              <Text style={styles.inputText}>
                Select a Number
              </Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={2}
                keyboardType='number-pad'
                value={inputVal}
                onChangeText={handleInput}
              />
              <View style={styles.buttonCont}>
                <View style={styles.btn}>
                  <Button
                    onPress={handleReset}
                    title='Reset'
                    color={Colors.secondary}
                  />
                </View>
                <View style={styles.btn}>
                  <Button
                    onPress={handleConfirm}
                    title='Confirm'
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedVal}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  startScreen: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  startTitle: {
    fontSize: 21,
    fontWeight: '700',
    marginVertical: 10,
  },
  inputCont: {
    marginTop: 15,
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
  input: {
    width: '20%',
    textAlign: 'center',
  },
  buttonCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  btn: {
    width: '40%',
    //  width: Dimensions.get('window').width / 4,
  },
  outputCont: {
    marginTop: 15,
    alignItems: 'center',
  },
});

export default StartScreen;
