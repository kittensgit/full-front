import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Registration.module.scss';
import AddAvatar from '../../components/AddAvatar/AddAvatar';

import axios from '../../axios';

export const Registration = () => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const inputFileRef = useRef(null);

    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('/upload', formData);
            console.log(data);
            if (data) {
                setAvatarUrl(data.url);
            }
        } catch (error) {
            console.log(error);
            alert('Failed to upload photo!');
        }
    };

    // react-hook-form
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    useEffect(() => {
        setValue('avatarUrl', avatarUrl);
    }, [avatarUrl, setValue]);

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));
        if (!data.payload) {
            return alert('Failed to register');
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to={'/'} />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <AddAvatar
                    inputFileRef={inputFileRef}
                    handleChangeFile={handleChangeFile}
                    avatarUrl={avatarUrl}
                    register={register}
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="Полное имя"
                    fullWidth
                    helperText={errors.fullName?.message}
                    error={Boolean(errors.fullName?.message)}
                    {...register('fullName', { required: 'Enter full name' })}
                />
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Enter email' })}
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    fullWidth
                    helperText={errors.password?.message}
                    error={Boolean(errors.password?.message)}
                    {...register('password', { required: 'Enter password' })}
                />
                <Button
                    disabled={!isValid}
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};
