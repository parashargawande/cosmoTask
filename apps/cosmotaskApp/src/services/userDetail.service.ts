import { USER_INFO_DOC_PATH } from "src/utils/constants";
import { bindSnapshotListner, updateDocumentData } from "./firebase";
import { createMyHoroscopeByAI } from "./horoscope.service";

const addUserDetails = async (userDetails: Record<string, any>) => {
  try {
    await updateDocumentData(userDetails, USER_INFO_DOC_PATH);

    createMyHoroscopeByAI(userDetails);
  } catch (error) {
    console.error("Error adding user details:", error);
    throw error;
  }
};

const updateUserDetails = async (userDetails: Record<string, any>) => {
  try {
    await updateDocumentData(userDetails, USER_INFO_DOC_PATH);
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

const bindUserDetails = (setUserData: any) => {
  return bindSnapshotListner((profileSnap) => {
    if (!profileSnap.exists()) {
      setUserData(null);
      return;
    }

    const userProfile = profileSnap.data();
    console.log("User profile data:", userProfile);

    setUserData(userProfile);
  }, USER_INFO_DOC_PATH);
};

export {
  addUserDetails,
  bindUserDetails as readUserDetails,
  updateUserDetails,
};
