import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { color } from '../styles';

const { width, height } = Dimensions.get('window');

export default function InputText(props) {
  const { name, value, meta, style, onChangeInputValue, isMandatory } = props;

  return (
    <View style={[style?.container, styles.container]} key={name}>
      <Text style={[style?.title, styles.title]}>{`${meta.label} ${
        isMandatory ? '*' : ''
      }`}</Text>
      <TextInput
        style={[
          style?.inputText,
          styles.textBox(meta.multiline, meta.numberOfLines),
        ]}
        value={value || ''}
        underlineColorAndroid="transparent"
        onChangeText={onChangeInputValue}
        accessibilityLabel={`input-${meta.label}`}
        editable
        placeholder={meta.placeholder}
        placeholderTextColor="#999999"
        multiline={meta.multiline}
        numberOfLines={meta.numberOfLines}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
  },
  title: {
    marginTop: 10,
    fontSize: (width / 100) * 4,
    fontFamily: 'SFProDisplay-Medium',
  },
  textBox: (multiline, numberOfLines) => ({
    height: !multiline ? 40 : 40 * numberOfLines,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
    color: '#3D464F',
  }),
});

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool,
};
