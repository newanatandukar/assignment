import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import MyComponent from './src/MyComponent';

function App(): React.JSX.Element {
  const generateDummyData = () => {
    const dummyData = [];
    for (let i = 1; i <= 50; i++) {
      dummyData.push({
        id: i.toString(),
        name: `Lorem Impsum - ${i}`,
      });
    }
    return dummyData;
  };

  const data = generateDummyData();

  return (
    <SafeAreaView style={styles.container}>
      <MyComponent data={data} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
});

export default App;
