import { AsyncStorage } from 'react-native';

const getToken = async () => {
    try {
        //const value = await AsyncStorage.getItem('@token');
        const value = 'hungtesttoken';
        if (value !== null) {
            return value;
        }
        return '';
    } catch (error) {
    // Error retrieving data
        return '';
    }
};

export default getToken;
