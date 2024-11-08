import AsyncStorage from '@react-native-async-storage/async-storage';

// Функция для сохранения данных
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)); // JSON.stringify для сохранения объекта
    console.log('Данные сохранены');
  } catch (e) {
    console.error('Ошибка при сохранении', e);
  }
};

// Функция для получения данных
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null; // JSON.parse для преобразования в объект
  } catch (e) {
    console.error('Ошибка при получении', e);
  }
};

// Функция для удаления данных
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Данные удалены');
  } catch (e) {
    console.error('Ошибка при удалении', e);
  }
};
