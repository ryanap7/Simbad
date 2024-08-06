import { Dimensions, PixelRatio } from 'react-native';

let screenWidth: number = Dimensions.get('window').width;
let screenHeight: number = Dimensions.get('window').height;

let initWidth: number = 375; 
let initHeight: number = 812; 

const setInitValues = (width: number, height: number): void => {
  initWidth = width;
  initHeight = height;
  screenWidth;
  screenHeight;
};

const scaleSize = (
  value: number,
  based: 'width' | 'height' = 'width',
): number => {
  const newSize =
    based === 'height'
      ? PixelRatio.roundToNearestPixel((screenHeight / initHeight) * value)
      : PixelRatio.roundToNearestPixel((screenWidth / initWidth) * value);

  return newSize;
};

const scaleFont = (size: number): number => {
  const scale = Math.min(screenWidth / initWidth, screenHeight / initHeight);
  const adjustedSize = Math.ceil(size * scale);
  return PixelRatio.roundToNearestPixel(adjustedSize);
};

export { scaleFont, scaleSize, setInitValues };

