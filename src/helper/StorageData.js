import AsyncStorage from "@react-native-async-storage/async-storage";

export const StoreDataLocally = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
};

export const getDataFomLocalStore = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {}
};

export const RemoveLocallyData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};
