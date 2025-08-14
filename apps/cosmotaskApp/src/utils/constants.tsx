export const FIREBASE_DB_URL =
  "https://cosmotask-d7e5f-default-rtdb.asia-southeast1.firebasedatabase.app/";
export const WEB_CLIENT_ID_3 =
  "365736312446-dthbe0kn2b7sai8t7120cnm9107tun3q.apps.googleusercontent.com";
export const FREE_ASTROLOGY_API_KEY =
  "Xs3CTXzmv84ghx4XFaF6NaJf64XFXE306NrVhhwA";

export const PROKERALA_BASE_URL = "https://api.prokerala.com/v2";

export const FREE_TODAY_PREDECTION_URL =
  "https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily";

export const PROFILE_COLLECTION = "profile";
export const TODO_COLLECTION = "todos";
export const TODAYS_COLLECTION = "today";

export const USER_DOC = "users";
export const KAAL_TIMING_DOC_PATH = "today/kaalTimings";
export const HOROSCOPE_DOC_PATH = "profile/horoscope";
export const USER_INFO_DOC_PATH = "profile/info";
export const PREDECTION_DOC_PATH = "today/predection";

export const USER_REGISTRATION_STATUS = {
  NOT_REGISTERED: "not_registered",
  REGISTERED: "registered",
  IN_PROGRESS: "in_progress",
};

export function westernSign(
  sign: keyof typeof vedicToWesternZodiacMap
): string | null {
  return vedicToWesternZodiacMap[sign] || null;
}

export const parseTextToJson = (data: any) => {
  let response: any = {};
  Object.keys(data).forEach((key) => {
    response[key] = key.startsWith("json_") ? JSON.parse(data[key]) : data[key];
  });
  return response;
};

export const vedicToWesternZodiacMap = {
  Mesha: "Aries",
  Vrishabha: "Taurus",
  Mithuna: "Gemini",
  Karka: "Cancer",
  Simha: "Leo",
  Kanya: "Virgo",
  Tula: "Libra",
  Vrischika: "Scorpio",
  Dhanu: "Sagittarius",
  Makara: "Capricorn",
  Kumbha: "Aquarius",
  Meena: "Pisces",
};

export const timingPurposes: Record<string, string> = {
  Rahu: "Unfavorable for new beginnings and important decisions",
  Yama: "Better avoided for travel and starting ventures",
  Gulika: "Not suitable for auspicious activities",
  Varjyam: "Inauspicious period, avoid important activities",
  Amrit: "Most auspicious time for any activity",
  Brahma: "Favorable for spiritual and educational activities",
  Abhijit: "Victory muhurat, good for starting important tasks",
  Dur: "Best avoided for new beginnings",
};

export const COMPONENT_STATUS = {
  IDLE: "idle",
  IN_PROGRESS: "in_progress",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
export const createStatus = (status = COMPONENT_STATUS.IDLE, message = "") => {
  return { status, message };
};

export const KAAL_DISPLAY_NAMES: Record<string, string> = {
  Rahu: "Rahu Kaalam",
  Yama: "Yama Gandam",
  Gulika: "Gulika Kalam",
  Varjyam: "Varjyam",
  Amrit: "Amrit Kaal",
  Brahma: "Brahma Muhurat",
  Abhijit: "Abhijit Muhurat",
  Dur: "Dur Muhurat",
};
