import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const { width, height } = Dimensions.get('window');

export default function Datepicker(props) {
  let { value } = props;
  const { name, meta, style, onChangeInputValue, isMandatory } = props;
  const [show, setShow] = useState(false);

  // Converts both timestamp and string date values to be used by DatePicker
  value = value
    ? new Date(moment.tz(value, 'UTC').valueOf())
    : new Date(moment.tz('UTC').valueOf());

  return (
    <View style={[style?.container, styles.container]}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          padding: 0,
          height: 40,
        }}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => setShow(true)}
      >
        <Text style={[style?.title, styles.title]}>{`${
          meta.text || meta.title
        } ${isMandatory ? '*' : ''}`}</Text>
        <Text style={[style?.date, styles.date]}>
          {value.getDate() +
            '/' +
            (value.getMonth() + 1) +
            '/' +
            value.getFullYear()}
        </Text>
        <DatePicker
          key={name}
          modal={true}
          open={show}
          date={value}
          mode={meta.mode || 'date'}
          locale={meta.locale}
          is24hourSource={true}
          onConfirm={(date) => {
            setShow(false);
            let dateString = moment(date).tz('UTC').format('YYYY-MM-DD'); // Convert date object to string in UTC
            onChangeInputValue(dateString); // Pass string to parent function
          }}
          title={meta.selectTitle}
          confirmText={meta.confirmText}
          cancelText={meta.cancelText}
          onCancel={() => {
            setShow(false);
          }}
          style={[style?.dateInput, styles.dateInput]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 50,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#C3C6CA',
    alignSelf: 'center',
  },
  title: {
    position: 'absolute',
    fontSize: (width / 100) * 4,
    fontFamily: 'SFProDisplay-Medium',
  },
  date: {
    top: (height / 100) * 3,
    justifyContent: 'center',
  },
  dateInput: {
    padding: 0,
    marginTop: (height / 100) * 5,
    alignItems: 'stretch',
  },
});

Datepicker.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool,
};
