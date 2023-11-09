import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});
export const fetchPopularPosts = createAsyncThunk(
    'posts/fetchPopularPosts',
    async () => {
        const { data } = await axios.get('/posts/popular');
        return data;
    }
);
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});
export const fetchPostsByTag = createAsyncThunk(
    'posts/fetchPostsByTag',
    async (tag) => {
        const { data } = await axios.get(`/tags/${tag}`);
        return data;
    }
);
export const fetchRemovePost = createAsyncThunk(
    'posts/fetchRemovePost',
    async (id) => await axios.delete(`/posts/${id}`)
);
export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async (id) => {
        const { data } = await axios.get(`/posts/${id}/comments`);
        return data;
    }
);
export const fetchAddComments = createAsyncThunk(
    'posts/fetchAddComments',
    async ({ postId, text, user }) => {
        const { data } = await axios.patch(`/posts/${postId}/comments`, {
            text,
            user,
        });
        return data;
    }
);

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
    comments: {
        items: [],
        status: 'loading',
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // получение постов(новых)
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // получение популярных постов
        [fetchPopularPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPopularPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // получение тегов
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        // получение постов по тегу
        [fetchPostsByTag.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPostsByTag.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPostsByTag.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        // удаление поста
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(
                (post) => post._id !== action.meta.arg
            );
        },
        // получение comments
        [fetchComments.pending]: (state) => {
            state.comments.items = [];
            state.comments.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload;
            state.comments.status = 'loaded';
        },
        [fetchComments.rejected]: (state) => {
            state.comments.items = [];
            state.comments.status = 'error';
        },
        // add comments
        [fetchAddComments.pending]: (state) => {
            state.comments.items = [];
            state.comments.status = 'loading';
        },
        [fetchAddComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload.updatedPost.comments;
            state.comments.status = 'loaded';
        },
        [fetchAddComments.rejected]: (state) => {
            state.comments.items = [];
            state.comments.status = 'error';
        },
    },
});

export const postsReducer = postsSlice.reducer;
