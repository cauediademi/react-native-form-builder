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
  const {
    value: initialValue,
    name,
    meta,
    style,
    onChangeInputValue,
    isMandatory,
  } = props;
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(
    initialValue ? new Date(moment.tz(initialValue, 'UTC').valueOf()) : null,
  );

  const handleConfirm = (selectedDate) => {
    setShow(false);

    // TO BE ABLE TO INCLUDE ANY TIMEZONE WE NEED TO:
    // Create a moment object with the selected date but reset the time to the start of the day
    let momentDate = moment(selectedDate).startOf('day');
    // Convert the moment object to UTC while keeping it at the start of the day
    let utcDate = momentDate.clone().utc();
    // Format the UTC date to a string and pass it to the onChangeInputValue prop
    let dateString = utcDate.format('YYYY-MM-DD');
    onChangeInputValue(dateString);

    // Update the local date state if needed, keeping it as a local date object
    setDate(momentDate.toDate());
  };

  return (
    <View style={[style?.container, styles.container]}>
      <TouchableOpacity
        activeOpacity={1}
        style={{ padding: 0, height: 40 }}
        hitSlop={{ top: 5, bottom: 5, left: 20, right: 20 }}
        onPress={() => setShow(true)}
      >
        <Text style={[style?.title, styles.title]}>{`${
          meta.text || meta.title
        } ${isMandatory ? '*' : ''}`}</Text>
        <Text style={[style?.date, styles.date]}>
          {date ? moment(date).tz('UTC').format('DD/MM/YYYY') : ''}
        </Text>
      </TouchableOpacity>
      {show && (
        <DatePicker
          key={name}
          modal={true}
          open={show}
          date={date || new Date()} // Use a default date only when showing the picker
          mode={meta.mode || 'date'}
          locale={meta.locale}
          is24hourSource={true}
          onConfirm={handleConfirm}
          title={meta.selectTitle}
          confirmText={meta.confirmText}
          cancelText={meta.cancelText}
          onCancel={() => setShow(false)}
          style={[style?.dateInput, styles.dateInput]}
        />
      )}
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
