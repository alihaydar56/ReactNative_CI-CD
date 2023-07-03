import React, { useEffect, useState } from 'react';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';




function App(): JSX.Element {
  const [inflationRate,setInflationRate]=useState<number>(0.0);
  const [riskFreeRate,setRiskFreeRate]=useState<number>(0.0);
  const [amount,setAmount]=useState<number>(0.0);
  const [timeInYears,setTimeInYears]=useState<number>(1);
  const [afterInflation,setAfterInflation]=useState<number>(0.0);
  const [atRiskFree,setAtRiskFree]=useState<number>(0.0);
  const [atRiskFreeAfterInflation,setAtRiskFreeAfterInflation]=useState<number>(0.0);
  const [difference,setDifferencee]=useState<number>(0);
 

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

  const calculateInflationImpact=(value:number, inflationRate:number, time:number)=> {
    return value / Math.pow(1+inflationRate, time);
  }

  const calculate=()=> {
    setAfterInflation(calculateInflationImpact(amount, inflationRate/100, timeInYears));
    setAtRiskFree(amount * Math.pow(1+riskFreeRate/100, timeInYears));
    setAtRiskFreeAfterInflation(calculateInflationImpact(atRiskFree, inflationRate/100, timeInYears));
    setDifferencee(atRiskFreeAfterInflation - afterInflation);
  }

  return (
    // <View style={{flex:1,justifyContent:'center'}}>
    //   <Button title='Crash' onPress={()=>Crashes.generateTestCrash()} />
    //   <View style={{marginVertical:'4%'}}>
    //   <Button title='Test Btn Click' onPress={_ontrackTestBtnEvent}  />
    //   </View>
    //   <Button title='Submit Btn' onPress={_ontrackSubmitBtnEvent} />
    // </View>

    <View style={styles.container}>
    <TextInput placeholder="Current inflation rate"
               style={styles.textBox} keyboardType='decimal-pad'
               onChangeText={(inflationRate) => setInflationRate(Number(inflationRate))}/>
    <TextInput placeholder="Current risk free rate"
               style={styles.textBox} keyboardType='decimal-pad'
               onChangeText={(riskFreeRate) => setRiskFreeRate(Number(riskFreeRate))}/>
    <TextInput placeholder="Amount you want to save"
               style={styles.textBox} keyboardType='decimal-pad'
               onChangeText={(amount) => setAmount(Number(amount))}/>
    <TextInput placeholder="For how long (in years) will you save?"
               style={styles.textBox} keyboardType='decimal-pad'
               onChangeText={(timeInYears) => setTimeInYears(Number(timeInYears))}/>
    <Button title="Calculate inflation"
            onPress={() => {
              calculate();
              Analytics.trackEvent('calculate_inflation', { Internet: 'WiFi', GPS: 'Off' });
            }} />
    <Text style={styles.label}>{timeInYears} years from now you will still have ${amount} but it will only be worth ${afterInflation}.</Text>
    <Text style={styles.label}>But if you invest it at a risk free rate you will have ${atRiskFree}.</Text>
    <Text style={styles.label}>Which will be worth ${atRiskFreeAfterInflation} after inflation.</Text>
    <Text style={styles.label}>A difference of: ${difference}.</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 41,
    marginHorizontal: 16
  },
  label: {
    marginTop: 10
  },
  textBox: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom:5
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
