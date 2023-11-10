import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from '../../redux/slices/posts';
import clsx from 'clsx';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';

export const Post = ({
    id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    commentCount,
    tags,
    children,
    isFullPost,
    isLoading,
    isEditable,
}) => {
    const dispatch = useDispatch();

    if (isLoading) {
        return <PostSkeleton />;
    }

    const onClickRemove = () => {
        if (window.confirm('Do you really want to delete article?')) {
            dispatch(fetchRemovePost(id));
        }
    };

    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${id}/edit`}>
                        <IconButton color="primary">
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            {imageUrl && (
                <img
                    className={clsx(styles.image, {
                        [styles.imageFull]: isFullPost,
                    })}
                    src={`http://localhost:2222${imageUrl}`}
                    alt={title}
                />
            )}
            <div className={styles.wrapper}>
                <UserInfo {...user} createdAt={createdAt} />
                <div className={styles.indention}>
                    <h2
                        className={clsx(styles.title, {
                            [styles.titleFull]: isFullPost,
                        })}
                    >
                        {isFullPost ? (
                            title
                        ) : (
                            <Link to={`/posts/${id}`}>{title}</Link>
                        )}
                    </h2>
                    <ul className={styles.tags}>
                        {tags.map((name) => (
                            <li key={name}>
                                <Link to={`/tags/${name}`}>#{name}</Link>
                            </li>
                        ))}
                    </ul>
                    {children && (
                        <div className={styles.content}>{children}</div>
                    )}
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon />
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon />
                            <span>{commentCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
