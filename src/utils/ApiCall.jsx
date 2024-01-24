import axios from "axios";

const mainUrl = 'https://weary-pike-sandals.cyclic.app/api/v1';

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Common configuration for Axios requests with headers
const axiosConfig = {
  withCredentials: true,
  headers: {
    "Authorization": `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
};

export const apiCall = async (url, body) => {
  try {
    const { data } = await axios.post(
      `${mainUrl}${url}`,
      body,
      axiosConfig
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const apiCallGet = async (url) => {
  try {
    const { data } = await axios.get(
      `${mainUrl}${url}`,
      axiosConfig
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
