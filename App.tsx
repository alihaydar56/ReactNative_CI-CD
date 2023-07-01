/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';
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

  const _ontrackTestBtnEvent=()=>{
    Analytics.trackEvent('test_btn_click',{name:'Mr.Ali',userId:'123456'})
    
  }
  const _ontrackSubmitBtnEvent=()=>{
    Analytics.trackEvent('submit_btn_click',{name:'Mr.Micheal',userId:'12345'})
    
  }
  

  useEffect(()=>{
    isAppCrashedPrevious();
  },[])

  return (
    <View style={{flex:1,justifyContent:'center'}}>
      <Button title='Crash' onPress={()=>Crashes.generateTestCrash()} />
      <View style={{marginVertical:'4%'}}>
      <Button title='Test Btn Click' onPress={_ontrackTestBtnEvent}  />
      </View>
      <Button title='Submit Btn' onPress={_ontrackSubmitBtnEvent} />
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
