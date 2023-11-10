import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../axios';
import { fetchPostComments } from '../redux/slices/posts';

import { Post } from '../components/Post/Post';
import { AddComment } from '../components/AddComment/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
    const dispatch = useDispatch();
    const { comments } = useSelector((state) => state.posts);
    const { data } = useSelector((state) => state.auth);

    const [postData, setPostData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setPostData(res.data);
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
                id={postData._id}
                title={postData.title}
                imageUrl={postData.imageUrl}
                user={postData.user}
                createdAt={postData.createdAt}
                viewsCount={postData.viewsCount}
                commentCount={postData.commentCount}
                tags={postData.tags}
                isFullPost
            >
                <ReactMarkdown children={postData.text} />
            </Post>

            {comments && comments.status !== 'loading' ? (
                <CommentsBlock
                    items={comments.items?.comments || comments.items || []}
                    isLoading={false}
                >
                    <AddComment user={data.userData} />
                </CommentsBlock>
            ) : (
                <CommentsBlock isLoading={true}>
                    <AddComment user={data.userData} />
                </CommentsBlock>
            )}
        </>
    );
};
