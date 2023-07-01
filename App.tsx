/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import * as Crashes from 'appcenter-crashes';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {

  const isAppCrashedPrevious=async()=>{
    const didCrash=await Crashes.hasCrashedInLastSession();
    if(didCrash){
      await Crashes.lastSessionCrashReport();
      Alert.alert('Sorry!',"Sorry for that crash. We're working on a solution!");
    }
  }

  useEffect(()=>{
    isAppCrashedPrevious();
  },[])

  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <Button title='Crash' onPress={()=>Crashes.generateTestCrash()} />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
