import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';

import styles from './AddAvatar.module.scss';

const AddAvatar = ({ inputFileRef, handleChangeFile, avatarUrl, register }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`${styles.avatarContainer} ${
                isHovered ? styles.hovered : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Avatar
                src={`http://localhost:2222${avatarUrl}`}
                alt="User Avatar"
                sx={{ width: 100, height: 100 }}
            />
            {isHovered && (
                <>
                    <AddIcon
                        onClick={() => inputFileRef.current.click()}
                        className={styles.addIcon}
                    />
                    <input
                        {...register('avatarUrl')}
                        type="file"
                        ref={inputFileRef}
                        hidden
                        onChange={handleChangeFile}
                    />
                </>
            )}
        </div>
    );
};

export default AddAvatar;
