import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { CountryCode } from '../constants/countryData';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  label: string;
}

const Dropdown: FC<Props> = ({ label }) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
        <>
          {CountryCode.map((data, i): any => (
            <Text key={i} style={styles.dropdown}>
              {data.dial_code}
            </Text>
          ))}
        </>
      );
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={styles.buttonText}>{label}</Text>
      <Image
        source={require('../assets/images/droparrow.png')}
        resizeMode="contain"
        style={{
          width: windowWidth / 30,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',

    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    height: 50,
    width: '100%',

    paddingVertical: windowHeight / 90,
    marginTop: windowHeight / 35,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,

    color: '#fff',
    fontWeight: 100,
    fontSize: windowWidth / 28,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#182561',
    color: '#fff',
    top: 50,
    width: '100%',
    fontWeight: 100,
    fontSize: windowWidth / 28,
    paddingLeft: windowWidth / 60,
    paddingVertical: windowWidth / 100,
    borderBottomLeftRadius: windowWidth / 100,
    borderBottomRightRadius: windowWidth / 100,
    zIndex: 1000,
  },
});

export default Dropdown;
