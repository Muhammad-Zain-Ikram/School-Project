import axios from 'axios';

// This function can be placed in a utility file like `apiUtils.js`
const sendJSONRequest = async (url, jsonData) => {
  try {
    // Define the headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // Send POST request using axios
    const response = await axios({
      method: 'post',
      url: url,
      data: jsonData ? jsonData : {},
      headers: headers,
      withCredentials: true
    });

    // Assuming you want to return the data from the response
    return response.data;
  } catch (error) {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request made but no response received');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    // Optionally, you can rethrow the error or return a custom error object
    throw error;
  }
};

const getRequest = async (url) => {
  try {
    // Send POST request using axios
    const response = await axios({
      method: 'get',
      url: url,
      withCredentials: true
    });
    
    // Assuming you want to return the data from the response
    return response.data;
  } catch (error) {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request made but no response received');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    // Optionally, you can rethrow the error or return a custom error object
    throw error;
  }
};
// Export the function so it can be imported in other files
export { 
  sendJSONRequest,
  getRequest
};
