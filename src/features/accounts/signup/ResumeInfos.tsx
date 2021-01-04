import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import firebase from 'firebase/app';
import '@firebase/auth';

import { getInfos } from '../accountSlice';
import ProfileComponent from '../profile/ProfileComponent';
import { Button, ButtonFlex } from '../../../components/styledComponents';
import { createProfile } from '../profileSlice';
import CheckBox from '../../../components/CheckBox';


const ResumeInfos = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const profile = useSelector(getInfos);
    const [persistence, setPersistence] = React.useState<boolean>(false);

    const handlePersistanceChange = (event) => setPersistence(event.target.checked);

    React.useEffect(() => {
        if (!profile || profile.desc === "" || profile.imageURL === "") {
            alert.error("Vous n'avez pas rentré tous les champs nécéssaires");
            history.push('/SignUp/3');
        }
    }, [profile])

    const onSigned = ({ error }) => {
        if (error) {
            alert.error(error.message);
        }
        else {
            alert.success('Vous êtes inscrit (et connecté)')
            history.push('/');
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
                alert.error(error.message);
            });
    };

    const handleBack = (event) => {
        event.preventDefault();
        history.goBack()
    };

    return (
        <form>
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
        </form>
    );
}

export default ResumeInfos;