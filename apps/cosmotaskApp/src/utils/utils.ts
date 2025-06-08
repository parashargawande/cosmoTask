import * as Location from "expo-location";
import axios from "axios";

export async function getLocationNameFromCoords(lat: number, lon: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

  const response = await axios.get(url, {
    headers: {
      "User-Agent": "YourAppName1/1.0 (your-email1@example.com)",
    },
  });

  const data = response.data;

  return {
    latitude: lat,
    longitude: lon,
    address: data.display_name,
    city: data.address?.city || data.address?.town || data.address?.village,
    state: data.address?.state,
    country: data.address?.country,
    raw: data,
  };
}

export const compareDate = (date1: Date, date2: Date = new Date()): number => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  const t1 = d1.getTime();
  const t2 = d2.getTime();

  if (t1 === t2) return 0; // Same day
  if (t1 < t2) return -1; // date1 is before date2
  return 1; // date1 is after date2
};

export async function getUserLocation(): Promise<{
  latitude: number;
  longitude: number;
  city: any;
}> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Reverse geocode to get address
    const addresses = await getLocationNameFromCoords(latitude, longitude);

    const { city } = addresses;

    console.log({ latitude, longitude, city });

    return { latitude, longitude, city };
  } catch (error) {
    throw error;
  }
}

export const formatDate = (date: string = new Date().toISOString()) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
};
