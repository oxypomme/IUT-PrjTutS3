import React from 'react';
import styled from '@emotion/styled';
import { getInfos } from '../accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileComponent from '../profile/ProfileComponent';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/styledComponents';

const ResumeInfos = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const profile = useSelector(getInfos);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (!profile ||
            profile.age === 0 ||
            profile.desc === "" ||
            profile.imageURL === "" ||
            // profile.mail === "" || // TODO check if mail is specified
            // profile.passwd === "" || // TODO check if passwd is specified
            profile.name === "" ||
            profile.orientation === 0 ||
            profile.gender === 0 ||
            profile.tags.length < 3 ||
            profile.town === ""
        ) {
            console.log("error");
        }
        else {
            console.log("should create account");
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