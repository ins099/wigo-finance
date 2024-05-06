import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
  onPress: () => void;
}

const IconButton: FC<PropsWithChildren<IProps>> = ({
  children,
  onPress,
}): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(250, 250, 250, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

export default IconButton;
