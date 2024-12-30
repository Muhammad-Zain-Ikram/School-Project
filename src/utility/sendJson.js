import axios from "axios";

const sendJSONRequest = async (url, jsonData) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios({
      method: "post",
      url: url,
      data: jsonData ? jsonData : {},
      headers: headers,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      console.error("Request made but no response received");
    } else {
      console.error("Error", error.message);
    }
    throw error;
  }
};

const getRequest = async (url) => {
  try {
    const response = await axios({
      method: "get",
      url: url,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      console.error("Request made but no response received");
    } else {
      console.error("Error", error.message);
    }
    throw error;
  }
};
export { sendJSONRequest, getRequest };
