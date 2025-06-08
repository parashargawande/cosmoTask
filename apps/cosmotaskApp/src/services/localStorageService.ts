import AsyncStorage from "@react-native-async-storage/async-storage";

export const getValue =async (key:string)=>{
    try {
        const value = await AsyncStorage.getItem(key);
        if(value !== null){
            return value;
        }
    } catch (e) {
        console.error("Error getting value from AsyncStorage", e);
    }
    return null;
}
export const setValue = async(key:string)=>{
    try {
        await AsyncStorage.setItem(key, "true");
    } catch (e) {
        console.error("Error setting value in AsyncStorage", e);
    }
}