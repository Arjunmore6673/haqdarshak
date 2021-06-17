import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = width / 320;

const widthToDp = number => {
    let givenWidth = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = number => {
    let givenHeight = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};


const fontToDp = number => {
    let givenSize = typeof number === 'number' ? number : parseFloat(number);
    const newSize = givenSize * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export { widthToDp, heightToDp, width, height, fontToDp };






