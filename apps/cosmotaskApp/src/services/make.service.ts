import axios from "axios";
import { auth } from "src/services/firebase/firebaseService";
const MAKE_WORKFLOW_URL =
  "https://hook.eu2.make.com/t53z7roirour95wq0sc871bvf4npxh68";

export async function callMakeWorkflow(data = {}, workflow = "") {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }

    console.log(
      "Calling Make workflow for user:",
      user.uid,
      "with workflow:",
      workflow,
      data
    );

    const body = { userId: user.uid, workflow, ...data };
    const response = await axios.post(
      `${MAKE_WORKFLOW_URL}?workflow=${workflow}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Failed to call Make workflow: ", error);
    throw error;
  }
}
