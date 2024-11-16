import axios from "axios";

const BASE_URL = "http://localhost:3000/";

export const apiHandler = async (action = "GET", path = "", params) => {
  let response = null;
  try {
    switch (action.toUpperCase()) {
      case "GET":
        console.log(params);
        response = params
          ? await axios.get(BASE_URL + path, {
              params: params,
              paramsSerializer: (params) => {
                // Custom serializer to encode array as needed by the back end
                console.log(
                  params.filters
                    .map((filter) => `filters=${filter.name}`)
                    .join("&")
                );
                return params.filters
                  .map((filter) => `filters=${filter.name}`)
                  .join("&");
              },
            })
          : await axios.get(BASE_URL + path);
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
