export const Hemodynamics = age => {
  //taken from https://anesthesia.ucsf.edu/sites/anesthesia.ucsf.edu/files/wysiwyg/pdfs/PediRefCard.pdf
  let hemodynamics;
  if (age < -132) {
    hemodynamics = {
      age: 'preterm',
      hr: '120 - 170',
      sbp: '40 - 60',
      map: "30's",
      RR: '50 - 60',
    };
  } else if (age >= -132 && age <= -84) {
    hemodynamics = {
      age: '0 - 3 mo',
      hr: '100 - 150',
      sbp: '65 - 85',
      map: '45 - 60',
      RR: '30 - 60',
    };
  } else if (age > -84 && age <= -48) {
    hemodynamics = {
      age: '3 - 6 mo',
      hr: '90 - 120',
      sbp: '70 - 90',
      map: "50's - 60's",
      RR: '24 - 30',
    };
  } else if (age > -48 && age <= 11) {
    hemodynamics = {
      age: '6 - 12 mo',
      hr: '80 - 120',
      sbp: '80 - 100',
      map: "60's",
      RR: '22 - 26',
    };
  } else if (age >= 13 && age <= 36) {
    hemodynamics = {
      age: '1 - 3 yrs',
      hr: '70 - 110',
      sbp: '70 - 100',
      map: "50's - 60's",
      RR: '18 - 24',
    };
  } else if (age >= 37 && age <= 72) {
    hemodynamics = {
      age: '3 - 6 yrs',
      hr: '65 - 110',
      sbp: '80 - 110',
      map: '55 - 70',
      RR: '16 - 22',
    };
  } else if (age >= 73 && age <= 144) {
    hemodynamics = {
      age: '6 - 12 yrs',
      hr: '60 - 95',
      sbp: '80 - 120',
      map: '60 - 80',
      RR: '12 - 20',
    };
  } else {
    hemodynamics = {
      age: '> 12 yrs',
      hr: '55 - 85',
      sbp: '90 - 130',
      map: "70's - 80's",
      RR: '10 - 16',
    };
  }
  return hemodynamics;
};

export const Obesity = BMI => {
  let habitus;
  if (BMI < 18) {
    habitus = 'underweight';
  } else if (BMI >= 18 && BMI <= 24.9) {
    habitus = 'normal';
  } else if (BMI >= 25 && BMI <= 29.9) {
    habitus = 'overweight';
  } else if (BMI >= 30 && BMI <= 34.9) {
    habitus = 'Obesity class I';
  } else if (BMI >= 35 && BMI <= 39.9) {
    habitus = 'Obesity class II';
  } else if (BMI >= 40) {
    habitus = 'Obesity class III';
  }
  return habitus;
};

export const Airway = (weightKg, age) => {
  //taken from https://anesthesia.ucsf.edu/sites/anesthesia.ucsf.edu/files/wysiwyg/pdfs/PediRefCard.pdf
  let airway;
  if (weightKg < 1 && age < -132) {
    //Premie
    airway = {
      ett: '2.5u',
      ettCM: '7 cm',
      blade: 'Miller 0',
      lma: '1',
      otherMask: 'neonate',
      oralAirway: '30',
      mask: 'Red',
    };
  } else if (weightKg >= 1 && weightKg <= 3 && age < -132) {
    //Premie
    airway = {
      ett: '3.0u',
      ettCM: '8cm',
      blade: 'Miller 0',
      lma: '1',
      otherMask: 'neonate',
      oralAirway: '30',
      mask: 'Red',
    };
  } else if (weightKg <= 3 && age >= -132 && age <= -120) {
    //Neonate
    airway = {
      ett: '3c/3.5u',
      ettCM: '9cm',
      blade: 'Miller 0-1',
      lma: '1',
      otherMask: 'neonate',
      oralAirway: '30',
      mask: 'Red',
    };
  } else if (weightKg > 3 && weightKg <= 4.1 && age >= -132 && age <= -120) {
    //Neonate
    airway = {
      ett: '3c/3.5u',
      ettCM: '10cm',
      blade: 'Miller 0-1',
      lma: '1',
      otherMask: 'infant',
      oralAirway: '40',
      mask: 'Red/Green',
    };
  } else if (age > -120 && age <= -48) {
    //1-6 months
    airway = {
      ett: '3c/3.5u',
      ettCM: '12cm',
      blade: 'Miller 1 / Wis 1.5',
      lma: '1 - 1.5',
      otherMask: 'infant',
      oralAirway: '40',
      mask: 'Green',
    };
  } else if (age >= -47 && age <= 24) {
    //6 months - 1 yr
    airway = {
      ett: '3.5c/4u',
      ettCM: '13cm',
      blade: 'Wis 1.5',
      lma: '1.5',
      otherMask: 'toddler',
      oralAirway: '50',
      mask: 'Purple',
    };
  } else if (age >= 25 && age <= 36) {
    //1 - 2 yr
    airway = {
      ett: '4.0c - 4.5c',
      ettCM: '14cm',
      blade: 'Wis 1.5',
      lma: '2',
      otherMask: 'toddler',
      oralAirway: '60',
      mask: 'Purple',
    };
  } else if (age >= 37 && age <= 60) {
    //2-4 yr
    airway = {
      ett: '4.5c',
      ettCM: '15cm',
      blade: 'Wis 1.5 / Mac 2',
      lma: '2',
      otherMask: 'child',
      oralAirway: '60',
      mask: 'Purple',
    };
  } else if (age >= 61 && age <= 84) {
    //4-6 yr
    airway = {
      ett: '4.5c - 5.0c',
      ettCM: '16cm',
      blade: 'Miller 2 / Mac 2',
      lma: '2',
      otherMask: 'child',
      oralAirway: '60 - 70',
      mask: 'Purple/Yellow',
    };
  } else if (age >= 85 && age <= 108) {
    //6-8 yr
    airway = {
      ett: '5.0c - 5.5c',
      ettCM: '17cm',
      blade: 'Miller 2 / Mac 2',
      lma: '2.5',
      otherMask: 'child',
      oralAirway: '70 - 80',
      mask: 'Yellow',
    };
  } else if (age >= 97 && age <= 156) {
    //8-12
    airway = {
      ett: '5.5c - 6.0c',
      ettCM: '18cm',
      blade: 'Miller/Mac 2-3',
      lma: '3',
      otherMask: 'small adult',
      oralAirway: '80',
      mask: 'Yellow/Blue',
    };
  } else if (age > 156) {
    //12+
    airway = {
      ett: '6.5c - 7.0c',
      ettCM: '20 - 22cm',
      blade: 'Miller/Mac 2-3',
      lma: '4',
      otherMask: 'medium - large adult',
      oralAirway: '80 - 90',
      mask: 'Blue',
    };
  } else {
    airway = {
      ett: '',
      ettCM: '',
      blade: '',
      lma: '',
      mask: '',
      oralAirway: '',
      mask: '',
    };
  }
  return airway;
};

export const inArray = (val, arr) => {
  let arrLength = arr.length;
  for (var i = 0; i < arrLength; i++) {
    if (arr[i] == val) {
      return true;
    }
  }
  return false;
};

export const removeFromArray = (val, arr) => {
  const index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
