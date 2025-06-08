import { PREDECTION_DOC_PATH } from "src/utils/constants";
import { compareDate } from "src/utils/utils";
import { getDocumentData } from "./firebase";

function validateTodayPredection(predection = {}) {
  let validPredection = false;
  if (predection?.date) {
    const predectionDate = new Date(predection.date);
    if (compareDate(predectionDate) === 0) {
      validPredection = true;
    }
  }
  return validPredection;
}

export async function isTodaysPredectionValid() {
  let validPredection = true;

  try {
    const data = await getDocumentData(PREDECTION_DOC_PATH);
    validPredection = validateTodayPredection(data);
  } catch (error) {
    console.error("error verifying predection validitiy :", error);
    validPredection = false;
  }

  return validPredection;
}
