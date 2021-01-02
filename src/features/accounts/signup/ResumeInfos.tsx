import React from 'react';
import styled from '@emotion/styled';

import { clearNewAccount, getInfos } from '../accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileComponent from '../profile/ProfileComponent';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/styledComponents';
import { createProfile } from '../profileSlice';

const ResumeInfos = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const profile = useSelector(getInfos);

    React.useEffect(() => {
        if (!profile || profile.desc === "" || profile.imageURL === "") {
            alert("Vous n'avez pas rentré tous les champs nécéssaires.")
            history.push('/SignUp/3');
        }
    }, [profile])

    const onSigned = ({ error }) => {
        if (error) {
            alert("ERREUR : " + error.message);
        }
        else {
            alert('Vous êtes inscrits (et connecté).')
            history.push('/index');
        }
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: createProfile.type,
            payload: {
                request: {
                    type: "update",
                    url: "/profiles",
                    params: {},
                }
            },
            onComplete: onSigned
        });


    };

    return (
        <form onSubmit={handleOnSubmit}>
            <ProfileComponent profile={profile} />
            <Button primary>Créer le compte</Button>
        </form>
    );
}

export default ResumeInfos;