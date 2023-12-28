import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Text from '../../components/utilities/Text';
import Block from '../../components/utilities/Block';
import Header from '../../components/Header';
import {colors, perfectSize} from '../../styles/theme';
import Mind from '../../assets/appImages/Mind.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CloseIcon from '../../assets/appImages/CloseIcon.svg';
import HeaGAMBannerAdder from '../../components/GAMBannerAd';

export default CalculationBlood = ({navigation, route}) => {
  const {weight, context, habitus, age, gender} = route.params;

  const [crit, setCrit] = useState(20);
  const [critMin, setCritMin] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const obese = () => {
    if (
      habitus == 'Obesity class III' ||
      habitus == 'Obesity class II' ||
      habitus == 'Obesity class I'
    ) {
      return true;
    } else {
      return false;
    }
  };

  // const habitus = 'Obesity class III'
  // const gender = 'male'
  // const weight = 20
  // const context = 'adult' //or pediatric

  const critColor = 'blue';
  const critMinColor = 'red';

  //Adult estimates found in Butterworth. Morgan & Mikhail’s Clinical Anesthesiology. 2013.
  //Pediatric estimates found in Miller. Miller’s Anesthesia. 8th Edition. 2015.
  const EBV = () => {
    if (context == 'adult') {
      if (obese()) {
        return weight * 50;
      } else {
        if (gender == 'female') {
          return weight * 65;
        } else if (gender == 'male') {
          return weight * 75;
        }
      }
    } else if (context == 'pediatric') {
      //premature
      if (age < -132) {
        return weight * 100;
      }
      //newborn to 3 months
      else if (age >= -132 && age <= -84) {
        return weight * 90;
      }
      //up to > 3 months to 1 year old
      else if (age > -84 && age <= 24) {
        return weight * 80;
      }
      // greater than 1 years old
      else if (age > 24) {
        return weight * 70;
      }
    }
  };
  let maxAllowableBloodLoss = Math.round(EBV() * ((crit - critMin) / crit));

  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={'Blood: ' + weight + ' kg'}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.container}>
        <Modal visible={modalOpen} animationType="slide">
          <ScrollView>
            <View
              style={{
                flex: 1,
                padding: 20,
                paddingTop:
                  insets.top > 40 ? insets.top + perfectSize(10) : insets.top,
                paddingBottom: perfectSize(5),
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalOpen(false);
                }}
                style={{alignItems: 'center'}}>
                <CloseIcon width={perfectSize(40)} height={perfectSize(40)} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.education}>
                <View style={styles.educationView}>
                  <Text
                    bold
                    style={styles.educationHeader}
                    color={colors.black}>
                    Adult EBV
                  </Text>
                  <Text regular color={colors.black}>
                    Obese - 50 ml/kg
                  </Text>
                  <Text regular color={colors.black}>
                    Female - 65 ml/kg
                  </Text>
                  <Text regular color={colors.black}>
                    Male - 75 ml/kg
                  </Text>
                </View>
                <View style={styles.educationView}>
                  <Text
                    bold
                    style={styles.educationHeader}
                    color={colors.black}>
                    Pediatric EBV
                  </Text>
                  <Text regular color={colors.black}>
                    Premature - 100 ml/kg
                  </Text>
                  <Text regular color={colors.black}>
                    0-3 months - 90 ml/kg
                  </Text>
                  <Text regular color={colors.black}>
                    4-12 months - 80 ml/kg
                  </Text>
                  <Text regular color={colors.black}>
                    greater than 12 months - 70 ml/kg
                  </Text>
                </View>

                <Image
                  source={require('../../assets/appImages/MABL.png')}
                  style={[
                    {
                      width: 279,
                      height: 39,
                      alignSelf: 'center',
                      marginTop: 50,
                    },
                  ]}
                />
              </View>
            </View>
          </ScrollView>
        </Modal>
        <View style={styles.header}>
          <View style={styles.headerNPO}>
            <View style={styles.headerNPOcontent}>
              <Text bold style={{textAlign: 'center'}} color={colors.black}>
                Estimated Blood Vol (ml)
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                bold
                style={{
                  textAlign: 'center',
                  fontSize: 40,
                  color: critColor,
                }}>
                {EBV()}
              </Text>
            </View>
          </View>
          <View style={styles.headerImage}>
            <Image
              source={require('../../assets/appImages/Blood.png')}
              style={[{width: 50, height: 71}]}
            />
          </View>
          <View style={styles.headerValues}>
            <View style={styles.headerNPOcontent}>
              <Text bold style={{textAlign: 'center'}} color={colors.black}>
                Max Blood Loss (ml)
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                bold
                style={{
                  textAlign: 'center',
                  fontSize: 40,
                  color: critMinColor,
                }}>
                {maxAllowableBloodLoss}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderAndInstructions}>
            <View style={styles.sliderTextView}>
              <Text style={styles.instructions} color={colors.black}>
                HCT
                <Text bold style={{fontSize: 10}} color={colors.black}>
                  cur
                </Text>
              </Text>
            </View>
            <View style={styles.sliderView}>
              <Slider
                style={[{flex: 1}]}
                step={1}
                minimumTrackTintColor="#2d7aff"
                maximumTrackTintColor="#000000"
                thumbTintColor="#f1f1f1"
                minimumValue={200}
                maximumValue={500}
                value={0}
                onValueChange={val => {
                  setCrit(Math.round(val / 10));
                  setCritMin(10);
                }}
                // onSlidingComplete={ val => this.getVal(val)}
              />
            </View>
            <View style={styles.sliderValueView}>
              <Text style={[styles.sliderValueText, {color: critColor}]}>
                {crit}
              </Text>
            </View>
          </View>
          <Text style={[styles.sliderSubtext]} color={colors.black}>
            The Patients Current Hematocrit
          </Text>
          <View
            style={[
              styles.sliderAndInstructions,
              {marginTop: perfectSize(10)},
            ]}>
            <View style={styles.sliderTextView}>
              <Text style={styles.instructions} color={colors.black}>
                <Text style={{fontSize: 12}} color={colors.black}></Text>HCT
                <Text bold style={{fontSize: 10}} color={colors.black}>
                  min
                </Text>
              </Text>
            </View>
            <View style={styles.sliderView}>
              <Slider
                style={{flex: 1}}
                thumbTintColor="#f1f1f1"
                maximumTrackTintColor="#000000"
                step={1}
                minimumValue={100}
                maximumValue={crit * 10}
                minimumTrackTintColor="red"
                value={0}
                onValueChange={val => setCritMin(Math.round(val / 10))}
                // onSlidingComplete={ val => this.getVal(val)}
              />
            </View>
            <View style={styles.sliderValueView}>
              <Text style={[styles.sliderValueText, {color: critMinColor}]}>
                {critMin}
              </Text>
            </View>
          </View>
          <Text style={[styles.sliderSubtext, {}]} color={colors.black}>
            Lowest Allowed Hematocrit
          </Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => setModalOpen(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Mind width={perfectSize(24)} height={perfectSize(24)} />
            <Text bold color={colors.black}>
              {' '}
              Rationals
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Block
        style={{position: 'absolute', bottom: 0}}
        flex={false}
        padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    // borderWidth: 3,
    // borderColor: 'black'
  },
  modalToggle: {
    marginTop: 20,
    marginBottom: 10,
    color: '#6f6f6f',
    padding: 10,
    alignSelf: 'center',
  },
  modalContent: {
    justifyContent: 'center',
    padding: 20,
    // borderWidth: 1
  },
  disclaimer: {
    fontSize: 14,
    marginTop: 10,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // borderColor: 'blue',
    // borderWidth: 1
  },
  headerNPO: {
    alignItems: 'flex-end',
    flex: 1,
  },
  headerNPOcontent: {
    // borderColor: 'grey',
    // borderWidth: 3,
    padding: 5,
    borderRadius: 15,
    width: 110,
  },
  headerImage: {
    alignItems: 'center',
    padding: 10,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  headerValues: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 20,
    // borderWidth: 1,
  },
  boxes: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gender: {
    textDecorationLine: 'underline',
    top: -10,
  },
  topDisplayOfNumbers: {
    flex: 1,
    width: '80%',
    // borderWidth: 3,
    // borderColor: 'purple'
  },
  sliderContainerView: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  sliderContainer: {
    flex: 1,
    marginTop: 80,
    // borderColor: 'purple',
    // borderWidth: 1,
  },
  switchView: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    // borderWidth: 1
  },
  slider: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 80,
  },
  sliderView: {
    flex: 4,
    // borderWidth: 1,
    // borderColor: 'green',
  },
  sliderTextView: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  sliderValueView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'purple',
  },
  sliderValueText: {
    fontSize: 30,
  },
  sliderAndInstructions: {
    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  education: {
    flex: 1,
    flexDirection: 'column',
  },
  educationView: {
    alignItems: 'center',
  },
  educationHeader: {
    fontSize: 16,
    marginTop: 10,
  },
  sliderSubtext: {
    textAlign: 'center',
    fontSize: 12,
  },
  sliderTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 3,
    // borderColor: 'orange'
  },
  sliderText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
    flex: 1,
    // borderWidth: 3,
    // borderColor: 'blue'
  },
  units: {
    alignItems: 'flex-start',
    flex: 1,
    // borderWidth: 3,
    // borderColor: 'green'
  },
  kg: {
    fontSize: 30,
  },
  lb: {
    color: '#1e1e1e',
    fontSize: 12,
  },
  age: {
    color: '#1e1e1e',
    fontSize: 12,
  },
  next: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'grey',
  },
  context: {
    fontSize: 20,
    marginLeft: 10,
  },
  half: {
    flex: 1,
  },
  toggle: {
    alignSelf: 'flex-end',
  },
  vitalsView: {
    marginTop: 10,
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // borderWidth: 2
  },
  vitals: {
    flexDirection: 'row',
    flex: 4,
    // borderWidth: 1,
  },
  buttons: {
    flex: 1,
    // borderWidth: 1,
    alignSelf: 'stretch',
  },
  references: {
    marginTop: 60,
    flex: 1,
    alignSelf: 'center',
  },
  reference: {
    fontSize: 12,
  },
});
