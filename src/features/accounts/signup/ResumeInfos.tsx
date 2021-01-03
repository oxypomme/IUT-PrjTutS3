import React from 'react';

import { getInfos } from '../accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProfileComponent from '../profile/ProfileComponent';
import { useHistory } from 'react-router-dom';
import { Button, ButtonFlex } from '../../../components/styledComponents';
import { createProfile } from '../profileSlice';
import CheckBox from '../../../components/CheckBox';
import firebase from 'firebase';


const ResumeInfos = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const profile = useSelector(getInfos);
    const [persistence, setPersistence] = React.useState<boolean>(false);

    const handlePersistanceChange = (event) => setPersistence(event.target.checked);

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
        firebase.auth().setPersistence(persistence ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
            .then(() =>
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
                })
            )
            .catch((error) => {
                alert("ERREUR : " + error.message);
            });
    };

    const handleBack = (event) => history.goBack();

    return (
        <form onSubmit={handleOnSubmit}>
            <ProfileComponent profile={profile} isMatchable={false} />
            <ButtonFlex>
                <Button onClick={handleBack}>Retour</Button>
                <div>
                    <Button primary>Créer le compte</Button>
                    <CheckBox
                        content="Rester connecté"
                        onChange={handlePersistanceChange}
                    ></CheckBox>
                </div>
            </ButtonFlex>
        </form>
    );
}

export default ResumeInfos;