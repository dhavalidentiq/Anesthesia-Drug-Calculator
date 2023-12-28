import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet, ScrollView, Modal } from 'react-native';
import { font, perfectSize } from '../styles/theme';
import Text from './utilities/Text';
import { responsiveScale } from '../styles/mixins';
import CloseIconNew from '../assets/appImages/CloseIconNew.svg';

// type BurnsRationalModal = {
//   modalOpen: boolean,
//   textColor: string,
//   peds: boolean,
//   isObesePatient: boolean,
//   backgroundColor: string,
//   top: any,
//   bottom: any,
//   setModalOpen: () => void,
// };

const BurnsRationalModal = props => {
  const {
    modalOpen,
    textColor,
    peds,
    isObesePatient,
    backgroundColor,
    top,
    bottom,
    setModalOpen = () => {},
  } = props;

  return (
    <Modal visible={modalOpen} animationType="slide">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          //   backgroundColor: backgroundColor,
          paddingTop: top,
          paddingBottom: bottom,
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalOpen(false);
          }}
          style={{ alignItems: 'center', marginTop: perfectSize(10) }}>
          <CloseIconNew width={perfectSize(40)} height={perfectSize(40)} />
        </TouchableOpacity>

        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <View style={styles.educationView}>
            <Text style={styles.educationHeader}>Fluid Calculations</Text>
          </View>

          <Text style={styles.educationHeader}>The Parkland Formula</Text>

          <Text
            style={{
              marginTop: perfectSize(10),
              fontSize: responsiveScale(15),
              fontFamily: font.outfit_Regular,
              color: '#000000',
            }}>
            {`${!peds ? 'Adults' : 'Pediatric'}`}: 4ml x %Burned x weight(kg){' '}
            {'\n\n'}
            -1/2 of the total should be given in the first 8 hours (since the
            time of the burn){'\n\n'}
            *If the patient has gone a period of time without fluid therapy
            since the burn, the sum should be given over the remaining hours.
            {'\n\n'}
            (For example, if the patient is to receive 1000mL in 8 hours, and
            the patient went without therapy for 3 hours, 1000mL should be given
            over 5 hours) {'\n\n'}
            -1/2 of the total should be given in the final 16 hours (since the
            time of the burn)
          </Text>

          <Text style={styles.educationHeader}>Burn Estimation</Text>
          <Text
            style={{
              marginTop: perfectSize(10),
              fontSize: responsiveScale(15),
              fontFamily: font.outfit_Regular,
              color: '#000000',
            }}>
            Percentage of body area burns should account only for 2nd and 3rd
            degree burns. {'\n\n'}
            Each of the percentages below should be divided in half for the
            posterior and anterior aspects (with exception to the groin)
          </Text>

          <Text style={styles.educationHeader}>
            {`${!peds ? (isObesePatient ? 'Obese' : 'Adult') : 'Pediatric'}`}
          </Text>
          <Text
            style={{
              marginTop: perfectSize(10),
              fontSize: responsiveScale(15),
              fontFamily: font.outfit_Regular,
              color: '#000000',
            }}>
            Head (including neck) -{' '}
            {`${!peds ? (isObesePatient ? '6%' : '9%') : '18%'}`}
            {'\n\n'}
            Trunk (including the buttocks on the posterior aspect) -{' '}
            {`${!peds ? (isObesePatient ? '50%' : '36%') : '36%'}`}
            {'\n\n'}
            Arms (including the hand) -{' '}
            {`${!peds ? (isObesePatient ? '7%' : '9%') : '9%'} EACH`}
            {'\n\n'}
            Legs - {`${!peds ? (isObesePatient ? '15%' : '18%') : '14%'} EACH`}
            {'\n\n'}
            {`${
              !peds
                ? !isObesePatient
                  ? 'Groin - 1%'
                  : ''
                : '*Each year after 1 year old (up to 9 years old), 1% is subtracted from the head and distributed to the legs (0.5% per leg).'
            }`}
          </Text>
        </View>

        <View style={styles.references}>
          <Text
            style={{
              fontFamily: font.outfit_Semi_Bold,
              textAlign: 'center',
              fontSize: responsiveScale(15),
              color: '#000000',
            }}>
            References
          </Text>
          <Text style={styles.reference}>
            Burn and Reconstructive Centers of America. What is the rule of
            nines, and how can it be applied in burn care? 2022.
          </Text>
          <Text style={styles.reference}>
            Moore. Rule of nines. StatPearls. 2022.
          </Text>
          <Text style={styles.reference}>
            Tiarks. Parkland formula. Osmosis from Elsevier. 2023.
          </Text>
          <Text style={styles.reference}>
            Uptodate. Assessment and classification of burn injury. 2023.
          </Text>
          <Text style={styles.reference}>
            Uptodate. Emergency care of moderate and severe thermal burns in
            adults. 2023.
          </Text>
          <Text style={styles.reference}>
            Uptodate. Treatment of deep burns. 2023.
          </Text>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalToggle: {
    marginTop: perfectSize(20),
    marginBottom: perfectSize(10),
    color: '#6f6f6f',
    padding: perfectSize(10),
    alignSelf: 'center',
  },

  educationView: {
    alignItems: 'center',
  },
  educationHeader: {
    fontSize: responsiveScale(17),
    fontFamily: font.outfit_Semi_Bold,
    marginTop: perfectSize(10),
    color: '#000000',
  },
  references: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: perfectSize(20),
  },
  reference: {
    fontSize: responsiveScale(13),
    fontFamily: font.outfit_Light,
    color: '#000000',
  },
});

export default BurnsRationalModal;
