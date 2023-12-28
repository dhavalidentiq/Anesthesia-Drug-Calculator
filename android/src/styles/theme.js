import {Dimensions, Platform} from 'react-native';
import {responsiveScale} from './mixins';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';

const white = '#FFFFFF';
const offWhite = '#e8e6e1';
const slateBlue = '#637381';
const black = '#000000';
const themeColor = '#00AB55';
const gainsboro = '#9da39f';
const darkgray = '#a9a9a9';
const tomato = '#DD5421';
const lightGrey = '#c0c0c0';

const colors = {
  primary: '#9ACD32',
  secondary: '#00CC79',
  black: '#222222',
  black2: '#1B1B23',
  black3: '#252E43',
  whiteSmoke: '#f0f0f0',
  accent: '#007CC2',
  red: '#FF0000',
  red3: '#FFF3F3',
  red4: '#FF4444',
  gray8: '#EDEDF4',
  gray9: '#a3a0ac',
  gray: '#77869E',
  gray2: '#7A7D84',
  gray3: '#aeb7c7',
  gray4: '#f4f6f7',
  gray5: '#ebebeb',
  gary6: '#49494F',
  gary7: '#E9E9E9',
  headingLight: '#F6F7F8',
  lightgray: '#C5C8D6',
  mediumGray: '#DDDDDD',
  lightBlack: '#0000004d',
  darkBlack: '#1B1B23',
  cartBorderColor: '#DEE1E7',
  AliceBlue: '#F6F8FD',
  Gray_Light: '#E7E6EB',
  dropBackColor: '#5e5e5e',

  errorTxt: '#D64141',
  cancelbtn: '#FFDADA',

  primarydark: '#a5845e',
  tertiary: '#FFE358',
  cancel: '#F9A400',
  white: '#FFFFFF',
  lightGrey: '#77869E',
  warmblack: '#220000',
  coolblack: '#021323',
  pureblack: '#231f20',
  disableGray: '#CECDCD',
  veryLightGray: '#CECECE',
  linkWater: '#BEC8D9',
  whiteSmoke2: '#f2f2f2',
  whiteSmoke3: '#f5f5f5',
  whiteSmoke4: '#f9f9f9',
  skyBlue: '#80bee1',
  skyBlue1: '#E6F0FF',
  skyBlue2: '#F3F6FB',
  skyBlue3: '#DDEBFF',
  skyblue4: '#E2EEFF',
  skyBlue5: '#E8F1FF',
  royalBlue: '#2962FF',
  brown: '#c4ac90',
  transparent: 'transparent',
  blue: '#017BC0',
  lightBlue: '#3b5898',
  primaryblue: '#3983F1',
  darkBlue1: '#118CFF',
  green: '#30A050',
  green1: '#67BE65',
  darkPink: '#8330A0',
  darkpink1: '#C977F5',
  pink: '#F3E4FF',
  lightYellow: '#FFF3C8',
  yellow: '#DA9B22',
  lightRed: '#FFE6E6',
  lightOrange: '#FFEACA',
  Orange: '#E26F04',
  lightGreen1: '#ECF7EC',
  leghtBlue: '#4D81E9',
  tabBackGroundColor: '#0D79FF',
  // Heading Text colors

  mainHeadingTextColor: black,
  mediumHeadingTextColor: slateBlue,
  subHeadingTextColor: gainsboro,

  // FlatList Item Border Color
  borderColor: '#ECF1FA',

  // Normal Text colors

  normalTextColor: black,
  mediumTextColor: slateBlue,
  validatonTextColor: tomato,
  buttonTextColor: white,

  // Boader colors

  borderDarkColor: darkgray,
  lightBorderColor: lightGrey,

  // Buttons

  largeButtonColor: themeColor,
  mediumButtonColor: '',
  smallButtonColor: '',

  // Screen Background colors

  viewBackgroundColor: white,
  logoTextColor: themeColor,
  loaderColor: white,
  textInputBackgroundColor: white,
  dashboardItemMainViewColor: offWhite,
  shadowColor: '#38506714',
  themeColor: '#778FD9',
  themeColorNew: '#0051C6',
  drawerText: '#49494fcc',

  // Header theme Color
  skyColor: '#ddebff80',
  headerThemeColor: '#778FD9',
  lightGreen: '#DCF0DB',
  primaryblue10: '#F3F6FB',
  gray10: '#DEE1E7',
  gray40: '#A4A4A7',
  gray50: '#a1a1a5',
  addressBorderColor: '#A8CBFF',
  textInputbackgroundColor: '#EBF3FF',
  darkBlue: '#3E72BC',
  darkBlue2: '#5878A6',
  lightSky: '#CFE3FF',
  grayText: '#686869',
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
var tabHeight = deviceHeight * 0.08;
var categoriesSpacing = 10;
var screenHeight = deviceHeight - deviceHeight * 0.13;

export const removeExtraSpace = s => s?.trim().split(/ +/).join(' ');

const designResolution = {
  width: 375,
  height: 812,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

const sizes = {
  // global sizes
  base: 16,
  font: 14,
  radius: 10,
  padding: 25,
  heading: responsiveScale(15),
  inputHeight: responsiveScale(30),
  // font sizes
  h1: responsiveScale(26),
  h2: responsiveScale(20),
  h3: responsiveScale(18),
  title: responsiveScale(17),
  header: responsiveScale(16),
  medium: responsiveScale(13),
  body: responsiveScale(14),
  caption: responsiveScale(12),
  small: responsiveScale(10),
};

const arabicInputStyle = isArabic => {
  let style = {
    textAlign: 'left',
    // transform: [{ scaleX: isArabic ? -1 : 1 }],
  };

  return style;
};

var isIos = Platform.OS === 'ios' ? true : false;

var font = {
  roboto: 'RobotoSlab-Black',
  roboto_Bold: 'RobotoSlab-Bold',
  roboto_Extra_Bold: 'RobotoSlab-ExtraBold',
  roboto_Extra_Light: 'RobotoSlab-ExtraLight',
  roboto_Light: 'RobotoSlab-Light',
  roboto_Medium: 'RobotoSlab-Medium',
  roboto_Regular: 'RobotoSlab-Regular',
  roboto_light: 'RobotoSlab-SemiBold',
  roboto_Semi_Bold: 'RobotoSlab-SemiBold',
  outfit: 'Outfit-Black',
  outfit_Bold: 'Outfit-Bold',
  outfit_Extra_Bold: 'Outfit-ExtraBold',
  outfit_Extra_Light: 'Outfit-ExtraLight',
  outfit_Light: 'Outfit-Light',
  outfit_Medium: 'Outfit-Medium',
  outfit_Regular: 'Outfit-Regular',
  outfit_Semi_Bold: 'Outfit-SemiBold',
  outfit_Thin: 'Outfit-Thin',
};

var mediumIcon = deviceWidth * 0.05;

var smallIcon = deviceWidth * 0.04;

var largeIcon = deviceWidth * 0.1;

const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  h3: {
    fontSize: sizes.h3,
  },
  header: {
    fontSize: sizes.header,
  },
  heading: {
    fontSize: sizes.heading,
  },
  title: {
    fontSize: sizes.title,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
  small: {
    fontSize: sizes.small,
  },
};

export {
  colors,
  sizes,
  fonts,
  font,
  deviceWidth,
  deviceHeight,
  isIos,
  screenHeight,
  tabHeight,
  mediumIcon,
  smallIcon,
  largeIcon,
  categoriesSpacing,
  arabicInputStyle,
  perfectSize,
};
