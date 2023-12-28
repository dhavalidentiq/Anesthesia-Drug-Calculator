import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Bolus from '../assets/appImages/Bolus.svg';
import Infusion from '../assets/appImages/Infusion.svg';
import Spinal from '../assets/appImages/Spinal.svg';
import BolusWhiteIcon from '../assets/appImages/BolusWhiteIcon.svg';
import SpinalWhiteIcon from '../assets/appImages/SpinalWhiteIcon.svg';
import InfusionWhiteIcon from '../assets/appImages/InfusionWhiteIcon.svg';
import InfusionRedIcon from '../assets/appImages/InfusionRedIcon.svg';
import SpinalRedIcon from '../assets/appImages/SpinalRedIcon.svg';
import BolusRedIcon from '../assets/appImages/BolusRedIcon.svg';
import Text from './utilities/Text';
import EpiduralWhite from '../assets/appImages/EpiduralWhite.svg';
import EpiduralRed from '../assets/appImages/EpiduralRed.svg';
import EpiduralIcon from '../assets/appImages/EpiduralIcon.svg';

import Intramuscular from '../assets/appImages/Intramuscular.svg';
import IntramuscularWhite from '../assets/appImages/IntramuscularWhite.svg';
import IntramuscularRed from '../assets/appImages/IntramuscularRed.svg';

import Rectal from '../assets/appImages/Rectal.svg';
import RectalRed from '../assets/appImages/RectalRed.svg';
import RectalWhite from '../assets/appImages/RectalWhite.svg';
import Intranasal from '../assets/appImages/Intranasal.svg';
import IntranasalWhite from '../assets/appImages/IntranasalWhite.svg';
import IntranasalRed from '../assets/appImages/IntranasalRed.svg';
import Oral from '../assets/appImages/Oral.svg';
import OralRed from '../assets/appImages/OralRed.svg';
import OralWhite from '../assets/appImages/OralWhite.svg';
import Endotracheal from '../assets/appImages/Endotracheal.svg';
import Subcutaneous from '../assets/appImages/Subcutaneous.svg';
import SubcutaneousRed from '../assets/appImages/SubcutaneousRed.svg';
import SubcutaneousWhite from '../assets/appImages/SubcutaneousWhite.svg';
import EndotrachealRed from '../assets/appImages/EndotrachealRed.svg';
import EndotrachealWhite from '../assets/appImages/EndotrachealWhite.svg';
import { AnimatePresence, MotiView } from 'moti';
import { font, perfectSize } from '../styles/theme';
import { responsiveScale } from '../styles/mixins';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('screen');
const _spacing = 20;
const _borderRadius = 20;

