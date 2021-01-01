import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import { WaitingForData } from '../../../components/styledComponents';
import IProfile, { instanceOfIProfile } from '../../../include/IProfile';

import filterProfiles from '../../../tests/FilterProfiles';
import ProfileCard from '../profile/ProfileCard';
import { fetchArrayProfile, getAllProfiles, getCurrProfile } from '../profileSlice';
import { fetchTags } from '../tagSlice';

const ProfilesContainer = styled.div`
    & > div {
        margin: 10px auto;
    }
`;

const SelectionProfiles = (): JSX.Element => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState<boolean | null>(false);
    const currProfile: IProfile | Record<string, never> = useSelector(getCurrProfile);

    const profiles: IProfile[] = useSelector(getAllProfiles);

    React.useEffect(() => {
        (async function getProfiles() {
            try {
                setLoading(true);

                if (instanceOfIProfile(currProfile)) {
                    const profs = await filterProfiles(currProfile.sex, currProfile.orientation, currProfile.tags, currProfile.key);
                    console.log("[DEBUG] Matchables :", profs);
                    if (profs?.length > 0) {
                        dispatch(fetchTags());
                        dispatch(fetchArrayProfile(profs.map(profile => profile.key)));
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(null);
            }
        })();
    }, [currProfile, dispatch]);

    return (
        <ProfilesContainer>
            {!loading ? profiles?.map(({ key }, index) => (
                <ProfileCard id={key} key={index} />
            )) : (loading == null ? 'ERROR, see console for more info' : <WaitingForData length={16} />)}
        </ProfilesContainer>
    );
}

export default SelectionProfiles;