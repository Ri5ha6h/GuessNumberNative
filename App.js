import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import Header from './components/Header';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import OverScreen from './screens/OverScreen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf'),
  });
};

const App = () => {
  const [userNum, setUserNum] = useState();
  const [guessRounds, setGuessRounds] =
    useState(0);
  const [loading, setLoading] = useState(false);

  if (!loading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setLoading(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const handleNewGame = () => {
    setGuessRounds(0);
    setUserNum(null);
  };

  const handleNum = (userInput) => {
    setUserNum(userInput);
  };

  const handleRounds = (rounds) => {
    setGuessRounds(rounds);
  };

  let content = (
    <StartScreen onStart={handleNum} />
  );
  if (userNum && guessRounds <= 0) {
    content = (
      <GameScreen
        userChoice={userNum}
        gameOver={handleRounds}
      />
    );
  } else if (guessRounds > 0) {
    content = (
      <OverScreen
        rounds={guessRounds}
        userNumber={userNum}
        newGame={handleNewGame}
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header title='Guess Number' />
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
