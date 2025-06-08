import axios from "axios";
import { PROKERALA_BASE_URL } from "src/utils/constants";

const generateProkerlaToken = async () => {
  try {
    const response = await axios.post(`${PROKERALA_BASE_URL}/token`);
    return response.data["access_token"];
  } catch (error) {
    console.error("Error fetching Prokerala token:", error);
    throw error;
  }
};

export const fetchProkerlaData = async (
  endpoint: string,
  params: Record<string, any>
) => {
  const token = await generateProkerlaToken();

  try {
    const response = await axios.get(`${PROKERALA_BASE_URL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      `Error fetching data from Prokerala endpoint ${endpoint}:`,
      error
    );
    throw error;
  }
};
