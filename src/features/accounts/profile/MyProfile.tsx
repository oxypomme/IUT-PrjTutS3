import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHorse, faCalendarAlt, faBuilding, faVenusMars, faVenusDouble, faNeuter, faHelicopter, faMarsDouble, faTransgender } from '@fortawesome/free-solid-svg-icons';

import { fetchCurrProfile, fetchProfiles, getCurrProfile } from '../profileSlice';
import { fetchTags, getAllTags } from '../tagSlice';

import IProfile from '../../../include/IProfile';
import ITag from '../../../include/ITag';
import EGender from '../../../include/EGender';
import EOrientation from '../../../include/EOrientation';

const ProfilePicture = styled.img <{ source?: string }> `
    width: 200px;
    height: 280px;
    border: 2px solid var(--accent1);
    background-color: var(--accent2);
    background-image: url(${props => props.source || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Ornithorhynchus.jpg/290px-Ornithorhynchus.jpg"});
    background-repeat: no-repeat;
    background-size: 100% auto;
`


const MyProfile = (): JSX.Element => {
    const dispatch = useDispatch();
    const profile: IProfile = useSelector(getCurrProfile);
    const tags: Array<ITag> = useSelector(getAllTags);
    let genderIcon = faUser;
    let gender = "$gender";
    let orientationIcon = faNeuter;
    let orientation = "$orientation";

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
            orientation = "Autre"
            break;
    }

    return (
        <div>
            <p><FontAwesomeIcon icon={faUser} /> {profile?.name || "[No profile found]"}</p>
            <ProfilePicture source={profile?.imageURL} />
            <p><FontAwesomeIcon icon={faCalendarAlt} /> {profile?.age || "[No profile found]"}</p>
            <p>Genre : <FontAwesomeIcon icon={genderIcon} /> {gender}</p>
            <p>Orientation : <FontAwesomeIcon icon={orientationIcon} /> {orientation}</p>
            <p><FontAwesomeIcon icon={faBuilding} /> {profile?.town || "[No profile found]"}</p>
            <ul>
                {profile?.tags?.map((tag, index) => (
                    <li key={index}>- {tags.find(t => t.value === tag).label}</li>
                ))}
            </ul>
        </div >
    );
}

export default MyProfile;