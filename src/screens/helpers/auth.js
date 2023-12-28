import AsyncStorage from "@react-native-async-storage/async-storage";

const ADSCOUNT = "@ads_count";
const TABHEIGHT = "@tab_height";

export const setAdCount = async (value = 0) => {
  try {
    await AsyncStorage.setItem(ADSCOUNT, value?.toString());
  } catch (err) {
    logError(err, "[setAuthToken] EncryptedStorage Error");
  }
};

export const getAdCount = async () => {
  try {
    return await AsyncStorage.getItem(ADSCOUNT);
  } catch (err) {
    logError(err, "[getAuthToken] EncryptedStorage Error");

    return null;
  }
};

export const setTabHeight = async (value = 0) => {
  try {
    await AsyncStorage.setItem(TABHEIGHT, value?.toString());
  } catch (err) {
    logError(err, "[setAuthToken] EncryptedStorage Error");
  }
};

export const getTabHeight = async () => {
  try {
    return await AsyncStorage.getItem(TABHEIGHT);
  } catch (err) {
    logError(err, "[getAuthToken] EncryptedStorage Error");

    return null;
  }
};
