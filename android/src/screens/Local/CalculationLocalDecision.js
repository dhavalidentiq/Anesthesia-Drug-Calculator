import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {inArray, removeFromArray} from '../../utils/CommonMethods';
import Block from '../../components/utilities/Block';
import Header from '../../components/Header';
import {colors, font, perfectSize} from '../../styles/theme';
import Text from '../../components/utilities/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaGAMBannerAdder from '../../components/GAMBannerAd';
import {showADs} from '../../components/IntertitialAd';

export default CalculationLocalDecision = ({navigation, route}) => {
  const [localList, setLocalList] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const insets = useSafeAreaInsets();

  const windowWidth = Dimensions.get('window').width;
  const buttonWidth = windowWidth / 2 - 40;

  const toggle = drug => {
    setIsEnabled(previousState => !previousState);

    let tempArray = localList;
    if (inArray(drug, tempArray)) {
      removeFromArray(drug, tempArray);
    } else {
      tempArray.push(drug);
    }
    setLocalList(tempArray);

    // const newArray = localList
    // newArray.push(drug)
    // setLocalList(newArray)
  };

  const allLocal = [
    {
      title: 'LIDOCAINE',
      options: [
        {
          button: '1% Plain',
          buttonVal: 'lido1',
        },
        {
          button: '1% W/Epi',
          buttonVal: 'lido1epi',
        },
        {
          button: '2% Plain',
          buttonVal: 'lido2',
        },
        {
          button: '2% w/epi',
          buttonVal: 'lido2epi',
        },
      ],
    },
    {
      title: 'BUPIVACAINE',
      options: [
        {
          button: '0.25% Plain',
          buttonVal: 'bup25',
        },
        {
          button: '0.25% W/Epi',
          buttonVal: 'bup25epi',
        },
        {
          button: '0.5% Plain',
          buttonVal: 'bup50',
        },
        {
          button: '0.5% w/epi',
          buttonVal: 'bup50epi',
        },
      ],
    },
    {
      title: 'ROPIVACAINE',
      options: [
        {
          button: '0.2% Plain',
          buttonVal: 'rope2',
        },
        {
          button: '0.2% W/epi',
          buttonVal: 'rope2epi',
        },
        {
          button: '0.5% Plain',
          buttonVal: 'rope5',
        },
        {
          button: '0.5% w/epi',
          buttonVal: 'rope5epi',
        },
      ],
    },
    {
      title: 'MEPIVACAINE',
      options: [
        {
          button: '1% Plain',
          buttonVal: 'mep1',
        },
        {
          button: '1% W/epi',
          buttonVal: 'mep1epi',
        },
        {
          button: '1.5% Plain',
          buttonVal: 'mep15',
        },
        {
          button: '1.5% w/epi',
          buttonVal: 'mep15epi',
        },
        {
          button: '2% Plain',
          buttonVal: 'mep2',
        },
        {
          button: '2% w/epi',
          buttonVal: 'mep2epi',
        },
      ],
    },
  ];

  const renderLocalOptions = () => {
    const {title, drugCat} = styles;
    return allLocal.map(drug => {
      return (
        <View style={drugCat}>
          <View>
            <Text bold style={title} color={colors.black}>
              {drug.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            {drug.options.map(option => {
              return (
                <View>
                  <Button
                    mode={
                      inArray(option.buttonVal, localList)
                        ? 'contained'
                        : 'outlined'
                    }
                    buttonColor={
                      inArray(option.buttonVal, localList) ? 'green' : ''
                    }
                    style={{margin: 5, width: buttonWidth}}
                    onPress={() => {
                      toggle(option.buttonVal);
                    }}
                    labelStyle={{fontFamily: font.roboto_Regular}}>
                    {option.button}
                  </Button>
                </View>
              );
            })}
          </View>
        </View>
      );
    });
  };

  const {container, title} = styles;
  const localListEmpty = localList.length == 0 ? true : false;
  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={'Local'}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <View style={container}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#fafafa',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#d2d2d2',
          }}>
          <View>
            <Text
              bold
              style={{
                fontSize: 20,
                color: '#959696',
              }}>
              Choose Your Drugs
            </Text>
            <Text
              regular
              style={{
                fontSize: 12,
                color: '#959696',
              }}>
              LA Toxicity is based on IBW:{' '}
              <Text bold style={{color: '#6d007d'}}>
                {route.params.ibw} kg
              </Text>
            </Text>
          </View>
          <View>
            <Button
              mode="outlined"
              disabled={localListEmpty}
              textColor={true ? 'green' : ''}
              style={{
                width: 80,
                borderColor: localListEmpty ? '#a8adb0' : 'green',
                borderWidth: 2,
                fontWeight: 'bold',
              }}
              onPress={() => {
                showADs(navigation, 'CalculationLocal', {
                  localList: localList.sort(),
                  ibw: route.params.ibw,
                });
              }}>
              Go
            </Button>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60, paddingTop: 20}}>
          {renderLocalOptions()}
        </ScrollView>
      </View>

      <Block flex={false} padding={[0, 0, insets.bottom - perfectSize(20), 0]}>
        <HeaGAMBannerAdder />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red'
  },
  title: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  drugCat: {
    marginBottom: 30,
    flex: 1,
    justifyContent: 'center',
  },
});
