import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../../assets/Images/Images';
import {widthToDp} from '../../../utils/Responsive';
import {colors} from '../../../styles/colors';


/**
 * passing use state separately
 *
 * @param inputStyle
 * @param onChangeText
 * @param containerStyle
 * @param value
 * @param mainContainer
 * @param onCrossPress
 * @param error
 * @param props
 * @returns {*}
 * @constructor
 */
const InputSearchPass = ({
  inputStyle,
  containerStyle,
  mainContainer,
  value,
  onChangeText,
  onCrossPress,
  error = '',
  ...props
}) => {
  return (
    <View style={[styles.mainContainer, mainContainer]}>
      <View style={[styles.containerStyle, containerStyle]}>
        <Image source={Images.homeSearch} style={styles.imageStyle} />
        <TextInput
          autoCorrect={false}
          autoComplete={false}
          returnKeyType="done"
          keyboardType="default"
          placeholderTextColor="#505C74"
          style={[styles.inputStyle, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        {value.length > 0 ? (
          <TouchableOpacity onPress={onCrossPress} style={styles.crossStyle}>
            <Image source={Images.cross} style={styles.crossImage} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error && error.length > 0 ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};
export default InputSearchPass;

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius:10,
    marginHorizontal: widthToDp('4%'),
    flexDirection: 'row',
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
  },
  imageStyle: {
    resizeMode: 'contain',
    width: widthToDp('5%'),
    height: widthToDp('5%'),
    marginLeft: widthToDp('2%'),
    marginRight: widthToDp('1%'),
  },
  inputStyle: {
    flex: 1,
    height: widthToDp(10),
    padding: widthToDp('2'),
  },
  mainContainer: {backgroundColor: colors.white},
  crossStyle: {
    height: widthToDp(10),
    width: widthToDp(10),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: widthToDp(1),
  },
  crossImage: {
    width: widthToDp(4),
    height: widthToDp(4),
    resizeMode: 'contain',
  },
  errorText: {
    marginHorizontal: widthToDp(4.5),
    color: 'red',
  },
  boxStyleAmount: {},
});
