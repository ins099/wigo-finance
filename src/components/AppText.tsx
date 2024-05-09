import React from "react";
import { TextStyle, StyleSheet, Text, TextProps } from "react-native";
import { scale } from "react-native-size-matters";

interface ITextProps extends TextProps {
  color?: string;
  underline?: boolean;
  textStyle?: TextStyle;
  italic?: boolean;
  bold?: boolean;
  center?: boolean;
  right?: boolean;
  left?: boolean;
}

export const TextNormal: React.FC<ITextProps> = (props) => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.normal,
        color && { color: color },
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const TextSmall: React.FC<ITextProps> = (props) => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.small,
        color && { color },
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const TextSmaller: React.FC<ITextProps> = (props) => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.smaller,
        color && { color },
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const TextBig: React.FC<ITextProps> = (props) => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.big,
        color && { color },
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const TextBigger: React.FC<ITextProps> = (props) => {
  const {
    children,
    color,
    underline,
    textStyle,
    italic,
    bold,
    center,
    right,
    left,
  } = props;
  return (
    <Text
      style={[
        styles.text,
        styles.bigger,
        color && { color },
        underline && styles.underline,
        textStyle && textStyle,
        italic && styles.italic,
        bold && styles.bold,
        center && styles.center,
        right && styles.right,
        left && styles.left,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
  normal: {
    fontSize: scale(16),
  },
  small: {
    fontSize: scale(12),
  },
  smaller: {
    fontSize: scale(11),
  },
  big: {
    fontSize: scale(20),
  },
  bigger: {
    fontSize: scale(22),
  },
  underline: {
    textDecorationLine: "underline",
  },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  center: {
    textAlign: "center",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },
});
