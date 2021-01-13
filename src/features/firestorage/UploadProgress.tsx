import React from 'react';
import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import ProgressBar from '@ramonak/react-progress-bar';
import { useAlert } from 'react-alert';

import { cancelUpload, getStorageProgress, getStorageWorking } from '../firestorage/storageSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ProgressContainer = styled.div<{ isShowing?: boolean }>`
    width: 100%;
    background: #333;
    opacity: 0.75;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    visibility: ${props => props.isShowing ? "visible" : "hidden"};
    display: flex;

    & > * {
        flex: 0.95;
    }

    & > svg {
        margin-top: 2px;
        flex: 0.05;
    }
    & > svg:hover {
        cursor: pointer;
    }
`;

const UploadProgress = (): JSX.Element => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const storageWorkState = useSelector(getStorageWorking);
    const uploadProgress = useSelector(getStorageProgress);

    const handleCancelUpload = (event) => {
        event.preventDefault();
        dispatch(cancelUpload());
        alert.info("Envoi annulé");
    }

    return (
        <ProgressContainer isShowing={storageWorkState}>
            <ProgressBar
                completed={uploadProgress}
                bgcolor={"var(--accent2)"}
                baseBgColor={"transparent"}
                borderRadius={"0"}
                height={"10px"}
                margin={"5px"}
                labelSize={"0"}
            />
            <FontAwesomeIcon
                icon={faTimes}
                color={"white"}
                tabIndex={0}
                onClick={handleCancelUpload}
            />
        </ProgressContainer>
    );
}

export default UploadProgress;