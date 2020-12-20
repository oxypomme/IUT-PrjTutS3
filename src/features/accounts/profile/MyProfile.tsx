import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import styled from '@emotion/styled';
import { Button, TextBox, HiddenLabel, ErrorLabel } from '../../../components/styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { fetchCurrProfile, fetchProfiles, getAllProfiles, getCurrProfile, IProfile } from '../profileSlice';

const MyProfile = (): JSX.Element => {
    const dispatch = useDispatch();
    const profile: IProfile = useSelector(getCurrProfile);

    React.useEffect(() => {
        dispatch(fetchCurrProfile());
    }, [dispatch]);

    return (
        <p>{profile?.name}</p>
    );
}

export default MyProfile;