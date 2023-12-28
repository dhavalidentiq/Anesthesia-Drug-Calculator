import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Text from '../../components/utilities/Text';
import Header from '../../components/Header';
import Block from '../../components/utilities/Block';
import CloseIcon from '../../assets/appImages/CloseIcon.svg';
import AlertIcon from '../../assets/appImages/AlertIcon.svg';
import {colors, perfectSize} from '../../styles/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaGAMBannerAdder from '../../components/GAMBannerAd';
import {showADs} from '../../components/IntertitialAd';

export default InsulinClassification = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState({
    age: false,
    gfr: false,
    diagnosis: false,
    bmi: false,
    tdd: false,
    prednisone: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const toggleSwitch = k =>
    setIsEnabled({
      ...isEnabled,
      [k]: !isEnabled[k],
    });

  const diabeticClass = () => {
    const {age, gfr, diagnosis, bmi, tdd, prednisone} = isEnabled;
    if (age || gfr || diagnosis) {
      return {class: 'sensitive', color: 'purple'};
    } else if (bmi || tdd || prednisone) {
      return {class: 'resistant', color: 'red'};
    } else {
      return {class: 'standard', color: 'green'};
    }
  };

  const {
    container,
    userSummary,
    headerTitle,
    next,
    modalToggle,
    modalContent,
    disclaimer,
    reference,
    userImage,
    userDetails,
    userName,
    subText,
    userStats,
    stat,
    statNum,
    statText,
    switches,
    switchIconAndCategory,
    switchIcon,
    switchRow,
    switchView,
    switchCategoryText,
    switchItself,
    chooseColorRow,
    chooseColor,
  } = styles;

  return (
    <Block flex={1} color={'white'}>
      <Header
        headerTitle={'Insulin Sensitivity'}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={container}>
          <View style={userSummary}>
            <View>
              <Text
                bold
                style={headerTitle}
                adjustsFontSizeToFit
                numberOfLines={1}
                color={colors.black}>
                Insulin Sensitivity
              </Text>
              <Text regular color={colors.black}>
                Select all that apply to your patient
              </Text>
              <Text
                bold
                style={{
                  fontSize: 22,
                  color: diabeticClass().color,
                  textAlign: 'center',
                  marginTop: 10,
                }}
                adjustsFontSizeToFit
                numberOfLines={1}>
                {diabeticClass().class.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={switches}>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text regular style={switchCategoryText} color={colors.black}>
                  Age {'>'} 70 years
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  style={switchItself}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch('age')}
                  value={isEnabled.age}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text regular style={switchCategoryText} color={colors.black}>
                  GFR {'<'} 45 ml/min
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  style={switchItself}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch('gfr')}
                  value={isEnabled.gfr}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      regular
                      style={switchCategoryText}
                      color={colors.black}>
                      Suspected Diabetic
                    </Text>
                    <Text regular style={{fontSize: 12}} color={colors.black}>
                      &#8224;
                    </Text>
                  </View>
                  <Text style={{fontSize: 12}} color={colors.black}>
                    No diagnosis. Symptomology and Labs
                  </Text>
                </View>
              </View>
              <View style={switchView}>
                <Switch
                  style={switchItself}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch('diagnosis')}
                  value={isEnabled.diagnosis}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text regular style={switchCategoryText} color={colors.black}>
                  BMI {'>'} 35
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  style={switchItself}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch('bmi')}
                  value={isEnabled.bmi}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text regular style={switchCategoryText} color={colors.black}>
                  TDD {'>'} 80 Units
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  style={switchItself}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch('tdd')}
                  value={isEnabled.tdd}
                />
              </View>
            </View>
            <View style={switchRow}>
              <View style={switchIconAndCategory}>
                <Text regular style={switchCategoryText} color={colors.black}>
                  Daily prednisone {'>'} than 20 mg
                </Text>
              </View>
              <View style={switchView}>
                <Switch
                  style={switchItself}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch('prednisone')}
                  value={isEnabled.prednisone}
                />
              </View>
            </View>
          </View>

          <View style={{flex: 1, marginTop: 20}}>
            <TouchableOpacity
              style={[next, {borderColor: diabeticClass().color}]}
              onPress={() => {
                showADs(navigation, 'InsulinSubq', {
                  classification: diabeticClass().class,
                });
              }}>
              <Text bold style={{fontSize: 16, color: diabeticClass().color}}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
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
            <View></View>
            <View style={modalContent}>
              <Text regular style={disclaimer} color={colors.black}>
                &#8224; Diabetes may not have been diagnosed. However, the
                patient may exhibit an elevated A1C ({'>'} 6.5) along with other
                tests, symptomology, and/or labs that indicate a strong
                possibility of undiagnosed diabetes. These patients should be
                marked as 'Suspected Diabetic'.
              </Text>
              <Text
                style={{textAlign: 'center', marginTop: 20}}
                color={colors.black}>
                References
              </Text>
              <Text regular style={reference} color={colors.black}>
                Duggan. Perioperative hyperglycemia management: An update. 2017.
              </Text>
            </View>
          </View>
        </Modal>
        <View>
          <View style={{justifyContent: 'flex-end', marginVertical: 20}}>
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  next: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cdcfd0',
    margin: 5,
    padding: 10,
  },
  reference: {
    fontSize: 12,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
  userSummary: {
    flexDirection: 'row',
    marginTop: 40,
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
  },
  userDetails: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  userName: {
    fontSize: 29,
  },
  subText: {
    fontSize: 10,
  },
  userStats: {
    minHeight: 60,
    backgroundColor: '#eeeeee',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNum: {
    fontSize: 25,
  },
  statText: {
    fontSize: 12,
    color: '#4f4f50',
  },
  switches: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  switchRow: {
    flexDirection: 'row',
    padding: 10,
    marginRight: 20,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  switchIconAndCategory: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  switchIcon: {
    marginRight: 5,
  },
  switchCategoryText: {
    fontSize: 18,
  },
  switchView: {
    flex: 1,
  },
  switchItself: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  chooseColorRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chooseColor: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
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
});
