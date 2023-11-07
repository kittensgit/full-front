import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import {
    fetchPopularPosts,
    fetchPosts,
    fetchTags,
} from '../redux/slices/posts';

export const Home = () => {
    const dispatch = useDispatch();
    const { posts, tags } = useSelector((state) => state.posts); // state.posts -> posts - редьюсер
    const { data } = useSelector((state) => state.auth);

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
    }, [activeTab]);
    return (
        <>
            <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                style={{ marginBottom: 15 }}
                aria-label="basic tabs example"
            >
                <Tab label="Новые" value={'new'} />
                <Tab label="Популярные" value={'popular'} />
            </Tabs>
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
                                        commentsCount={3}
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
                        <TagsBlock items={tags.items} isLoading={false} />
                    )}

                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'Вася Пупкин',
                                    avatarUrl:
                                        'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    fullName: 'Иван Иванов',
                                    avatarUrl:
                                        'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