const PurposeItemView = ({ item, IBW, Weight, bgColor, textColor, title }) => {
  const [selected, setSelected] = React.useState(false);

  const setIcon = (iconType, textColor) => {
    switch (iconType) {
      case 'bolus':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <BolusWhiteIcon width={'80%'} height={'80%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <BolusRedIcon width={'80%'} height={'80%'} />
        ) : (
          <Bolus width={'80%'} height={'80%'} />
        );

      case 'infusion':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <InfusionWhiteIcon width={'70%'} height={'70%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <InfusionRedIcon width={'70%'} height={'70%'} />
        ) : (
          <Infusion width={'70%'} height={'70%'} />
        );

      case 'spinal':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <SpinalWhiteIcon width={'70%'} height={'70%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <SpinalRedIcon width={'70%'} height={'70%'} />
        ) : (
          <Spinal width={'70%'} height={'70%'} />
        );

      case 'epidural':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <EpiduralWhite width={'70%'} height={'70%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <EpiduralRed width={'70%'} height={'70%'} />
        ) : (
          <EpiduralIcon width={'70%'} height={'70%'} />
        );

      case 'intramuscular':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <IntramuscularWhite width={'70%'} height={'70%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <IntramuscularRed width={'70%'} height={'70%'} />
        ) : (
          <Intramuscular width={'70%'} height={'70%'} />
        );

      case 'im':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <IntramuscularWhite width={'70%'} height={'70%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <IntramuscularRed width={'70%'} height={'70%'} />
        ) : (
          <Intramuscular width={'70%'} height={'70%'} />
        );

      case 'rect':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <RectalWhite width={'70%'} height={'70%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <RectalRed width={'70%'} height={'70%'} />
        ) : (
          <Rectal width={'70%'} height={'70%'} />
        );

      case 'in':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <IntranasalWhite width={'100%'} height={'100%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <IntranasalRed width={'100%'} height={'100%'} />
        ) : (
          <Intranasal width={'100%'} height={'100%'} />
        );

      case 'po':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <OralWhite width={'70%'} height={'70%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <OralRed width={'70%'} height={'70%'} />
        ) : (
          <Oral width={'70%'} height={'70%'} />
        );

      case 'ett':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <EndotrachealWhite width={'70%'} height={'70%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <EndotrachealRed width={'70%'} height={'70%'} />
        ) : (
          <Endotracheal width={'70%'} height={'70%'} />
        );

      case 'sq':
        return (textColor === '#FFFFFF' || textColor === 'white') &&
          selected ? (
          <SubcutaneousWhite width={'70%'} height={'70%'} />
        ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
          <SubcutaneousRed width={'70%'} height={'70%'} />
        ) : (
          <Subcutaneous width={'70%'} height={'70%'} />
        );

      default:
        return null;
    }
  };

  const roundToNearest = (number, decimal) => {
    return Math.round(decimal * number) / decimal;
  };

  const low = item?.perIBW
    ? roundToNearest(item?.low * IBW, 10)
    : item?.perKg
    ? roundToNearest(item?.low * Weight, 10)
    : item.low;
  const high = item?.perIBW
    ? roundToNearest(item?.high * IBW, 10)
    : item?.perKg
    ? roundToNearest(item?.high * Weight, 10)
    : item?.high;

  const perKgRange = item => {
    if (item?.perKg) {
      if (item?.high) {
        return (
          <Text style={[styles.KgRangeText, { color: textColor }]}>{`(${
            item?.low
          } - ${item?.high} ${item?.unitsKg}${item?.weightUnits}${
            item?.infusionUnits ?? ''
          })`}</Text>
        );
      } else {
        return (
          <Text style={[styles.KgRangeText, { color: textColor }]}>{`(${
            item?.low
          } ${item?.unitsKg}${item?.weightUnits}${
            item?.infusionUnits ?? ''
          })`}</Text>
        );
      }
    } else {
    }
  };

  const mgRange = item => {
    if (item?.max) {
      if (low >= item?.max) {
        return (
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[styles.mgRangeText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {item?.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
            </Text>
            <Text
              style={[styles.mgRangeText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {item?.max} {item?.unitsKg}{' '}
            </Text>
          </View>
        );
      } else {
        //the low is lower than the max
        if (item.high) {
          if (item.high >= item.max) {
            //the high is higher than the max OUTPUT LOW - MAX
            return (
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[styles.mgRangeText, { color: textColor }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {item?.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
                </Text>
                <Text
                  style={[styles.mgRangeText, { color: textColor }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {low} - {item?.max} {item?.unitsKg}{' '}
                </Text>
              </View>
            );
          } else {
            //the high is lower than the max. OUTPUT LOW - HIGH
            return (
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[styles.mgRangeText, { color: textColor }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {item?.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
                </Text>
                <Text
                  style={[styles.mgRangeText, { color: textColor }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  {low} - {high} {item?.unitsKg}{' '}
                </Text>
              </View>
            );
          }
        } else {
          //there is no high.  OUTPUT THE LOW
          return (
            <Text
              style={[styles.mgRangeText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {low} {item?.unitsKg}{' '}
            </Text>
          );
        }
      }
    } else {
      //there is no max.
      if (item?.high) {
        //if there's a high, OUTPUT LOW - HIGH
        return (
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={[styles.mgRangeText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {item?.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
            </Text>
            <Text
              style={[styles.mgRangeText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {low} - {high} {item?.unitsKg}{' '}
            </Text>
          </View>
        );
      } else {
        //there is no high, OUTPUT LOW
        return (
          <Text
            style={[styles.mgRangeText, { color: textColor }]}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {low} {item?.unitsKg}{' '}
          </Text>
        );
      }
    }
  };

  const mlRange = item => {
    if (item?.supplied) {
      // if (roundToNearest(high / item?.supplied, 10) > 0) {
      //makes sure theres a high > 0
      if (item?.max != null) {
        //checks to make sure the high is not > the max
        if (low > item?.max) {
          return (
            <Text
              style={[styles.mlRangeText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {roundToNearest(item?.max / item?.supplied, 100)} mL (
              {item?.supplied} {item?.unitsKg}/mL)
            </Text>
          );
        } else {
          return (
            <Text
              style={[styles.mlRangeText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {roundToNearest(low / item?.supplied, 100)} -{' '}
              {roundToNearest(item?.max / item?.supplied, 10)} mL (
              {item?.supplied} {item?.unitsKg}/mL)
            </Text>
          );
        }
      } else if (item?.high) {
        return (
          <>
            <Text
              style={[styles.mlRangeText, { color: textColor }]}
              numberOfLines={1}
              adjustsFontSizeToFit>
              {roundToNearest(low / item?.supplied, 100)} -{' '}
              {roundToNearest(high / item?.supplied, 10)} mL ({item?.supplied}{' '}
              {item?.unitsKg}/mL)
            </Text>
          </>
        );
      } else {
        return (
          <Text
            style={[styles.mlRangeText, { color: textColor }]}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {roundToNearest(low / item?.supplied, 100)} mL ({item?.supplied}{' '}
            {item?.unitsKg}/mL)
          </Text>
        );
      }
      // }
    }
  };

  const renderMethod = () => {
    if (item?.method === 'bolus') {
      return 'IV Bolus';
    } else if (item?.method === 'infusion') {
      return 'IV Infusion';
    } else if (item?.method === 'intramuscular') {
      return 'IM Dose';
    } else if (item?.method === 'spinal') {
      return 'Spinal Dose';
    } else if (item?.method === 'epidural') {
      return 'Epidural Dose';
    } else if (item?.method === 'in') {
      return 'Intranasal Dose';
    } else if (item?.method === 'rect') {
      return 'Rectal Dose';
    } else if (item?.method === 'po') {
      return 'Oral Dose';
    } else if (item?.method === 'im') {
      return 'Intramuscular Dose';
    } else if (item?.method === 'ett') {
      return 'Endotracheal Dose';
    } else if (item?.method === 'sq') {
      return 'Subcutaneous Dose';
    }
  };

  const gradientColors =
    bgColor === '#F8F4F3' ? [bgColor, '#CBC5C2'] : [bgColor, '#FFFFFF'];

  return (
    <Pressable
      onPress={() => {
        setSelected(selected => !selected);
      }}>
      <View
        style={[
          styles.mainView,
          {
            backgroundColor: bgColor,
            // aspectRatio: !selected ? 2 : undefined,
            minHeight: 160,
          },
        ]}>
        <AnimatePresence>
          {!selected && (
            <MotiView
              from={{
                transform: [{ perspective: width * 2 }, { rotateY: '90deg' }],
              }}
              animate={{
                transform: [{ perspective: width * 2 }, { rotateY: '0deg' }],
              }}
              exit={{
                transform: [{ perspective: width * 2 }, { rotateY: '-90deg' }],
              }}
              transition={{
                type: 'timing',
              }}
              key="back"
              style={[
                StyleSheet.absoluteFillObject,
                {
                  borderRadius: _borderRadius,
                  backgroundColor: '#FFF',
                  transform: [
                    {
                      perspective: 1000,
                    },
                    { scale: 10 },
                  ],
                  borderWidth: 1,
                  borderColor: '#000',
                  justifyContent: 'center',
                },
              ]}>
              <View
                style={[
                  styles.renderItemMainView,
                  {
                    borderColor: bgColor,
                    borderRadius: _borderRadius,
                  },
                ]}>
                <View style={styles.unSelectedImageView}>
                  {setIcon(item?.method, textColor)}
                </View>
                <View style={{ flex: 0.9 }}>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={2}
                    style={[styles.unselectTextStyle]}>
                    {item?.purpose?.toUpperCase()}
                  </Text>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={2}
                    style={[styles.methodTextStyle]}>
                    {renderMethod()}
                  </Text>
                </View>
              </View>
            </MotiView>
          )}
          {selected && (
            <LinearGradient
              colors={gradientColors} // Set your desired gradient colors
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1.5, y: 1 }}
              style={{
                borderRadius: _borderRadius,
                flexDirection: 'row',
                alignItems: 'center',
                transform: [
                  {
                    perspective: 1000,
                  },
                ],
              }}>
              <MotiView
                key="front"
                style={{
                  borderRadius: _borderRadius,
                  flexDirection: 'row',
                  alignItems: 'center',
                  transform: [
                    {
                      perspective: 1000,
                    },
                  ],
                }}
                from={{
                  transform: [{ perspective: width }, { rotateY: '0deg' }],
                  opacity: 0,
                }}
                animate={{
                  transform: [{ perspective: width }, { rotateY: '0deg' }],
                  opacity: 1,
                }}
                exit={{
                  transform: [{ perspective: width }, { rotateY: '0deg' }],
                  opacity: 0,
                }}
                transition={{
                  type: 'timing',
                }}>
                <View
                  style={[
                    styles.selectedMainView,
                    {
                      minHeight: 160,
                      paddingVertical: 10,
                    },
                  ]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.selectedImageView}>
                      {setIcon(item?.method, textColor)}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[styles.titletext, { color: textColor }]}
                        numberOfLines={1}
                        adjustsFontSizeToFit>
                        {item?.purpose} {renderMethod()}
                      </Text>
                      {item.method === 'infusion' ? (
                        <View>
                          <Text>
                            {item.perIBW ? String.fromCodePoint(8224) : null}
                            {perKgRange(item)}
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <View style={styles.mg}>
                            {mgRange(item)}
                            {perKgRange(item)}
                          </View>
                          <View>{mlRange(item)}</View>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    {item?.notes.map((item, i) => (
                      <View key={i} style={{ paddingHorizontal: 15 }}>
                        <Text
                          style={[styles.notesStyle, { color: textColor }]}
                          // numberOfLines={2}
                        >
                          *{item}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </MotiView>
            </LinearGradient>
          )}
        </AnimatePresence>
      </View>
    </Pressable>
  );
};

export default PurposeItemView;

const styles = StyleSheet.create({
  notesStyle: {
    fontSize: responsiveScale(13),
    fontFamily: font.outfit_Regular,
  },
  renderItemMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    borderWidth: 2,
    paddingHorizontal: perfectSize(15),
    width: '100%',
  },
  selectedImageView: {
    width: width * 0.17,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unSelectedImageView: {
    width: width * 0.23,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMainView: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 20,
    borderColor: '#D4D4D4',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  unselectTextStyle: {
    fontFamily: font.outfit_Semi_Bold,
    fontSize: responsiveScale(17),
    textAlign: 'center',
    color: '#000000',
  },
  methodTextStyle: {
    fontFamily: font.outfit_Regular,
    fontSize: responsiveScale(15),
    textAlign: 'center',
    color: '#000000',
  },
  KgRangeText: {
    fontFamily: font.outfit_Medium,
    fontSize: responsiveScale(15),
  },
  mgRangeText: {
    fontFamily: font.outfit_Medium,
    fontSize: responsiveScale(15),
  },
  mlRangeText: {
    fontFamily: font.outfit_Medium,
    fontSize: responsiveScale(15),
  },
  mainView: {
    borderRadius: _borderRadius,
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: _spacing,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  titletext: {
    fontFamily: font.outfit_Semi_Bold,
    fontSize: responsiveScale(16),
    // color: '#000',
  },
  mg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

// import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
// import React, { useState } from 'react';
// import Bolus from '../assets/appImages/Bolus.svg';
// import Infusion from '../assets/appImages/Infusion.svg';
// import Spinal from '../assets/appImages/Spinal.svg';
// import BolusWhiteIcon from '../assets/appImages/BolusWhiteIcon.svg';
// import SpinalWhiteIcon from '../assets/appImages/SpinalWhiteIcon.svg';
// import InfusionWhiteIcon from '../assets/appImages/InfusionWhiteIcon.svg';
// import InfusionRedIcon from '../assets/appImages/InfusionRedIcon.svg';
// import SpinalRedIcon from '../assets/appImages/SpinalRedIcon.svg';
// import BolusRedIcon from '../assets/appImages/BolusRedIcon.svg';
// // import Text from '../components/CustomText';
// import EpiduralWhite from '../assets/appImages/EpiduralWhite.svg';
// import EpiduralRed from '../assets/appImages/EpiduralRed.svg';
// import EpiduralIcon from '../assets/appImages/EpiduralIcon.svg';

// import Intramuscular from '../assets/appImages/Intramuscular.svg';
// import IntramuscularWhite from '../assets/appImages/IntramuscularWhite.svg';
// import IntramuscularRed from '../assets/appImages/IntramuscularRed.svg';

// import Rectal from '../assets/appImages/Rectal.svg';
// import RectalRed from '../assets/appImages/RectalRed.svg';
// import RectalWhite from '../assets/appImages/RectalWhite.svg';
// import Intranasal from '../assets/appImages/Intranasal.svg';
// import IntranasalWhite from '../assets/appImages/IntranasalWhite.svg';
// import IntranasalRed from '../assets/appImages/IntranasalRed.svg';
// import Oral from '../assets/appImages/Oral.svg';
// import OralRed from '../assets/appImages/OralRed.svg';
// import OralWhite from '../assets/appImages/OralWhite.svg';
// import Endotracheal from '../assets/appImages/Endotracheal.svg';
// import Subcutaneous from '../assets/appImages/Subcutaneous.svg';
// import SubcutaneousRed from '../assets/appImages/SubcutaneousRed.svg';
// import SubcutaneousWhite from '../assets/appImages/SubcutaneousWhite.svg';
// import EndotrachealRed from '../assets/appImages/EndotrachealRed.svg';
// import EndotrachealWhite from '../assets/appImages/EndotrachealWhite.svg';

// // import { AnimatePresence, MotiView } from 'moti';

// import Text from './utilities/Text';

// const { width } = Dimensions.get('screen');
// const _spacing = 20;
// const _borderRadius = 20;

// const PurposeItemView = ({ item, IBW, Weight, bgColor, textColor, title }) => {
//   const [selected, setSelected] = useState(false);

//   const setIcon = (iconType, textColor) => {
//     switch (iconType) {
//       case 'bolus':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <BolusWhiteIcon width={'80%'} height={'80%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <BolusRedIcon width={'80%'} height={'80%'} />
//         ) : (
//           <Bolus width={'80%'} height={'80%'} />
//         );

//       case 'infusion':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <InfusionWhiteIcon width={'70%'} height={'70%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <InfusionRedIcon width={'70%'} height={'70%'} />
//         ) : (
//           <Infusion width={'70%'} height={'70%'} />
//         );

//       case 'spinal':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <SpinalWhiteIcon width={'70%'} height={'70%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <SpinalRedIcon width={'70%'} height={'70%'} />
//         ) : (
//           <Spinal width={'70%'} height={'70%'} />
//         );

//       case 'epidural':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <EpiduralWhite width={'70%'} height={'70%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <EpiduralRed width={'70%'} height={'70%'} />
//         ) : (
//           <EpiduralIcon width={'70%'} height={'70%'} />
//         );

//       case 'intramuscular':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <IntramuscularWhite width={'70%'} height={'70%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <IntramuscularRed width={'70%'} height={'70%'} />
//         ) : (
//           <Intramuscular width={'70%'} height={'70%'} />
//         );

//       case 'im':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <IntramuscularWhite width={'70%'} height={'70%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <IntramuscularRed width={'70%'} height={'70%'} />
//         ) : (
//           <Intramuscular width={'70%'} height={'70%'} />
//         );

//       case 'rect':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <RectalWhite width={'70%'} height={'70%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <RectalRed width={'70%'} height={'70%'} />
//         ) : (
//           <Rectal width={'70%'} height={'70%'} />
//         );

//       case 'in':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <IntranasalWhite width={'100%'} height={'100%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <IntranasalRed width={'100%'} height={'100%'} />
//         ) : (
//           <Intranasal width={'100%'} height={'100%'} />
//         );

//       case 'po':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <OralWhite width={'70%'} height={'70%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <OralRed width={'70%'} height={'70%'} />
//         ) : (
//           <Oral width={'70%'} height={'70%'} />
//         );

//       case 'ett':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <EndotrachealWhite width={'70%'} height={'70%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <EndotrachealRed width={'70%'} height={'70%'} />
//         ) : (
//           <Endotracheal width={'70%'} height={'70%'} />
//         );

//       case 'sq':
//         return (textColor === '#FFFFFF' || textColor === 'white') &&
//           selected ? (
//           <SubcutaneousWhite width={'70%'} height={'70%'} />
//         ) : (textColor === '#e03339' || textColor === 'red') && selected ? (
//           <SubcutaneousRed width={'70%'} height={'70%'} />
//         ) : (
//           <Subcutaneous width={'70%'} height={'70%'} />
//         );

//       default:
//         return null;
//     }
//   };

//   const roundToNearest = (number, decimal) => {
//     return Math.round(decimal * number) / decimal;
//   };

//   const low = item?.perIBW
//     ? roundToNearest(item?.low * IBW, 10)
//     : item?.perKg
//     ? roundToNearest(item?.low * Weight, 10)
//     : item.low;
//   const high = item?.perIBW
//     ? roundToNearest(item?.high * IBW, 10)
//     : item?.perKg
//     ? roundToNearest(item?.high * Weight, 10)
//     : item?.high;

//   const perKgRange = item => {
//     if (item?.perKg) {
//       if (item?.high) {
//         return (
//           <Text style={[styles.KgRangeText, { color: textColor }]}>{`(${
//             item?.low
//           } - ${item?.high} ${item?.unitsKg}${item?.weightUnits}${
//             item?.infusionUnits ?? ''
//           })`}</Text>
//         );
//       } else {
//         return (
//           <Text style={[styles.KgRangeText, { color: textColor }]}>{`(${
//             item?.low
//           } ${item?.unitsKg}${item?.weightUnits}${
//             item?.infusionUnits ?? ''
//           })`}</Text>
//         );
//       }
//     } else {
//     }
//   };

//   const mgRange = item => {
//     if (item?.max) {
//       if (low >= item?.max) {
//         return (
//           <View style={{ flexDirection: 'row' }}>
//             <Text
//               style={[styles.mgRangeText, { color: textColor }]}
//               numberOfLines={1}
//               adjustsFontSizeToFit>
//               {item?.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
//             </Text>
//             <Text
//               style={[styles.mgRangeText, { color: textColor }]}
//               numberOfLines={1}
//               adjustsFontSizeToFit>
//               {item?.max} {item?.unitsKg}{' '}
//             </Text>
//           </View>
//         );
//       } else {
//         //the low is lower than the max
//         if (item.high) {
//           if (item.high >= item.max) {
//             //the high is higher than the max OUTPUT LOW - MAX
//             return (
//               <View style={{ flexDirection: 'row' }}>
//                 <Text
//                   style={[styles.mgRangeText, { color: textColor }]}
//                   numberOfLines={1}
//                   adjustsFontSizeToFit>
//                   {item?.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
//                 </Text>
//                 <Text
//                   style={[styles.mgRangeText, { color: textColor }]}
//                   numberOfLines={1}
//                   adjustsFontSizeToFit>
//                   {low} - {item?.max} {item?.unitsKg}{' '}
//                 </Text>
//               </View>
//             );
//           } else {
//             //the high is lower than the max. OUTPUT LOW - HIGH
//             return (
//               <View style={{ flexDirection: 'row' }}>
//                 <Text
//                   style={[styles.mgRangeText, { color: textColor }]}
//                   numberOfLines={1}
//                   adjustsFontSizeToFit>
//                   {item?.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
//                 </Text>
//                 <Text
//                   style={[styles.mgRangeText, { color: textColor }]}
//                   numberOfLines={1}
//                   adjustsFontSizeToFit>
//                   {low} - {high} {item?.unitsKg}{' '}
//                 </Text>
//               </View>
//             );
//           }
//         } else {
//           //there is no high.  OUTPUT THE LOW
//           return (
//             <Text
//               style={[styles.mgRangeText, { color: textColor }]}
//               numberOfLines={1}
//               adjustsFontSizeToFit>
//               {low} {item?.unitsKg}{' '}
//             </Text>
//           );
//         }
//       }
//     } else {
//       //there is no max.
//       if (item?.high) {
//         //if there's a high, OUTPUT LOW - HIGH
//         return (
//           <View style={{ flexDirection: 'row' }}>
//             <Text
//               style={[styles.mgRangeText, { color: textColor }]}
//               numberOfLines={1}
//               adjustsFontSizeToFit>
//               {item?.perIBW ? String.fromCodePoint(parseInt(8224)) : null}
//             </Text>
//             <Text
//               style={[styles.mgRangeText, { color: textColor }]}
//               numberOfLines={1}
//               adjustsFontSizeToFit>
//               {low} - {high} {item?.unitsKg}{' '}
//             </Text>
//           </View>
//         );
//       } else {
//         //there is no high, OUTPUT LOW
//         return (
//           <Text
//             style={[styles.mgRangeText, { color: textColor }]}
//             numberOfLines={1}
//             adjustsFontSizeToFit>
//             {low} {item?.unitsKg}{' '}
//           </Text>
//         );
//       }
//     }
//   };

//   const mlRange = item => {
//     if (item?.supplied) {
//       // if (roundToNearest(high / item?.supplied, 10) > 0) {
//       //makes sure theres a high > 0
//       if (item?.max != null) {
//         //checks to make sure the high is not > the max
//         if (low > item?.max) {
//           return (
//             <Text
//               style={[styles.mlRangeText, { color: textColor }]}
//               numberOfLines={1}
//               adjustsFontSizeToFit>
//               {roundToNearest(item?.max / item?.supplied, 100)} mL (
//               {item?.supplied} {item?.unitsKg}/mL)
//             </Text>
//           );
//         } else {
//           return (
//             <Text
//               style={[styles.mlRangeText, { color: textColor }]}
//               numberOfLines={1}
//               adjustsFontSizeToFit>
//               {roundToNearest(low / item?.supplied, 100)} -{' '}
//               {roundToNearest(item?.max / item?.supplied, 10)} mL (
//               {item?.supplied} {item?.unitsKg}/mL)
//             </Text>
//           );
//         }
//       } else if (item?.high) {
//         return (
//           <>
//             <Text
//               style={[styles.mlRangeText, { color: textColor }]}
//               numberOfLines={1}
//               adjustsFontSizeToFit>
//               {roundToNearest(low / item?.supplied, 100)} -{' '}
//               {roundToNearest(high / item?.supplied, 10)} mL ({item?.supplied}{' '}
//               {item?.unitsKg}/mL)
//             </Text>
//           </>
//         );
//       } else {
//         return (
//           <Text
//             style={[styles.mlRangeText, { color: textColor }]}
//             numberOfLines={1}
//             adjustsFontSizeToFit>
//             {roundToNearest(low / item?.supplied, 100)} mL ({item?.supplied}{' '}
//             {item?.unitsKg}/mL)
//           </Text>
//         );
//       }
//       // }
//     }
//   };

//   const renderMethod = () => {
//     if (item?.method === 'bolus') {
//       return 'IV Bolus';
//     } else if (item?.method === 'infusion') {
//       return 'IV Infusion';
//     } else if (item?.method === 'intramuscular') {
//       return 'IM Dose';
//     } else if (item?.method === 'spinal') {
//       return 'Spinal Dose';
//     } else if (item?.method === 'epidural') {
//       return 'Epidural Dose';
//     } else if (item?.method === 'in') {
//       return 'Intranasal Dose';
//     } else if (item?.method === 'rect') {
//       return 'Rectal Dose';
//     } else if (item?.method === 'po') {
//       return 'Oral Dose';
//     } else if (item?.method === 'im') {
//       return 'Intramuscular Dose';
//     } else if (item?.method === 'ett') {
//       return 'Endotracheal Dose';
//     } else if (item?.method === 'sq') {
//       return 'Subcutaneous Dose';
//     }
//   };

//   return (
//     <Pressable
//       onPress={() => {
//         setSelected(selected => !selected);
//       }}>
//       <View
//         style={[
//           styles.mainView,
//           {
//             backgroundColor: bgColor,
//             minHeight: 160,
//           },
//         ]}>
//         <View
//           style={[
//             styles.renderItemMainView,
//             {
//               borderColor: bgColor,
//               borderRadius: _borderRadius,
//             },
//           ]}>
//           <View
//             style={
//               selected ? styles.selectedImageView : styles.unSelectedImageView
//             }>
//             {setIcon(item?.method, textColor)}
//           </View>
//           <View style={{ flex: 0.9 }}>
//             <Text
//               adjustsFontSizeToFit
//               numberOfLines={2}
//               style={[styles.unselectTextStyle]}>
//               {item?.purpose?.toUpperCase()}
//             </Text>
//             <Text
//               adjustsFontSizeToFit
//               numberOfLines={2}
//               style={[styles.methodTextStyle]}>
//               {renderMethod()}
//             </Text>
//           </View>
//         </View>

//         {selected && (
//           <View style={styles.selectedMainView}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <View style={styles.selectedImageView}>
//                 {setIcon(item?.method, textColor)}
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text
//                   style={[styles.titletext, { color: textColor }]}
//                   numberOfLines={1}
//                   adjustsFontSizeToFit>
//                   {item?.purpose} {renderMethod()}
//                 </Text>
//                 {item.method === 'infusion' ? (
//                   <View>
//                     <Text>
//                       {item.perIBW ? String.fromCodePoint(8224) : null}
//                       {perKgRange(item)}
//                     </Text>
//                   </View>
//                 ) : (
//                   <View>
//                     <View style={styles.mg}>
//                       {mgRange(item)}
//                       {perKgRange(item)}
//                     </View>
//                     <View>{mlRange(item)}</View>
//                   </View>
//                 )}
//               </View>
//             </View>
//             <View style={{ paddingTop: 10 }}>
//               {item?.notes.map((item, i) => (
//                 <View key={i} style={{ paddingHorizontal: 15 }}>
//                   <Text
//                     style={[
//                       styles.notesStyle,
//                       { color: textColor },
//                     ]}>{`*${item}`}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}
//       </View>
//     </Pressable>
//     // <Pressable
//     //   onPress={() => {
//     //     setSelected(selected => !selected);
//     //   }}>
//     //   <View
//     //     style={[
//     //       styles.mainView,
//     //       {
//     //         backgroundColor: bgColor,
//     //         // aspectRatio: !selected ? 2 : undefined,
//     //         minHeight: 160,
//     //       },
//     //     ]}>
//     //     <AnimatePresence>
//     //       {!selected && (
//     //         <MotiView
//     //           from={{
//     //             transform: [{ perspective: width * 2 }, { rotateY: '90deg' }],
//     //           }}
//     //           animate={{
//     //             transform: [{ perspective: width * 2 }, { rotateY: '0deg' }],
//     //           }}
//     //           exit={{
//     //             transform: [{ perspective: width * 2 }, { rotateY: '-90deg' }],
//     //           }}
//     //           transition={{
//     //             type: 'timing',
//     //           }}
//     //           key="back"
//     //           style={[
//     //             StyleSheet.absoluteFillObject,
//     //             {
//     //               borderRadius: _borderRadius,
//     //               backgroundColor: '#FFF',
//     //               transform: [
//     //                 {
//     //                   perspective: 1000,
//     //                 },
//     //                 { scale: 10 },
//     //               ],
//     //               borderWidth: 1,
//     //               borderColor: '#000',
//     //               justifyContent: 'center',
//     //             },
//     //           ]}>
//     //           <View
//     //             style={[
//     //               styles.renderItemMainView,
//     //               {
//     //                 borderColor: bgColor,
//     //                 borderRadius: _borderRadius,
//     //               },
//     //             ]}>
//     //             <View style={styles.unSelectedImageView}>
//     //               {setIcon(item?.method, textColor)}
//     //             </View>
//     //             <View style={{ flex: 0.9 }}>
//     //               <Text
//     //                 adjustsFontSizeToFit
//     //                 numberOfLines={2}
//     //                 style={[styles.unselectTextStyle]}>
//     //                 {item?.purpose?.toUpperCase()}
//     //               </Text>
//     //               <Text
//     //                 adjustsFontSizeToFit
//     //                 numberOfLines={2}
//     //                 style={[styles.methodTextStyle]}>
//     //                 {renderMethod()}
//     //               </Text>
//     //             </View>
//     //           </View>
//     //         </MotiView>
//     //       )}
//     //       {selected && (
//     //         <MotiView
//     //           key="front"
//     //           style={{
//     //             borderRadius: _borderRadius,
//     //             flexDirection: 'row',
//     //             alignItems: 'center',
//     //             transform: [
//     //               {
//     //                 perspective: 1000,
//     //               },
//     //             ],
//     //           }}
//     //           from={{
//     //             transform: [{ perspective: width }, { rotateY: '0deg' }],
//     //             opacity: 0,
//     //           }}
//     //           animate={{
//     //             transform: [{ perspective: width }, { rotateY: '0deg' }],
//     //             opacity: 1,
//     //           }}
//     //           exit={{
//     //             transform: [{ perspective: width }, { rotateY: '0deg' }],
//     //             opacity: 0,
//     //           }}
//     //           transition={{
//     //             type: 'timing',
//     //           }}>
//     //           <View
//     //             style={[
//     //               styles.selectedMainView,
//     //               {
//     //                 minHeight: 160,
//     //                 paddingVertical: 10,
//     //               },
//     //             ]}>
//     //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//     //               <View style={styles.selectedImageView}>
//     //                 {setIcon(item?.method, textColor)}
//     //               </View>
//     //               <View style={{ flex: 1 }}>
//     //                 <Text
//     //                   style={[styles.titletext, { color: textColor }]}
//     //                   numberOfLines={1}
//     //                   adjustsFontSizeToFit>
//     //                   {item?.purpose} {renderMethod()}
//     //                 </Text>
//     //                 {item.method === 'infusion' ? (
//     //                   <View>
//     //                     <Text>
//     //                       {item.perIBW ? String.fromCodePoint(8224) : null}
//     //                       {perKgRange(item)}
//     //                     </Text>
//     //                   </View>
//     //                 ) : (
//     //                   <View>
//     //                     <View style={styles.mg}>
//     //                       {mgRange(item)}
//     //                       {perKgRange(item)}
//     //                     </View>
//     //                     <View>{mlRange(item)}</View>
//     //                   </View>
//     //                 )}
//     //               </View>
//     //             </View>
//     //             <View style={{ paddingTop: 10 }}>
//     //               {item?.notes.map((item, i) => (
//     //                 <View key={i} style={{ paddingHorizontal: 15 }}>
//     //                   <Text
//     //                     style={[styles.notesStyle, { color: textColor }]}
//     //                     // numberOfLines={2}
//     //                   >
//     //                     *{item}
//     //                   </Text>
//     //                 </View>
//     //               ))}
//     //             </View>
//     //           </View>
//     //         </MotiView>
//     //       )}
//     //     </AnimatePresence>
//     //   </View>
//     // </Pressable>
//   );
// };

// export default PurposeItemView;

// const styles = StyleSheet.create({
//   notesStyle: {
//     fontSize: 13,
//     fontFamily: 'OpenSansLight',
//   },
//   renderItemMainView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: '100%',
//     borderWidth: 2,
//     paddingHorizontal: 15,
//     width: '100%',
//   },
//   selectedImageView: {
//     width: width * 0.17,
//     aspectRatio: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   unSelectedImageView: {
//     width: width * 0.23,
//     aspectRatio: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectedMainView: {
//     borderWidth: 1,
//     width: '100%',
//     borderRadius: 20,
//     borderColor: '#D4D4D4',
//     paddingHorizontal: 15,
//     justifyContent: 'center',
//   },
//   unselectTextStyle: {
//     fontFamily: 'OpenSansBold',
//     fontSize: 17,
//     textAlign: 'center',
//   },
//   methodTextStyle: {
//     fontFamily: 'OpenSansItalic',
//     fontSize: 15,
//     textAlign: 'center',
//   },
//   KgRangeText: {
//     fontFamily: 'OpenSansSemiBold',
//     fontSize: 15,
//   },
//   mgRangeText: {
//     fontFamily: 'OpenSansSemiBold',
//     fontSize: 15,
//   },
//   mlRangeText: {
//     fontFamily: 'OpenSansSemiBold',
//     fontSize: 15,
//   },
//   mainView: {
//     borderRadius: _borderRadius,
//     borderColor: 'rgba(0,0,0,0.1)',
//     marginBottom: _spacing,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     alignSelf: 'center',
//   },
//   titletext: {
//     fontFamily: 'OpenSansBold',
//     fontSize: 16,
//     color: '#000',
//   },
//   mg: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
// });
