import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHorse, faCalendarAlt, faBuilding, faVenusMars, faVenusDouble, faNeuter, faHelicopter, faMarsDouble, faTransgender, faGenderless } from '@fortawesome/free-solid-svg-icons';

import { fetchCurrProfile, fetchProfile, getAllProfiles, getCurrProfile } from '../profileSlice';
import { fetchTags, getAllTags } from '../tagSlice';

import IProfile from '../../../include/IProfile';
import IComboBoxItem from '../../../include/IComboBoxItem';
import EGender from '../../../include/EGender';
import EOrientation from '../../../include/EOrientation';
import { Button, WaitingForData } from '../../../components/styledComponents';
import { ProfilePicture } from './ProfileComponent';

const Item = styled.li`
    max-width: 850px;
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

    &>ul {
        list-style-type: none;
        padding: 0 15px 0 0;
    }

    &:hover {
        height: 200px;
    }

    &:hover div:last-of-type{
        top: 42.5%;
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

const Buttons = styled.div`
    display: flex;
    position: absolute;
    top: 20%;
    right: 15px;
    transition: top 0.25s;
`;

const Pending = styled.div`
    position: absolute;
    top: 30%;
    right: 30px;
    transition: top 0.25s;
    color: dimgray;
`;

interface ProfileItemProps {
    id: number,
    isPending: boolean,
}

const ProfileItem = ({ id, isPending }: ProfileItemProps): JSX.Element => {
    const profiles: IProfile[] = useSelector(getAllProfiles);
    const profile: IProfile = profiles?.find(p => p.key === id);

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

    return (
        <Item>
            <ImageProfileContainer>
                <ProfilePicture source={profile?.imageURL} />
            </ImageProfileContainer>
            <h2>{profile?.name || <WaitingForData length={16} />}</h2>
            <ul>
                <li><FontAwesomeIcon icon={genderIcon} /> {gender || <WaitingForData length={8} />}</li>
                <li><FontAwesomeIcon icon={orientationIcon} /> {orientation || <WaitingForData length={8} />}</li>
            </ul>
            <ul>
                <li><FontAwesomeIcon icon={faCalendarAlt} /> {profile?.age || <WaitingForData length={2} />} ans</li>
                <li><FontAwesomeIcon icon={faBuilding} /> {profile?.town || <WaitingForData length={14} />}</li>
            </ul>
            {isPending ?
                <Pending>En attente</Pending>
                :
                <Buttons>
                    <CustomButton>Chat</CustomButton>
                    <CustomButton primary>Unmatch</CustomButton>
                </Buttons>
            }
        </Item >
    );
}

export default ProfileItem;