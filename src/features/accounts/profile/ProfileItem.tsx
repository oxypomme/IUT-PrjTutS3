import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHorse, faCalendarAlt, faBuilding, faVenusMars, faVenusDouble, faNeuter, faHelicopter, faMarsDouble, faTransgender, faGenderless } from '@fortawesome/free-solid-svg-icons';

import { getAllProfiles } from '../profileSlice';

import IProfile from '../../../include/IProfile';
import EGender from '../../../include/EGender';
import EOrientation from '../../../include/EOrientation';

import { Button, WaitingForData } from '../../../components/styledComponents';
import { ProfilePicture } from './ProfileComponent';
import { deleteMatch, newMatch, updateMatch } from '../matches/matchesSlice';

const Item = styled.li`
    width: 850px;
    display:flex;
    flex-direction: row;
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    height: 42px;
    transition: height 0.25s;
    position: relative;

    &>*{
        margin: auto 0;
    }

    &>h2{
        width: 30%;
    }

    & ul {
        list-style-type: none;
        padding: 0 15px 0 0;
    }

    & li {
        transition: padding 0.125s;
        width: 115px;
    }

    &:hover {
        height: 200px;
    }

    &:hover div:last-of-type{
        top: 42.5%;
    }

    &:hover li {
        padding: 4px 0;
    }
    
    &:hover > p {
        top: 45%;
    }
`;

const CustomButton = styled(Button)`
    width: 100%;
    margin: 0 5px;
`;

const ImageProfileContainer = styled.div`
    width: 15%;
    margin: 0;
    margin-right: 15px;
`;

const InfoList = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    height: 100%;
`;

const Buttons = styled.div`
    display: flex;
    position: absolute;
    top: 20%;
    right: 15px;
    transition: top 0.25s;

    & > button{
        min-width: 75px;
    }
`;

const StatusText = styled.p`
    position: absolute;
    top: 30%;
    right: 110px;
    transition: top 0.25s;
    color: dimgray;
`;

interface ProfileItemProps {
    id: number | string,
    match: string,
    isPending?: boolean,
    inviting?: boolean,
    isBlocked?: boolean
}

const ProfileItem = ({ id, isPending, inviting, isBlocked, match }: ProfileItemProps): JSX.Element => {
    const dispatch = useDispatch();

    const profiles: IProfile[] = useSelector(getAllProfiles);
    const profile: IProfile = profiles?.find(p => p.authId === id);

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
            genderIcon = faHorse; // faMale
            gender = "Poney"; //Homme
            break;
        case EGender.Women:
            genderIcon = faHelicopter; // faFemale
            gender = "Hélicoptère"; //Femme
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

    const handleChat = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("//TODO");
    }

    const handleUnmatch = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(deleteMatch(match));
    }

    const handleDenyInvite = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(updateMatch(match, profile.authId));
    }

    const handleAcceptInvite = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(newMatch(profile.authId));
    }

    return (
        <Item>
            <ImageProfileContainer>
                <ProfilePicture source={profile?.imageURL} />
            </ImageProfileContainer>
            <h2>{profile?.name || <WaitingForData length={16} />}</h2>
            <InfoList>
                <ul>
                    <li><FontAwesomeIcon icon={genderIcon} /> {gender || <WaitingForData length={8} />}</li>
                    <li><FontAwesomeIcon icon={orientationIcon} /> {orientation || <WaitingForData length={8} />}</li>
                </ul>
                <ul>
                    <li><FontAwesomeIcon icon={faCalendarAlt} /> {profile?.age || <WaitingForData length={2} />} ans</li>
                    <li><FontAwesomeIcon icon={faBuilding} /> {profile?.town || <WaitingForData length={14} />}</li>
                </ul>
            </InfoList>
            {isPending ? <StatusText>En attente</StatusText> : isBlocked ? <StatusText>Bloqué</StatusText> : <></>}
            <Buttons>
                {!isPending && !isBlocked ? (inviting ? <CustomButton onClick={handleDenyInvite}>Refuser</CustomButton> : <CustomButton onClick={handleChat}>Chat</CustomButton>) : <></>}
                {!isPending && !isBlocked ? (inviting ? <CustomButton primary onClick={handleAcceptInvite}>Accepter</CustomButton> : <></>) : <></>}
                {!inviting ? <CustomButton primary={!isBlocked} onClick={handleUnmatch}>{!isBlocked ? "Annuler" : "Débloquer"}</CustomButton> : <></>}
            </Buttons>
        </Item >
    );
}

export default ProfileItem;