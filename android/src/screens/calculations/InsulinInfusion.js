import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Block from '../../components/utilities/Block';
import Header from '../../components/Header';
import {colors, font, perfectSize, sizes} from '../../styles/theme';
import Text from '../../components/utilities/Text';
import {responsiveScale} from '../../styles/mixins';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CloseIcon from '../../assets/appImages/CloseIcon.svg';
import AlertIcon from '../../assets/appImages/AlertIcon.svg';
import HeaGAMBannerAdder from '../../components/GAMBannerAd';

export default InsulinInfusion = ({navigation}) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [BGcur, setBGcur] = useState(20);
  const [BGprev, setBGprev] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const handleTabsChange = index => {
    setTabIndex(index);
    console.log(index);
  };

  // const infusionStart = (((BGcur-100)/40)*100)/100
  const infusionStart = BGcur / 100;
  //this equation just rounds to 0.5 increments
  const infusionInitiate =
    Math.round((infusionStart - 0.25) * 2) / 2 + ' units/hr';

  const initialMsg = useMemo(() => {
    return BGcur < 50 ? (
      <Block margin={[perfectSize(20), perfectSize(20)]}>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Hold insulin infusion
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Give 50ml (25 grams) D50
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Retake BG every 15 minutes until {'>'} 70mg/dl.
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          If second consecutive BG {'<'} 50mg/dl repeat 50ml dose (25 grams) of
          D50 and start D10 infusion.
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          When BG {'>'} 70mg/dl, check BG every 30 minutes. When BG {'>'} 100,
          check BG every hour.
        </Text>
      </Block>
    ) : BGcur < 71 ? (
      <Block margin={[perfectSize(20), perfectSize(20)]}>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Hold insulin infusion
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Give 25ml (12.5 grams) D50.
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Retake BG every 15 minutes until {'>'} 70mg/dl.
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          When BG {'>'} 70mg/dl, check BG every 30 minutes. When BG {'>'} 100,
          check BG every hour.
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Restart infusion at half the previous infusion rate if BG {'>'} 180
          mg/dl (10 mM)
        </Text>
      </Block>
    ) : BGcur < 110 ? (
      <Block margin={[perfectSize(20), perfectSize(20)]}>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Hold insulin infusion
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Check BG every 30 minutes until {'>'} 100mg/dl, then take hourly.
        </Text>
      </Block>
    ) : BGcur <= 180 ? (
      <Block margin={[perfectSize(20), perfectSize(20)]}>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Hold insulin infusion
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={styles.point}
          color={colors.black}>
          Retake BG every hour.
        </Text>
      </Block>
    ) : BGcur > 180 ? (
      <Block margin={[perfectSize(20), perfectSize(20)]}>
        <Text
          regular
          size={responsiveScale(16)}
          style={{textAlign: 'center', fontSize: 16}}
          color={colors.black}>
          Start infusion at{' '}
          <Text
            bold
            size={responsiveScale(16)}
            style={{fontSize: 18, color: 'blue'}}>
            {infusionInitiate}
          </Text>
          .
        </Text>
        <Text
          regular
          size={responsiveScale(16)}
          style={{textAlign: 'center', fontSize: 16, marginVertical: 5}}
          color={colors.black}>
          Retake BG at least every hour.
        </Text>
      </Block>
    ) : null;
  }, [BGcur, BGprev]);

  const mid = BGprev - BGcur;

  const mid2 = mid < 0 ? 'A' : mid < 30 ? 'B' : mid >= 30 ? 'C' : null;

  const BG =
    BGcur < 51
      ? 'A'
      : BGcur < 71
      ? 'B'
      : BGcur < 100
      ? 'C'
      : BGcur < 110
      ? 'D'
      : BGcur < 141
      ? 'E'
      : BGcur < 181
      ? 'F'
      : BGcur < 211
      ? 'G'
      : BGcur < 241
      ? 'H'
      : BGcur >= 241
      ? 'I'
      : null;

  const increaseRate = amt => {
    return (
      <>
        {mid2 == 'A' && BGprev < 180 ? (
          <Text
            center
            regular
            size={responsiveScale(16)}
            style={styles.pointCentered}
            color={colors.black}>
            If a previous infusion had to be discontinued, start at 1/2 the
            previous rate. Otherwise:{' '}
          </Text>
        ) : null}
        <Text
          center
          regular
          size={responsiveScale(16)}
          style={styles.pointCentered}
          color={colors.black}>
          Increase insulin infusion by{' '}
          <Text bold style={{fontSize: 18, color: 'blue'}}>
            {amt} units/hr
          </Text>
        </Text>
        <Text
          center
          regular
          size={responsiveScale(16)}
          style={styles.pointCentered}>
          Check BG at least hourly
        </Text>
      </>
    );
  };
  // const noChange =

  const maintMessage = useMemo(() => {
    if (BGcur < 110) {
      return initialMsg;
    } else if (BGcur < 141) {
      return mid2 == 'A' ? (
        <Text
          center
          regular
          size={responsiveScale(16)}
          style={styles.pointCentered}
          color={colors.black}>
          No change in insulin infusion rate
        </Text>
      ) : mid2 == 'B' ? (
        <Text
          center
          regular
          size={responsiveScale(16)}
          style={styles.pointCentered}
          color={colors.black}>
          Decrease rate by{' '}
          <Text bold style={{fontSize: 18, color: 'red'}}>
            0.5 units/hr
          </Text>
        </Text>
      ) : mid2 == 'C' ? (
        <Text
          center
          regular
          size={responsiveScale(16)}
          style={styles.pointCentered}
          color={colors.black}>
          Hold insulin infusion
        </Text>
      ) : null;
    } else if (BGcur < 180) {
      return (
        <Text
          center
          regular
          size={responsiveScale(16)}
          style={styles.pointCentered}
          color={colors.black}>
          No change in insulin infusion rate
        </Text>
      );
    } else if (BGcur < 211) {
      return mid2 == 'A' ? (
        increaseRate('1.0')
      ) : mid2 == 'B' ? (
        increaseRate('1.0')
      ) : mid2 == 'C' ? (
        <Text
          center
          regular
          size={responsiveScale(16)}
          style={styles.pointCentered}
          color={colors.black}>
          No change in insulin infusion rate
        </Text>
      ) : null;
    } else if (BGcur < 241) {
      return mid2 == 'A' ? (
        increaseRate('2.0')
      ) : mid2 == 'B' ? (
        increaseRate('2.0')
      ) : mid2 == 'C' ? (
        <Text
          center
          regular
          size={responsiveScale(16)}
          style={styles.pointCentered}
          color={colors.black}>
          No change in insulin infusion rate
        </Text>
      ) : null;
    } else if (BGcur >= 241) {
      return mid2 == 'A' ? (
        increaseRate('3.0')
      ) : mid2 == 'B' ? (
        increaseRate('3.0')
      ) : mid2 == 'C' ? (
        <Text
          center
          regular
          size={responsiveScale(16)}
          style={styles.pointCentered}
          color={colors.black}>
          No change in insulin infusion rate
        </Text>
      ) : null;
    }
  }, [BGcur, BGprev]);

  const BGcolor = 'blue';
  const BGprevColor = 'red';

  const {
    container,
    headerTitle,
    headerView,
    userDetails,
    modalToggle,
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
    reference,
    references,
  } = styles;

  return (
    <Block flex={1} color={'white'}>
      <Header
        headerTitle={'Insulin Infusion'}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <Block
          flex={1}
          color={'white'}
          middle
          padding={[perfectSize(10), perfectSize(10)]}>
          <Block flex={false} margin={[perfectSize(10), 0, perfectSize(10), 0]}>
            <Text
              regular
              center
              size={responsiveScale(24)}
              style={headerTitle}
              color={colors.black}>
              Insulin Infusion
            </Text>
            <Text
              regular
              center
              size={responsiveScale(14)}
              color={colors.black}>
              Select the options that apply to your patient
            </Text>
          </Block>

          <Block flex={false} margin={[perfectSize(10), 0, 0, 0]}>
            <SegmentedControl
              values={['New Infusion', 'Maintenance']}
              selectedIndex={tabIndex}
              onChange={event => {
                handleTabsChange(event.nativeEvent.selectedSegmentIndex);
              }}
              style={styles.tabViewStyle}
              fontStyle={styles.fontStyle}
              activeFontStyle={styles.activeFontStyle}
              tintColor={'white'}
              backgroundColor="#DEDEE1"
            />
          </Block>

          <Block flex={1} margin={[perfectSize(30), 0, 0, 0]}>
            <Block flex={false} center row>
              <Block flex={1}>
                <Text
                  regular
                  center
                  color={'#333333'}
                  size={responsiveScale(20)}>
                  BG
                  <Text regular size={responsiveScale(10)} color={colors.black}>
                    cur
                  </Text>
                </Text>
              </Block>

              <Block flex={4}>
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
              </Block>

              <Block flex={1} center middle>
                <Text bold size={responsiveScale(20)} color={BGcolor}>
                  {BGcur}
                </Text>
              </Block>
            </Block>

            <Text
              regular
              center
              size={responsiveScale(12)}
              style={{top: -10}}
              color={colors.black}>
              Current Blood Glucose
            </Text>

            {tabIndex == 1 ? (
              <Block flex={false}>
                <Block center row>
                  <Block flex={1}>
                    <Text
                      regular
                      center
                      color={'#333333'}
                      size={responsiveScale(20)}>
                      BG
                      <Text
                        regular
                        size={responsiveScale(10)}
                        color={colors.black}>
                        prev
                      </Text>
                    </Text>
                  </Block>

                  <Block flex={4}>
                    <Slider
                      maximumTrackTintColor="#000000"
                      style={{flex: 1}}
                      thumbTintColor="#f1f1f1"
                      step={1}
                      minimumValue={0}
                      maximumValue={500}
                      minimumTrackTintColor="red"
                      value={0}
                      onValueChange={val => setBGprev(val)}
                    />
                  </Block>

                  <Block flex={1} center middle>
                    <Text bold size={responsiveScale(20)} color={BGprevColor}>
                      {BGprev}
                    </Text>
                  </Block>
                </Block>

                <Text
                  regular
                  center
                  size={responsiveScale(12)}
                  style={{top: -10}}
                  color={colors.black}>
                  Previous Blood Glucose
                </Text>
              </Block>
            ) : null}
          </Block>

          {tabIndex == 0 ? (
            <Block flex={2} margin={[perfectSize(10), 0, 0, 0]}>
              <Block row middle>
                <Text
                  center
                  size={responsiveScale(18)}
                  regular
                  color={colors.black}>
                  Starting Infusion
                </Text>
                <Text size={responsiveScale(18)} regular color={colors.black}>
                  &#8224;
                </Text>
              </Block>

              <View>{initialMsg}</View>
            </Block>
          ) : (
            <View style={{flex: 2, marginTop: 10}}>
              <View style={messageHeaderView}>
                <Text
                  center
                  size={responsiveScale(18)}
                  regular
                  color={colors.black}>
                  Infusion Maintenance
                </Text>
                <Text style={{fontSize: 12}} color={colors.black}>
                  &#8224;
                </Text>
              </View>
              <View style={{marginTop: 20}}>{maintMessage}</View>
            </View>
          )}
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AlertIcon width={perfectSize(24)} height={perfectSize(24)} />
              <Text
                center
                regular
                size={responsiveScale(12)}
                color={colors.black}>
                {' '}
                Important Considerations
              </Text>
            </TouchableOpacity>
          </View>
        </Block>
      </ScrollView>

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

          <Text regular style={disclaimer} color={colors.black}>
            &#8224; Perioperative target blood glucose is 140 to 180 mg/dl (7.8
            to 10 mM).{' '}
          </Text>
          <Text regular style={disclaimer} color={colors.black}>
            &#8225; These numbers represent starting values and do not take into
            account comorbidities and patient-specific values which are
            necessary considerations before prescribing insulin and the route of
            delivery. Ultimately, these and all considerations pertinent to
            providing safe care are left to the practitioner.
          </Text>
          <Text
            regular
            style={{textAlign: 'center', marginTop: 20}}
            color={colors.black}>
            References
          </Text>
          <Text regular style={reference} color={colors.black}>
            Duggan. Perioperative hyperglycemia management: An update. 2017.
          </Text>
        </View>
      </Modal>

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
    // borderWidth: 3,
    // borderColor: 'black'
  },
  references: {
    marginTop: 60,
    flex: 1,
    alignSelf: 'center',
  },
  reference: {
    fontSize: 12,
    marginTop: 20,
    // fontFamily: 'OpenSansLight',
  },
  headerTitle: {
    fontSize: 24,
    // fontFamily: 'OpenSansBold',
    textAlign: 'center',
  },
  headerView: {
    marginBottom: 20,
    marginTop: 20,
  },
  point: {
    marginVertical: 5,
  },
  pointCentered: {
    marginBottom: 10,
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
    // fontFamily: 'OpenSansBold'
  },
  modalToggle: {
    marginTop: 40,
    marginBottom: 10,
    color: 'red',
    padding: 10,
    alignSelf: 'center',
  },

  disclaimer: {
    // fontFamily: 'OpenSansLight',
    fontSize: 14,
    marginTop: 20,
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
    // fontFamily: 'OpenSansBold'
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
    // fontFamily: 'OpenSansSemiBold'
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
    // fontFamily: 'OpenSansLight'
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
  tabViewStyle: {
    height: perfectSize(50),
  },
  fontStyle: {
    fontFamily: font.roboto_Regular,
    fontSize: sizes.header,
    color: colors.black,
  },
  activeFontStyle: {
    fontFamily: font.roboto_Medium,
    fontSize: sizes.header,
    fontWeight: '600',
    color: colors.black,
  },
});
