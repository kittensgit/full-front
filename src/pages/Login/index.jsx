import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { fetchAuth } from '../../redux/slices/auth';

export const Login = () => {
    const dispatch = useDispatch();

    // react-hook-form
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (values) => {
        dispatch(fetchAuth(values));
    };

    // validation
    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type="email"
                    fullWidth
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
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                >
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
