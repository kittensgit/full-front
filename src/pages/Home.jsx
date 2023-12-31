import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import {
    fetchComments,
    fetchPopularPosts,
    fetchPosts,
    fetchPostsByTag,
    fetchTags,
} from '../redux/slices/posts';

export const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { posts, tags, comments } = useSelector((state) => state.posts); // state.posts -> posts - редьюсер
    const { data } = useSelector((state) => state.auth);

    const { tag } = useParams();

    const isPostsLoading = posts.status === 'loading';
    const isTagsLoading = tags.status === 'loading';

    const [activeTab, setActiveTab] = useState('new');

    useEffect(() => {
        if (activeTab === 'new') {
            dispatch(fetchPosts());
            dispatch(fetchTags());
        } else {
            dispatch(fetchPopularPosts());
        }
        dispatch(fetchComments());
    }, [activeTab, dispatch]);

    useEffect(() => {
        if (tag) {
            dispatch(fetchPostsByTag(tag));
        }
    }, [tag, dispatch]);

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/') {
            dispatch(fetchPosts());
        }
    }, [location, dispatch]);

    const uniqueTags = Array.from(new Set(tags.items));

    return (
        <>
            {tag ? (
                <h1>{tag}</h1>
            ) : (
                <Tabs
                    value={activeTab}
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    style={{ marginBottom: 15 }}
                    aria-label="basic tabs example"
                >
                    <Tab label="Новые" value={'new'} />
                    <Tab label="Популярные" value={'popular'} />
                </Tabs>
            )}

            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostsLoading ? [...Array(5)] : posts.items).map(
                        (obj, index) =>
                            isPostsLoading ? (
                                <Post key={index} isLoading={true} />
                            ) : (
                                (activeTab === 'new' ||
                                    activeTab === 'popular') && (
                                    <Post
                                        key={obj._id}
                                        id={obj._id}
                                        title={obj.title}
                                        imageUrl={obj.imageUrl}
                                        user={obj.user}
                                        createdAt={obj.createdAt}
                                        viewsCount={obj.viewsCount}
                                        commentCount={obj.commentCount}
                                        tags={obj.tags}
                                        isEditable={
                                            data?.userData._id === obj.user._id
                                        }
                                    />
                                )
                            )
                    )}
                </Grid>

                <Grid xs={4} item>
                    {isTagsLoading ? (
                        <TagsBlock isLoading={true} />
                    ) : (
                        <TagsBlock items={uniqueTags} isLoading={false} />
                    )}

                    {comments && comments.status !== 'loading' ? (
                        <CommentsBlock
                            items={
                                comments.items?.comments || comments.items || []
                            }
                            isLoading={false}
                        />
                    ) : (
                        <CommentsBlock isLoading={true} />
                    )}
                </Grid>
            </Grid>
        </>
    );
};
