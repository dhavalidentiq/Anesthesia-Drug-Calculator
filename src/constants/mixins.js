export const AdultDrugsCategories = {
  emergency: [
    'aepi2',
    'abre2',
    'axyl3',
    'axyl2',
    'aatr2',
    'aatr3',
    'aatr4',
    'aglu1',
    'aade1',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  ponv: ['aond1', 'adex1', 'ahal1', '', '', '', '', '', ''],
  antihypertensives: [
    'anic1',
    'anic2',
    'anip1',
    'aapr1',
    'abre1',
    'alab1',
    'alab2',
    '',
    '',
  ],
  vasopressors: [
    'aphe1',
    'aphe2',
    'aeph1',
    'avas1',
    'aepi1',
    'aepi3',
    '',
    '',
    '',
  ],
  pain: [
    'amor1',
    'afen1',
    'asuf1',
    'ahyd1',
    'arem1',
    'aketo1',
    'aace1',
    '',
    '',
    '',
  ],
  tiva: ['apro5', 'arem1', 'asuf1', 'adexm1', 'aphe2', '', '', '', '', ''],
  routine: [
    'apro1',
    'amid1',
    'afen1',
    'ahyd1',
    'aane1',
    'aroc1',
    'aroc3',
    'aphe1',
    'axyl1',
    'agly1',
    'agly2',
    'aond1',
    'adex1',
    'aketo1',
    'adexm2',
    'aneo1',
    'asug1',
    'acef1',
    'aace1',
    'psug1',
    '',
    '',
    '',
  ],
  reversal: [
    'anal1',
    'anal2',
    'aflu1',
    'aneo1',
    'asug1',
    'psug1',
    '',
    '',
    '',
    '',
  ],
};

export const PediatricDrugsCategories = {
  emergency: [
    'psuc3',
    'psuc4',
    'patr4',
    'pade1',
    'pami3',
    'pami1',
    'patr1',
    'patr2',
    'pglu1',
    'pcal1',
    'pepi3',
    'pepi4',
    'plid2',
    'plid3',
    'pmag1',
    'pproc1',
    'psod1',
    'pdan1',
    '',
  ],
  ponv: ['pond1', 'pdexa1', 'pmeto1', 'pdip1', 'pdip2', 'psco1', 'psco2', ''],
  antihypertensives: ['', ''],
  vasopressors: ['', '', ''],
  pain: [
    'pfen1',
    'pfen2',
    'pfen3',
    'pmor1',
    'phyd1',
    'prem1',
    'psuf1',
    'pace2',
    'pketo1',
    'pketo2',
    '',
    '',
  ],
  tiva: ['', '', '', '', ''],
  routine: [
    'ppro1',
    'psuc1',
    'proc1',
    'peph1',
    'patr4',
    'pgly1',
    'pneo1',
    'pace2',
    'pond1',
    'pdexa1',
    'pprec1',
    'pcef1',
    '',
    '',
    '',
    '',
  ],
  reversal: ['pnal1', 'pnal2', 'pflu1', '', ''],
  premedication: [
    'pmid1',
    'pmid2',
    'pmid3',
    'pmid4',
    'pket4',
    'pket5',
    'pket6',
    '',
    '',
  ],
};

export const ObeseAdultBurns = {
  Anterior_Head: 3,
  Posterior_Head: 3,

  Anterior_Torso: 25,
  Posterior_Torso: 25,

  Anterior_Left_Arm: 3.5,
  Anterior_Right_Arm: 3.5,

  Posterior_Left_Arm: 3.5,
  Posterior_Right_Arm: 3.5,

  Anterior_Left_Leg: 7.5,
  Anterior_Right_Leg: 7.5,

  Posterior_Left_Leg: 7.5,
  Posterior_Right_Leg: 7.5,
};

export const AdultBurns = {
  Anterior_Head: 4.5,
  Posterior_Head: 4.5,

  Anterior_Torso: 18,
  Posterior_Torso: 18,

  Anterior_Left_Arm: 4.5,
  Anterior_Right_Arm: 4.5,

  Posterior_Left_Arm: 4.5,
  Posterior_Right_Arm: 4.5,

  Anterior_Left_Leg: 9,
  Anterior_Right_Leg: 9,

  Posterior_Left_Leg: 9,
  Posterior_Right_Leg: 9,

  Anterior_Groin: 1,
};

export const _getPediatricBurns = (data: {
  head: number | null,
  legs: number | null,
}) => {
  return new Promise((resolve, reject) => {
    try {
      const result = {
        Anterior_Head: data?.head ? data?.head / 2 : 9,
        Posterior_Head: data?.head ? data?.head / 2 : 9,

        Anterior_Torso: 18,
        Posterior_Torso: 18,

        Anterior_Left_Arm: 4.5,
        Posterior_Left_Arm: 4.5,

        Anterior_Right_Arm: 4.5,
        Posterior_Right_Arm: 4.5,

        Anterior_Left_Leg: data?.legs ? data?.legs / 4 : 7,
        Posterior_Left_Leg: data?.legs ? data?.legs / 4 : 7,

        Anterior_Right_Leg: data?.legs ? data?.legs / 4 : 7,
        Posterior_Right_Leg: data?.legs ? data?.legs / 4 : 7,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
