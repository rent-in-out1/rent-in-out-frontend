import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doApiMethod, doGetApiMethod } from '../../api/services/axios-service/axios-service';
import { errorHandler } from '../../util/functions';
import { IPostDataModel, IPostModel } from '../models/post.model';

const initialState: IPostModel = {
	posts: [],
	loading: false,
	error: null,
	isChange: false,
	editablePost: {},
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		clearPosts: (state) => {
			state.posts = [];
		},
		setIsChange: (state) => {
			state.isChange = !state.isChange;
		},
		setPostEdit: (state, action) => {
			state.editablePost = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getPosts.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.loading = false;
				if (action?.payload?.count > 0) {
					state.posts = [...state.posts, ...action.payload.posts];
					state.posts = state.posts?.filter((element) => {
						const isDuplicate = state.posts.includes(element);
						if (!isDuplicate) {
							state.posts.push(element);
							return true;
						}
						return false;
					});
				}
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deletePost.pending, (state) => {
				state.loading = true;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.loading = false;
				state.posts = state.posts.filter((post) => post._id !== action.payload);
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(likePost.pending, (state) => {
				state.loading = false;
			})
			.addCase(likePost.fulfilled, (state, action) => {
				state.loading = false;

				if (action.payload) {
					state.posts.forEach((post, i) => {
						if (post?._id === action.payload?.id) {
							state.posts[i].likes = action.payload.data.posts;
						}
					});
				}
			})
			.addCase(likePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(uploadPost.pending, (state) => {
				state.loading = true;
			})
			.addCase(uploadPost.fulfilled, (state, action) => {
				state.loading = false;
				state.posts.unshift(action.payload as IPostDataModel);
			})
			.addCase(uploadPost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const deletePost = createAsyncThunk('posts/delete', async ({ id, name }: { id: string; name: string }) => {
	try {
		if (window.confirm(`Are you sure you want to delete "${name}"`)) {
			const url = `/posts/${id}`;
			await doApiMethod(url, 'DELETE');
			return id;
		}
	} catch (error) {
		errorHandler(error);
	}
});
export const getPosts = createAsyncThunk(
	'posts/get',
	async ({
		option = 'createdAt',
		page = 1,
		endScreenEnd,
		setPage,
		searchParams,
	}: {
		option: string;
		page: number;
		endScreenEnd: () => void;
		setPage: (page: number) => void;
		searchParams: URLSearchParams;
	}) => {
		try {
			if (page === 1) clearPosts();
			// TODO - check if working
			const params = new URLSearchParams({
				searchQ: searchParams.get('s') || '',
				page: page.toString(),
				reverse: 'yes',
				sort: option,
				max: searchParams.get('price_max') || '',
				min: searchParams.get('price_min') || '',
				categories: searchParams.get('categories') || '',
			});

			const url = `/posts/search?${params.toString()}`;
			const { data } = await doGetApiMethod(url);
			if (data.count > 0) {
				endScreenEnd();
				setPage(page + 1);
			}
			return data;
		} catch (error) {
			errorHandler(error);
		}
	}
);
export const likePost = createAsyncThunk('likePost/like', async ({ id }: { id: string }) => {
	try {
		const url = `/posts/likePost/${id}`;
		const { data } = await doApiMethod<{ posts: string[]; post: IPostDataModel }>(url, 'POST');
		return { data: { posts: data.posts }, id };
	} catch (error) {
		errorHandler(error);
	}
});
export const uploadPost = createAsyncThunk('uploadPost/upload', async (post: IPostDataModel) => {
	try {
		const url = '/posts';
		const { data } = await doApiMethod<IPostDataModel>(url, 'POST', post);
		return data;
	} catch (error) {
		errorHandler(error);
	}
});

export const { clearPosts, setIsChange, setPostEdit } = postsSlice.actions;
export default postsSlice.reducer;
