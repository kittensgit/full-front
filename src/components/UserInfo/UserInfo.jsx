import React from 'react';
import styles from './UserInfo.module.scss';

import Avatar from '@mui/material/Avatar';

export const UserInfo = ({ avatarUrl, fullName, createdAt }) => {
    const dateObject = new Date(createdAt);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formattedDate = dateObject.toLocaleDateString('en-EN', options);

    return (
        <div className={styles.root}>
            <Avatar
                sx={{ width: '30px', height: '30px' }}
                className={styles.avatar}
                src={`http://localhost:2222${avatarUrl}`}
                alt={fullName}
            />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <span className={styles.additional}>{formattedDate}</span>
            </div>
        </div>
    );
};
