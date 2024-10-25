import axios from 'axios';

type ICountriesModel = {
	iso2: string;
	iso3: string;
	country: string;
	cities: string[];
};

export const getCities = async (country: string): Promise<string[]> => {
	const { data } = await axios.post<{ data: string[] }>('https://countriesnow.space/api/v0.1/countries/cities', {
		country,
	});
	return data.data;
};

export const getCountries = async (): Promise<ICountriesModel[]> => {
	const { data } = await axios.get<{ data: ICountriesModel[] }>('https://countriesnow.space/api/v0.1/countries');
	return data.data;
};
