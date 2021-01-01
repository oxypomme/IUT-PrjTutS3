import React from 'react';
import styled from '@emotion/styled';
import { createAccount, getInfos, getNewAuth } from '../accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileComponent from '../profile/ProfileComponent';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/styledComponents';
import { createProfile } from '../profileSlice';

const ResumeInfos = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const profile = useSelector(getInfos);
    const auth = useSelector(getNewAuth);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (!profile ||
            !auth ||
            auth.passwd === "" || // TODO check if passwd is specified
            auth.email === "" || // TODO check if mail is specified
            profile.age === 0 ||
            profile.desc === "" ||
            profile.imageURL === "" ||
            profile.name === "" ||
            profile.orientation === 0 ||
            profile.gender === 0 ||
            profile.tags.length < 3 ||
            profile.town === ""
        ) {
            alert("Vous n'avez pas rentré tous les champs nécéssaires.")
            history.push('/login');
        }
        else {
            console.log("should create account");
            // dispatch(createAccount());
            dispatch(createProfile());
        }

    };

    return (
        <form onSubmit={handleOnSubmit}>
            <ProfileComponent profile={profile} />
            <Button primary>Créer le compte</Button>
        </form>
    );
}

export default ResumeInfos;