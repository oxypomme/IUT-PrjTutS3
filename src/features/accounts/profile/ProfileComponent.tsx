import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHorse, faCalendarAlt, faBuilding, faVenusMars, faVenusDouble, faNeuter, faHelicopter, faMarsDouble, faTransgender, faGenderless, faMale, faFemale } from '@fortawesome/free-solid-svg-icons';

import firebase from 'firebase/app';
import '@firebase/auth';

import { getAllTags } from '../tagSlice';

import IProfile from '../../../include/IProfile';
import ITag from '../../../include/IComboBoxItem';
import EGender from '../../../include/EGender';
import EOrientation from '../../../include/EOrientation';

import { Button, WaitingForData } from '../../../components/styledComponents';
import { newMatch, updateMatch } from '../matches/matchesSlice';
import { deleteProfile, updateProfile } from '../profileSlice';

export const ProfilePicture = styled.img <{ source?: string }> `
    width: 100%;
    height: 100%;
    background-color: var(--background1);
    background: url(${props => props.source || ""});
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    box-sizing: border-box;
`

const Profile = styled.div`
    position: relative;
    border: 1px solid #888888;
    background-color: var(--background2);
    min-height: 80vh;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;

    & > div {
        box-sizing: border-box;

        &:not(:last-child) {
            border-right: 1px solid #888888;
        }

        &:first-of-type {
            width: 60%;
        }
        &:last-of-type {
            padding: 10px;
            width: 40%;
            text-align: left;

            & > h1 {
                margin: 0;
            }
        }
    }
`

const Infos = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    color: #444444;

    & > li {
        margin: 0;
        padding: 0;
    }
`

const Tags = styled.ul`
    list-style-type: none;
    padding: 0;

    & > li {
        margin: 0;
        padding: 0;
    }
    & > li {
        padding: 0 4px;
    }
`

const ButtonContainer = styled.div`
    width: 390px;
    display:flex;
    position: absolute;
    bottom: 10px;

    &>button{
        margin-right: 10px;
    }
`;

type PropsType = {
    profile: IProfile,
    isMatchable?: boolean,
    isDeletable?: boolean,
    handleEditProfile?: (event: React.SyntheticEvent) => void;
}

const ProfileComponent = ({ profile, isMatchable, isDeletable, handleEditProfile }: PropsType): JSX.Element => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const tags: Array<ITag> = useSelector(getAllTags);

    let genderIcon = faUser;
    let gender = null;
    let orientationIcon = faNeuter;
    let orientation = null;

    switch (profile?.sex) {
        case EGender.NonBinary:
            genderIcon = faGenderless;
            gender = "Non-binaire";
            break;
        case EGender.Men:
            genderIcon = faMale;
            gender = "Homme";
            break;
        case EGender.Women:
            genderIcon = faFemale;
            gender = "Femme";
            break;
        default:
            break;
    }

    switch (profile?.orientation) {
        case EOrientation.Bisexual:
            orientationIcon = faTransgender;
            orientation = "Bisexuel"
            break;
        case EOrientation.Homosexual:
            orientationIcon = profile?.sex === EGender.Men ? faMarsDouble : faVenusDouble;
            orientation = "Homosexuel"
            break;
        case EOrientation.Heterosexual:
            orientationIcon = faVenusMars;
            orientation = "Hétérosexuel"
            break;
        default:
            break;
    }

    const handleSkip = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(newMatch(profile.authId, true));
    }
    const handleMatch = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(newMatch(profile.authId));
    }
    const handleDelete = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const user = firebase.auth().currentUser;
        if (window.confirm("Voulez-vous vraiment supprimer votre compte ? 😭")) {
            const passwd = window.prompt("(re)tapez votre mot de passe :");
            if (passwd) {
                user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, passwd)).then(() => {
                    dispatch(
                        deleteProfile(({ error }) => {
                            if (error) {
                                alert.error(error.message);
                            }
                            else {
                                alert.success('Vous avez bien supprimé votre compte')
                                history.push('/');
                            }
                        })
                    );
                }).catch((error) => {
                    alert.error(error.message)
                });
            } else {
                alert.error("Mot de passe vide... Action annulée...")
            }
        }
    }

    return (
        <Profile>
            <div>
                <ProfilePicture source={profile?.imageURL} />
            </div>
            <div>
                <h1>{profile?.name || <WaitingForData length={16} />}</h1>
                <Infos>
                    <li><FontAwesomeIcon icon={faCalendarAlt} /> {profile?.age || <WaitingForData length={2} />} ans</li>
                    <li><FontAwesomeIcon icon={genderIcon} /> {gender || <WaitingForData length={8} />}</li>
                    <li><FontAwesomeIcon icon={orientationIcon} /> {orientation || <WaitingForData length={8} />}</li>
                    <li><FontAwesomeIcon icon={faBuilding} /> {profile?.town || <WaitingForData length={16} />}</li>
                </Infos>
                <p>{profile?.desc || <WaitingForData length={32} />}</p>

                <p>Tags :</p>
                <Tags>
                    {profile?.tags?.map((tag: number, index: number) => (
                        <li key={index}>- {tags.find(t => t.value === tag)?.label}</li>
                    )) || <WaitingForData length={16} />}
                </Tags>
                {isMatchable ?
                    <ButtonContainer>
                        <Button onClick={handleSkip}>Skip</Button>
                        <Button onClick={handleMatch} primary>Match</Button>
                    </ButtonContainer>
                    : <></>}

                {isDeletable ?
                    <ButtonContainer>
                        <Button onClick={handleEditProfile}>Modifier le compte</Button>
                        <Button onClick={handleDelete} danger style={{ width: "100%" }}>Supprimer le compte</Button>
                    </ButtonContainer>
                    : <></>
                }
            </div>
        </Profile>
    );
}

export default ProfileComponent;