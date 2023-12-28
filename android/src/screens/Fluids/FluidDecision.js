import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Text from '../../components/utilities/Text';
import Block from '../../components/utilities/Block';
import Header from '../../components/Header';
import {colors} from '../../styles/theme';
import {showADs} from '../../components/IntertitialAd';

export default FluidDecision = ({navigation, route}) => {
  const {decision, weight, context, habitus, age, gender} = route.params;

  const {
    container,
    decisionButton,
    buttonText,
    references,
    reference,
    boldText,
  } = styles;
  return (
    <Block flex={1} color={colors.white}>
      <Header
        headerTitle={''}
        isBackIcon={true}
        _onPressBack={() => {
          navigation.goBack();
        }}
      />

      <View style={container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {decision == 'no' ? (
            <Text regular style={{fontSize: 15}} color={colors.black}>
              For most adults undergoing minimally or moderately invasive
              surgical procedures with anticipated and early postoperative
              ambulation, 1-2 liters of balanced electrolyte solutions (eg
              Ringers lactate, Plasmalyte) will provide adequate intravascular
              hydration.
            </Text>
          ) : (
            <Text regular style={{fontSize: 15}} color={colors.black}>
              For adults undergoing major invasive surgical procedures where
              significant blood loss and/or perioperative fluid shifts are
              anticipated, a zero-balance{' '}
              <Text bold color={colors.black}>
                OR
              </Text>{' '}
              goal-directed therapy (GDT) approach is recommended.{'\n\n'}
              <Text bold color={colors.black}>
                Zero Balance
              </Text>{' '}
              - this approach only addresses fluid loss during the procedure.
              This is done typically by giving 1-3 ml/kg of crystalloid to
              replace sensible and insensible losses during the procedure. Your
              patient weighs {weight} kg, so this would be {weight * 1} -{' '}
              {weight * 3} ml of crystalloid. {'\n\n'}
              Blood loss would be replaced by 1.5 ml of crystaloid per 1.0 ml of
              blood loss. Alternatively, 1.0 ml of colloid to 1.0 ml of blood
              loss is also an acceptable replacement. Preloading prior to
              general anesthesia or neuraxial blocks is avoided. Replacing
              'third space' losses has no benefit. Modest excess of the above
              rules is warranted in patients exhibiting signs of hypovolemia (eg
              delayed capillary refill, tachycardia, poor color, oliguria,
              hypotension). This approach also avoids excessively deep
              anesthesia {'('} bispectral index {'<'} 40{')'}.{'\n\n'}
              <Text bold color={colors.black}>
                Goal-Directed Therapy (GDT)
              </Text>{' '}
              - this approach requires invasive monitoring of hemodynamics {'('}
              eg. an arterial line{')'}. In this approach, intravascular fluids
              are replaced prior to using adding vasopressor therapy.
              Replacement amount is determined by the use of the arterial line
              pulse and VISUAL pressure variation {'('}PPV{')'}, stroke volume
              variation {'('}SSV
              {')'}, or systolic pressure variations {'('}SPV{')'}. For higher
              risk surgeries {'('}anticipated losses > 1000 ml{')'} AUTOMATED
              devices are employed to compute these values for you. Typically,
              boluses of 250 mL are given incrementally to improve intravascular
              hydration until PPV, SPV, or SSV are less than 10 percent. Fluid
              administration is avoided after those goals are reached to prevent
              overhydration.
            </Text>
          )}
          <View style={references}>
            <Text bold color={colors.black}>
              References
            </Text>
            <Text regular style={reference} color={colors.black}>
              Joshi. Intraoperative Fluid Management. UpToDate. 2021.
            </Text>
            <Text regular style={reference} color={colors.black}>
              McNeil-Masuka. Insensible Fluid Loss. StatPearls. 2020.
            </Text>
          </View>
          <Text regular color={colors.black}>
            The use of traditional liberal or fixed-volume approaches is no
            longer recommended. Would you still like to view this approach?
          </Text>
        </ScrollView>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <TouchableOpacity
            onPress={() => {
              showADs(navigation, 'CalculationFluid', {
                weight: weight,
                context: context,
                habitus: habitus,
                age: age,
                gender: gender,
              });
            }}
            style={[decisionButton, {backgroundColor: '#7fbe3c'}]}>
            <Text bold style={buttonText} color={colors.black}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              showADs(navigation, 'Calculations');
              // navigation.navigate("Calculations");
            }}
            style={[decisionButton, {backgroundColor: 'red'}]}>
            <Text bold style={buttonText} color={colors.black}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  decisionButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    width: 75,
    margin: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  references: {
    marginTop: 20,
    marginBottom: 20,
  },
  reference: {
    fontSize: 12,
  },
  boldText: {},
});
