import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Text from '../../components/utilities/Text';
import Block from '../../components/utilities/Block';
import Header from '../../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, perfectSize} from '../../styles/theme';
import CloseIcon from '../../assets/appImages/CloseIcon.svg';
import AlertIcon from '../../assets/appImages/AlertIcon.svg';
import HeaGAMBannerAdder from '../../components/GAMBannerAd';

export default InsulinSubq = ({navigation, route}) => {
  const [BGcur, setBGcur] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const insets = useSafeAreaInsets();

  //standard/resistant/sensitive
  const classification = route?.params?.classification;

  const initialMsg = useMemo(() => {
    return BGcur < 50 ? (
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text regular style={styles.point} color={colors.black}>
          No SQ insulin
        </Text>
        <Text regular style={styles.point} color={colors.black}>
          Administer 50ml (25 grams) D50
        </Text>
        <Text regular style={styles.point} color={colors.black}>
          Retake BG every 15 minutes until {'>'} 70 mg/dL.
        </Text>
        <Text regular style={styles.point} color={colors.black}>
          When BG {'>'} 70 mg/dL, check BG every 30 minutes. When BG {'>'} 100,
          check BG every 2 hours.
        </Text>
      </View>
    ) : BGcur < 71 ? (
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text regular style={styles.point} color={colors.black}>
          No SQ insulin
        </Text>
        <Text regular style={styles.point} color={colors.black}>
          Administer 25ml (12.5 grams) D50.
        </Text>
        <Text regular style={styles.point} color={colors.black}>
          Retake BG every 15 minutes until {'>'} 70 mg/dL.
        </Text>
        <Text regular style={styles.point} color={colors.black}>
          When BG {'>'} 70 mg/dL, check BG every 30 minutes. When BG {'>'} 100,
          check BG every 2 hours.
        </Text>
      </View>
    ) : BGcur < 100 ? (
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text regular style={styles.point} color={colors.black}>
          No SQ insulin
        </Text>
        <Text regular style={styles.point} color={colors.black}>
          Check BG every 30 minutes until {'>'} 100 mg/dL, then check every 2
          hours.
        </Text>
      </View>
    ) : BGcur <= 140 ? (
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text regular style={styles.point} color={colors.black}>
          No SQ insulin
        </Text>
        <Text regular style={styles.point} color={colors.black}>
          Retake BG every 2 hours.
        </Text>
      </View>
    ) : null;
  }, [BGcur]);

  const maintMessage = useMemo(() => {
    const administer = amt => {
      return (
        <View style={{marginTop: 20}}>
          <Text regular style={styles.pointCentered} color={colors.black}>
            Administer{' '}
            <Text bold style={{fontSize: 18, color: 'blue'}}>
              {amt} units
            </Text>{' '}
            of rapid-acting SQ insulin
          </Text>
          <Text regular style={styles.pointCentered} color={colors.black}>
            Check BG at least every 2 hrs
          </Text>
        </View>
      );
    };

    if (BGcur <= 140) {
      return initialMsg;
    } else if (BGcur <= 180) {
      return classification == 'standard' ? (
        administer(2)
      ) : classification == 'sensitive' ? (
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text regular style={styles.point} color={colors.black}>
            No SQ insulin
          </Text>
          <Text regular style={styles.point} color={colors.black}>
            Retake BG every 2 hours.
          </Text>
        </View>
      ) : classification == 'resistant' ? (
        administer(3)
      ) : null;
    } else if (BGcur < 220) {
      return classification == 'standard'
        ? administer(3)
        : classification == 'sensitive'
        ? administer(2)
        : classification == 'resistant'
        ? administer(4)
        : null;
    } else if (BGcur <= 260) {
      return classification == 'standard'
        ? administer(4)
        : classification == 'sensitive'
        ? administer(3)
        : classification == 'resistant'
        ? administer(5)
        : null;
    } else if (BGcur <= 300) {
      return classification == 'standard'
        ? administer(6)
        : classification == 'sensitive'
        ? administer(4)
        : classification == 'resistant'
        ? administer(8)
        : null;
    } else if (BGcur <= 350) {
      return classification == 'standard'
        ? administer(8)
        : classification == 'sensitive'
        ? administer(5)
        : classification == 'resistant'
        ? administer(10)
        : null;
    } else if (BGcur <= 400) {
      return classification == 'standard'
        ? administer(10)
        : classification == 'sensitive'
        ? administer(6)
        : classification == 'resistant'
        ? administer(12)
        : null;
    } else if (BGcur > 400) {
      return classification == 'standard'
        ? administer(12)
        : classification == 'sensitive'
        ? administer(8)
        : classification == 'resistant'
        ? administer(14)
        : null;
    }
  }, [BGcur]);

  const {
    container,
    headerView,
    headerTitle,
    modalToggle,
    modalContent,
    reference,
    sgControl,
    messageHeaderView,
    messageHeader,
    sliderContainer,
    sliderView,
    sliderTextView,
    sliderAndInstructions,
    sliderSubtext,
    instructions,
    sliderValueView,
    sliderValueText,
    disclaimer,
  } = styles;

  return (
    <Block flex={1} color={'white'}>
      <Header
        headerTitle={'Subcutaneous Insulin'}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={container}>
          <View style={headerView}>
            <View>
              <Text
                bold
                style={headerTitle}
                adjustsFontSizeToFit
                numberOfLines={1}
                color={colors.black}>
                SQ Insulin
              </Text>
              <Text regular style={{textAlign: 'center'}} color={colors.black}>
                Your patient's insulin resistance is: {classification}
              </Text>
              <Text regular style={{textAlign: 'center'}} color={colors.black}>
                Input your patient's current BG
              </Text>
            </View>
          </View>

          <View style={sliderContainer}>
            <View style={sliderAndInstructions}>
              <View style={sliderTextView}>
                <Text regular style={instructions} color={colors.black}>
                  BG
                  <Text regular style={{fontSize: 10}} color={colors.black}>
                    cur
                  </Text>
                </Text>
              </View>
              <View style={sliderView}>
                <Slider
                  style={[{flex: 1}]}
                  step={1}
                  minimumTrackTintColor="#2d7aff"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#f1f1f1"
                  minimumValue={40}
                  maximumValue={500}
                  value={40}
                  onValueChange={val => setBGcur(val)}
                />
              </View>
              <View style={sliderValueView}>
                <Text regular style={[sliderValueText, {color: 'blue'}]}>
                  {BGcur}
                </Text>
              </View>
            </View>
            <Text
              regular
              style={[sliderSubtext, {top: -10}]}
              color={colors.black}>
              Current Blood Glucose
            </Text>
          </View>

          <View style={{flex: 2, marginTop: 20}}>
            <View style={messageHeaderView}>
              <Text regular style={messageHeader} color={colors.black}>
                Subcutaneous Dose
              </Text>
              <Text regular style={{fontSize: 12}} color={colors.black}>
                &#8224;
              </Text>
            </View>
            <View style={{flex: 1}}>{maintMessage}</View>
          </View>

          <Modal visible={modalOpen} animationType="slide">
            <View
              style={{
                flex: 1,
                padding: 20,
                paddingTop:
                  insets.top > 40 ? insets.top + perfectSize(10) : insets.top,
                paddingBottom: perfectSize(5),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalOpen(false);
                }}
                style={{alignItems: 'center'}}>
                <CloseIcon width={perfectSize(40)} height={perfectSize(40)} />
              </TouchableOpacity>
              <View style={modalContent}>
                <Text regular style={disclaimer} color={colors.black}>
                  &#8224; Perioperative target blood glucose is 140 to 180 mg/dl
                  (7.8 to 10 mM).{' '}
                </Text>
                <Text regular style={disclaimer} color={colors.black}>
                  &#8225; These numbers represent starting values and do not
                  take into account comorbidities and patient-specific values
                  which are necessary considerations before prescribing insulin
                  and the route of delivery. Ultimately, these and all
                  considerations pertinent to providing safe care are left to
                  the practitioner.
                </Text>
                <Text
                  regular
                  style={{textAlign: 'center'}}
                  color={colors.black}>
                  References
                </Text>
                <Text regular style={reference} color={colors.black}>
                  Duggan. Perioperative hyperglycemia management: An update.
                  2017.
                </Text>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => setModalOpen(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AlertIcon width={perfectSize(24)} height={perfectSize(24)} />
            <Text regular color={colors.black}>
              {' '}
              Important Considerations
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Block flex={false} padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
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
  },
  headerTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
  headerView: {
    flex: 1,
    marginTop: 20,
  },
  reference: {
    fontSize: 12,
  },
  point: {
    fontSize: 16,
    marginVertical: 5,
  },
  pointCentered: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  sgControl: {
    marginTop: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 5,
  },
  messageHeaderView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  messageHeader: {
    textAlign: 'center',
    fontSize: 18,
  },
  modalToggle: {
    marginTop: 40,
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
    marginTop: 40,
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
});
