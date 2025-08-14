/**
 * fetch todays tasks from firestore
 * if tasks is available and date if correct display it
 * else call make workflow
 *
 */

import { FREE_TODAY_PREDECTION_URL, westernSign } from "src/utils/constants";
import { compareDate } from "src/utils/utils";
import { bindSnapshotListner, updateDocumentData } from "./firebase";
import { getMySunsign } from "./horoscope.service";
import { callMakeWorkflow } from "./make.service";
import { isTodaysPredectionValid } from "./predection.service";

async function createBody() {
  const validPredection = await isTodaysPredectionValid();
  const sunsign = await getMySunsign();

  const url = `${FREE_TODAY_PREDECTION_URL}?sign=${westernSign(
    sunsign
  )}&day=TODAY`;

  return { validPredection, predectionUrl: url };
}

export function setWorkflowStatus() {
  const data = JSON.stringify({
    date: new Date().toISOString(),
    workflow_inProgress: true,
  });
  updateDocumentData({ json_raw_data: data }, "today/tasks");
}

export function bindTodayTask(setData: (data: any) => void) {
  return bindSnapshotListner(async (querySnapshot) => {
    const { json_raw_data } = querySnapshot?.data() || {};
    const data = JSON.parse(json_raw_data || "{}") || {};
    const valid = validateTodayTasks(data);

    if (!valid) {
      setData({});
      const body = await createBody();
      setWorkflowStatus();
      callMakeWorkflow(body, "generateTodayTasks");
    } else if (data?.workflow_inProgress === true) {
      console.log("Workflow is in progress, not setting data yet.");
      setData({});
    } else {
      setData(data);
    }
  }, "today/tasks");
}

function validateTodayTasks(data: any) {
  let isTodaysTaskValid = false;

  if (data && data.date) {
    const taskDate = new Date(data.date);
    if (compareDate(taskDate) === 0) {
      isTodaysTaskValid = true;
    }
  }
  return isTodaysTaskValid;
}
