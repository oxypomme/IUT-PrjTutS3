import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArrayProfile, getCurrProfile } from '../profileSlice';
import { getOutgoingMatches } from '../matches/matchesSlice';

import { WaitingForData } from '../../../components/styledComponents';
import IProfile, { instanceOfIProfile } from '../../../include/IProfile';
import filterProfiles from './FilterProfiles';

import ProfileCard from '../profile/ProfileCard';

const ProfilesContainer = styled.div`
    & > div {
        margin: 10px auto;
    }
`;

const SelectionProfiles = (): JSX.Element => {
    const dispatch = useDispatch();
    const [matchableKeys, setKeys] = React.useState<string[]>();
    const [loading, setLoading] = React.useState<boolean | null>(false);
    const currProfile: IProfile | Record<string, never> = useSelector(getCurrProfile);
    const matches = useSelector(getOutgoingMatches);

    React.useEffect(() => {
        (async function getProfiles() {
            try {
                setLoading(true);

                if (instanceOfIProfile(currProfile)) {
                    const profs = await filterProfiles(currProfile);
                    console.log("[DEBUG] Matchables :", profs);
                    const keys = profs.map(profile => profile.key);
                    setKeys(keys);
                    if (keys?.length > 0) {
                        dispatch(fetchArrayProfile(keys));
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(null);
            }
        })();
    }, [currProfile, matches]);

    return (
        <ProfilesContainer>
            {!loading ? matchableKeys?.map((authId, index) => (
                <ProfileCard id={authId} key={index} />
            )) : (loading == null ? 'ERROR, see console for more info' : <WaitingForData length={16} />)}
        </ProfilesContainer>
    );
}

export default SelectionProfiles;