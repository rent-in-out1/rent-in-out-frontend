import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doApiMethod, doGetApiMethod } from '../../api/services/axios-service/axios-service';
import { errorHandler } from '../../util/functions';
import { AddCategoryPayload, ICategoryDataModel, ICategoryModel } from '../models/category.model';

const initialState: ICategoryModel = {
	categories: [],
	error: {},
	loading: false,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		// get categories status
		builder
			.addCase(getCategories.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
			})
			.addCase(getCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// delete categories
			.addCase(deleteCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = state.categories.filter((category) => category._id !== action.payload);
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// edit categories status
			.addCase(editCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(editCategory.fulfilled, (state, action) => {
				state.loading = false;
				const updatedCategories = state.categories.map((category) => {
					if (category._id === action.payload?.id) return action.payload?.data.category;
					return category;
				});
				state.categories = updatedCategories;
			})
			.addCase(editCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(addCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = [...state.categories, action.payload as ICategoryDataModel];
			})
			.addCase(addCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const addCategory = createAsyncThunk('addCategory/add', async (addData: AddCategoryPayload) => {
	try {
		const url = '/categories';
		const { data } = await doApiMethod<ICategoryDataModel>(url, 'POST', addData);
		return data;
	} catch (error) {
		errorHandler(error);
	}
});
export const deleteCategory = createAsyncThunk(
	'deleteCategory/delete',
	async ({ id, name }: { id: string; name: string }) => {
		try {
			if (window.confirm(`Are you sure you want to delete${name}`)) {
				const url = `/categories/${id}`;
				await doApiMethod(url, 'DELETE');
				return id;
			}
		} catch (error) {
			errorHandler(error);
		}
	}
);

export const editCategory = createAsyncThunk(
	'editCategory/edit',
	async ({
		id,
		editData,
		setOnEdit,
	}: {
		id: string;
		editData: { name: string; url_name: string; info: string };
		setOnEdit: (value: boolean) => void;
	}) => {
		const url = `/categories/${id}`;
		if (!editData || editData.name === '' || editData.url_name === '' || editData.info === '') {
			errorHandler('Please fill in all fields');
			return;
		}
		try {
			if (window.confirm(`Are you sure you want to edit ${editData.name}`)) {
				setOnEdit(true);
				const { data } = await doApiMethod<{ category: ICategoryDataModel }>(url, 'PUT', editData);
				setOnEdit(false);
				return { data, id };
			}
		} catch (error) {
			errorHandler(error);
		}
	}
);
export const getCategories = createAsyncThunk(
	'categories/get',
	async ({ search, option, page }: { search: string; option: string; page: number }) => {
		try {
			const url = `/categories/search/?s=${search}&sort=${option}&page=${page}`;
			const { data } = await doGetApiMethod(url);
			return data;
		} catch (error) {
			errorHandler(error);
		}
	}
);

export default categoriesSlice.reducer;
