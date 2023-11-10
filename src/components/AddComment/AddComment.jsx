import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { fetchAddComments } from '../../redux/slices/posts';

export const AddComment = ({ user }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const { id } = useParams();

    const onSubmit = async () => {
        try {
            const fields = {
                text,
                user,
            };
            await dispatch(fetchAddComments({ postId: id, ...fields }));
            setText('');
        } catch (error) {
            console.warn('Error submitting comment:', error);
            alert('Failed to send comments');
        }
    };

    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{ root: styles.avatar }}
                    src={`http://localhost:2222${user.imageUrl}`}
                />
                <div className={styles.form}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button onClick={onSubmit} variant="contained">
                        Отправить
                    </Button>
                </div>
            </div>
        </>
    );
};
