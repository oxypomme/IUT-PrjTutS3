import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import '@firebase/auth';

import { getInfos } from '../accountSlice';
import ProfileComponent from '../profile/ProfileComponent';
import { Button, ButtonFlex } from '../../../components/styledComponents';
import { createProfile, getProfileWork } from '../profileSlice';
import CheckBox from '../../../components/CheckBox';
import UploadProgress from '../../firestorage/UploadProgress';
import LoadContainer from '../../../components/LoadContainer';

const ResumeInfos = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const profile = useSelector(getInfos);
    const isWorking = useSelector(getProfileWork);
    const [persistence, setPersistence] = React.useState<boolean>(false);

    const handlePersistanceChange = (event) => setPersistence(event.target.checked);

    React.useEffect(() => {
        if (!profile || !profile.desc || !profile.imageURL) {
            alert.error("Vous n'avez pas rentré tous les champs nécéssaires");
            history.push('/SignUp/3');
        }
    }, [profile])

    const handleOnSubmit = (event) => {
        event.preventDefault();
        firebase.auth().setPersistence(persistence ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
            .then(() =>
                dispatch(
                    createProfile(({ error }) => {
                        if (error) {
                            alert.error(error.message);
                        }
                        else {
                            alert.success('Vous êtes inscrit (et connecté)')
                            history.push('/');
                        }
                    })
                )
            )
            .catch((error) => {
                alert.error(error.message);
            });
    };

    const handleBack = (event) => {
        event.preventDefault();
        history.push('/SignUp/3');
    };

    return (
        <div>
            <LoadContainer isShowing={isWorking} loadIcon>
                <UploadProgress />
            </LoadContainer>
            <ProfileComponent profile={profile} />
            <ButtonFlex>
                <Button onClick={handleBack}>Retour</Button>
                <div>
                    <Button primary onClick={handleOnSubmit}>Créer le compte</Button>

                    <CheckBox
                        content="Rester connecté"
                        onChange={handlePersistanceChange}
                    ></CheckBox>
                </div>
            </ButtonFlex>
        </div>
    );
}

export default ResumeInfos;