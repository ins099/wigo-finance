import { Button } from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function CalendarPicker() {
  const [date, setDate] = useState(new Date());


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: windowHeight / 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
      }}
      onPress={showDatepicker}>
      <TextInput
        style={{ ...styles.input2 }}
        placeholder="Date of birth"
        placeholderTextColor="rgba(255,255,255,0.8)"
        editable={false}
        value={date.toLocaleDateString()}
      />

      <Image
        source={require('../assets/images/daterangeIcon.png')}
        resizeMode="contain"
        style={{
          width: windowWidth / 20,
          marginTop: '8%',
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input2: {
    fontWeight: '400',
    fontSize: windowWidth / 28,
    paddingVertical: windowHeight / 90,

    borderColor: '#fff',
    color: '#fff',
    marginTop: windowHeight / 35,
  },
});
