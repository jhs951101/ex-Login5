import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert,
  BackHandler, TouchableWithoutFeedback, Keyboard} from 'react-native';

  export default function LoginScreen({navigation}) {

  const [usernameTxt, setUsernameTxt] = useState('');
  const [passwordTxt, setPasswordTxt] = useState('');

  const changeHandler_usernameTxt = (val) => {
      setUsernameTxt(val);
  }

  const changeHandler_passwordTxt = (val) => {
      setPasswordTxt(val);
  }

  const submitHandler = async (usernameTxt, passwordTxt) => {

    try {
      if(usernameTxt.length < 1){
        Alert.alert('WAIT!', '아이디를 입력하십시오', [
          {text: '확인'}
        ]);
      }
      else if(passwordTxt.length < 1){
        Alert.alert('WAIT!', '비밀번호를 입력하십시오', [
          {text: '확인'}
        ]);
      }
      else {
        const response = await fetch('(주소 입력)', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: usernameTxt,
            password: passwordTxt,
          })
        });
        const json = await response.json();

        if(json.success){
          navigation.navigate('UserInfo', {
            username: json.username,
            name: json.name,
            gender: json.gender,
          });
        }
        else {
          Alert.alert('ERROR!', '아이디 또는 비밀번호가 일치하지 않습니다', [
            {text: '확인'}
          ]);
        }
      }

    } catch (error) {
      console.error(error);
      Alert.alert('ERROR!', '네트워크 연결을 확인하십시오', [
        {text: '확인'}
      ]);
    }
  }

  const quitHandler = () => {
    BackHandler.exitApp();
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <View style={styles.inner_container}>
          <Text style={[styles.output_text, styles.items]}>
            Welcome!
          </Text>

          <TextInput
            style={[styles.input_text, styles.items]}
            placeholder='아이디를 입력하십시오'
            onChangeText={changeHandler_usernameTxt}
          />

          <TextInput
            style={[styles.input_text, styles.items]}
            placeholder='비밀번호를 입력하십시오'
            onChangeText={changeHandler_passwordTxt}
          />

          <Button
            title='로그인'
            color='#00C800'
            onPress={() => submitHandler(usernameTxt, passwordTxt)}
          />

          <Button
            title="회원가입"
            color='#00C8FF'
            /*onPress={() => navigation.navigate('SignUp')}*/
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inner_container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
  },

  items: {
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 6,
  },

  output_text: {
      fontWeight: 'bold',
      textAlign: 'center',
  },

  input_text: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
})