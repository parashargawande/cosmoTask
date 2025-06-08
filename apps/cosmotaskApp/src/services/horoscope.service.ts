import { auth } from "src/services/firebase/firebaseService";
import { HOROSCOPE_DOC_PATH, parseTextToJson } from "src/utils/constants";
import { bindSnapshotListner, getDocumentData } from "./firebase";
import { callMakeWorkflow } from "./make.service";

export const bindHoroscope = (setMyHoroscope: (data: any) => void) => {
  return bindSnapshotListner((querySnapshot) => {
    if (!querySnapshot.exists()) {
      console.log("no horoscope");

      setMyHoroscope({});
      return;
    }

    const data: any = querySnapshot.data();
    const { json_ai_raw_data } = parseTextToJson(data);

    setMyHoroscope(json_ai_raw_data);
  }, HOROSCOPE_DOC_PATH);
};

export async function getMySunsign() {
  const data = await getDocumentData(HOROSCOPE_DOC_PATH);
  const { json_ai_raw_data } = parseTextToJson(data);
  const sunsign = json_ai_raw_data?.soorya_rasi?.name;

  if (!sunsign) {
    throw new Error("Unable to determine sun sign from horoscope data");
  }
  return sunsign;
}

const createMyHoroscopeByAI = async (userDetails: any) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }

  try {
    const body = {
      ...userDetails,
      userId: user.uid,
    };
    await callMakeWorkflow(body, "generateMyHoroscope");
  } catch (error) {
    console.log("Failed to create horoscope: ", error);
    throw error;
  }
};

export { createMyHoroscopeByAI };
