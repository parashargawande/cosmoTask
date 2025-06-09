import { PREDECTION_DOC_PATH } from "src/utils/constants";
import { compareDate } from "src/utils/utils";
import { bindSnapshotListner, getDocumentData } from "./firebase";

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

export function bindTodaysPredection(setData: (data: any) => void) {
  return bindSnapshotListner(async (querySnapshot) => {
    const { json_raw_data } = querySnapshot?.data() || {};
    const parsedData = JSON.parse(json_raw_data || "{}") || {};
    const predection = parsedData?.data;
    const valid = validateTodayPredection(predection);

    if (!valid) {
      setData({});
    } else {
      setData(predection);
    }
  }, "today/predection");
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
