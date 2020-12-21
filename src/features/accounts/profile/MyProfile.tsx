import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHorse, faCalendarAlt, faBuilding, faVenusMars, faVenusDouble, faNeuter, faHelicopter, faMarsDouble, faTransgender, faGenderless } from '@fortawesome/free-solid-svg-icons';

import { fetchCurrProfile, fetchProfiles, getCurrProfile } from '../profileSlice';
import { fetchTags, getAllTags } from '../tagSlice';

import IProfile from '../../../include/IProfile';
import ITag from '../../../include/ITag';
import EGender from '../../../include/EGender';
import EOrientation from '../../../include/EOrientation';
import { WaitingForData } from '../../../components/styledComponents';

const ProfilePicture = styled.div <{ source?: string }> `
    width: 100%;
    min-width: 300px;
    height: 700px;
    border: 2px solid var(--accent1);
    background-color: var(--accent2);
    background-image: url(${props => props.source || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Ornithorhynchus.jpg/290px-Ornithorhynchus.jpg"});
    background-repeat: no-repeat;
    background-size: 100% auto;
`

const Profile = styled.div`
    border: 1px solid #888888;
    background-color: var(--background2);
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    & > div {
        flex-grow: 2;
        box-sizing: border-box;

        &:last-child {
            flex-grow: 1;
            padding: 10px;
        }
    }

    & * {
        text-align: left;
    }
`

const MyProfile = (): JSX.Element => {
    const dispatch = useDispatch();
    const profile: IProfile = useSelector(getCurrProfile);
    const tags: Array<ITag> = useSelector(getAllTags);
    let genderIcon = faUser;
    let gender = null;
    let orientationIcon = faNeuter;
    let orientation = null;

    React.useEffect(() => {
        dispatch(fetchTags());
        dispatch(fetchProfiles());
        dispatch(fetchCurrProfile());
    }, [dispatch]);

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
        <Profile>
            <div>
                <ProfilePicture source={profile?.imageURL} />
            </div>
            <div>
                <p><FontAwesomeIcon icon={faUser} /> {profile?.name || <WaitingForData length={16} />}</p>
                <p><FontAwesomeIcon icon={faCalendarAlt} /> {profile?.age || <WaitingForData length={2} />} ans</p>
                <p>Genre : <FontAwesomeIcon icon={genderIcon} /> {gender || <WaitingForData length={8} />}</p>
                <p>Orientation : <FontAwesomeIcon icon={orientationIcon} /> {orientation || <WaitingForData length={8} />}</p>
                <p><FontAwesomeIcon icon={faBuilding} /> {profile?.town || <WaitingForData length={16} />}</p>
                <ul>
                    {profile?.tags?.map((tag, index) => (
                        <li key={index}>{tags.find(t => t.value === tag).label}</li>
                    ))}
                </ul>
            </div>
        </Profile>
    );
}

export default MyProfile;