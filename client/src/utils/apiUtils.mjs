import axios from "axios";

const BASE_URL = "http://localhost:3000/";

export const apiHandler = async (action = "GET", path = "", params) => {
  let response = null;
  try {
    switch (action.toUpperCase()) {
      case "GET":
        response = await axios.get(BASE_URL + path);
        break;
      case "POST":
        response = await axios.post(BASE_URL + path, params);
        break;

      default:
        throw new Error("No Valid Action");
    }

    return response.data;
  } catch (error) {
    return { error: error };
  }
};
