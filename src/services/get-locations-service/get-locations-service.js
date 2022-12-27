import axios from "axios";

export const getCountries = async () => {
  const {data} = await axios.get(
    "https://countriesnow.space/api/v0.1/countries"
  );
  return data.data;
};

export const getCities = async (country) => {
  const {data} = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {"country" : country}
  );
  return data.data;
};

