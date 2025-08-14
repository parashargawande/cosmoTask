import axios from "axios";
import { compareDate, getUserLocation } from "src/utils/utils";
import {
  FREE_ASTROLOGY_API_KEY,
  KAAL_TIMING_DOC_PATH,
} from "../utils/constants";
import { bindSnapshotListner, updateDocumentData } from "./firebase";

const fetchKaalTimings = async (
  latitude: number,
  longitude: number,
  city: any
) => {
  const now = new Date();

  try {
    const { data } = await axios.post(
      "https://json.freeastrologyapi.com/good-bad-times",
      {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        date: now.getDate(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        latitude,
        longitude,
        timezone: -(now.getTimezoneOffset() / 60),
        config: {
          observation_point: "topocentric",
          ayanamsha: "lahiri",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": FREE_ASTROLOGY_API_KEY,
        },
      }
    );

    return {
      data: data,
      date: now.toISOString(),
      city,
    };
  } catch (error) {
    console.error("Error fetching kaal timings:", error);
    throw error;
  }
};

function validateKaalTiming(data: any) {
  let isValid = false;
  if (data && data.date && compareDate(new Date(data.date)) === 0) {
    isValid = true;
  }
  return isValid;
}

const bindKaalTiming = async (setData: any) => {
  return bindSnapshotListner(async (querySnapshot) => {
    const data = querySnapshot?.data() || {};
    const valid = validateKaalTiming(data);

    if (!valid) {
      const { latitude, longitude, city } = await getUserLocation();
      const apiData = await fetchKaalTimings(latitude, longitude, city);
      const formattedData = formatApiData(apiData);
      console.log("Formatted Kaal Timings Data:", formattedData);
      setData(formattedData);
      updateDocumentData(formattedData, KAAL_TIMING_DOC_PATH);
    } else {
      const formattedData = formatApiData(data);
      setData(formattedData);
    }
  }, KAAL_TIMING_DOC_PATH);
};

function formatApiData(input: any) {
  const rawData = input.data;
  const kaals: any = [];

  // If data is already an array, return it directly
  if (Array.isArray(rawData)) {
    return { ...input, data: rawData };
  }

  Object.keys(rawData)
    .filter((key) => key !== "statusCode")
    .forEach((key) => {
      const value = rawData[key];
      if (!value) return;

      let parsed;
      try {
        // Try to parse if it's a string, otherwise use as is
        parsed = typeof value === 'string' ? JSON.parse(value) : value;
      } catch (e) {
        console.warn(`Failed to parse value for key ${key}:`, e);
        return;
      }

      if (key === "dur_muhurat_data") {
        // dur_muhurat_data has nested structure
        for (const durKey in parsed) {
          const durEntry = parsed[durKey];
          if (durEntry && durEntry.starts_at && durEntry.ends_at) {
            const newKey = key.split("_")[0];
            const capitalizedKey = newKey.charAt(0).toUpperCase() + newKey.slice(1);
            kaals.push({
              name: `${capitalizedKey}_${durKey}`,
              starts_at: durEntry.starts_at,
              ends_at: durEntry.ends_at,
            });
          }
        }
      } else {
        if (parsed.starts_at && parsed.ends_at) {
          const newKey = key.split("_")[0];
          const capitalizedKey = newKey.charAt(0).toUpperCase() + newKey.slice(1);
          kaals.push({
            name: capitalizedKey,
            starts_at: parsed.starts_at,
            ends_at: parsed.ends_at,
          });
        }
      }
    });

  // Sort by starts_at ascending
  kaals.sort((a: any, b: any) => {
    const dateA = new Date(a.starts_at).getTime();
    const dateB = new Date(b.starts_at).getTime();
    return dateA - dateB;
  });

  return { ...input, data: kaals };
}

export { bindKaalTiming as getKallTimings };
