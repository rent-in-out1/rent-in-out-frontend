import axios from "axios";

const getLocations = async () => {
  const {data} = await axios.get(
    "https://countriesnow.space/api/v0.1/countries"
  );
  return data.data;
};

export default getLocations;
