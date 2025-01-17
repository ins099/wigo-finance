import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

function ModalComp({ isModalVisible, setModalVisible }: any) {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default ModalComp;
