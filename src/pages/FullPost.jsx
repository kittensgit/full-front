import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../axios';

import { Post } from '../components/Post/Post';
import { AddComment } from '../components/AddComment/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostComments } from '../redux/slices/posts';

export const FullPost = () => {
    const dispatch = useDispatch();
    const { comments } = useSelector((state) => state.posts);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
                dispatch(fetchPostComments(id));
            })
            .catch((err) => {
                console.warn(err);
                alert('Failed to get article');
            });
    }, [id, dispatch]);

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost />;
    }

    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl}
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentCount={data.commentCount}
                tags={data.tags}
                isFullPost
            >
                <ReactMarkdown children={data.text} />
            </Post>

            {comments && comments.status !== 'loading' ? (
                <CommentsBlock
                    items={comments.items?.comments || comments.items || []}
                    isLoading={false}
                >
                    <AddComment user={data.user} />
                </CommentsBlock>
            ) : (
                <CommentsBlock isLoading={true}>
                    <AddComment user={data.user} />
                </CommentsBlock>
            )}
        </>
    );
};
