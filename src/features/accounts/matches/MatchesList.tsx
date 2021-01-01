import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import ProfileItem from '../profile/ProfileItem';
import IProfile, { instanceOfIProfile } from '../../../include/IProfile';

import { fetchArrayProfile, fetchProfile, getAllProfiles, getCurrProfile } from '../profileSlice';

import { fetchMatches, getAllMatches } from './matchesSlice';
import { WaitingForData } from '../../../components/styledComponents';
import { fetchTags, getAllTags } from '../tagSlice';
import { getScore } from '../../../tests/FilterProfiles';

const ProfileList = styled.ul`
    list-style-type: none;
    padding: 0 40px;

    &>li {
        margin: 5px;
    }
`;

interface Match {
    isPending: boolean,
    target: number,
}

const MyMatches = ({ pendingList = false, forceUpdate = true }: any): JSX.Element => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState<boolean | null>(false);
    const currProfile: IProfile | Record<string, never> = useSelector(getCurrProfile);
    const profiles: IProfile[] = useSelector(getAllProfiles);

    const matches: Match[] = useSelector(getAllMatches);

    React.useEffect(() => {
        try {
            if (!forceUpdate)
                return;

            setLoading(true);

            if (instanceOfIProfile(currProfile)) {
                if (matches?.length <= 0) {
                    dispatch(fetchMatches());
                }
                else if (matches?.length > 0) {
                    // Matches can be an array of match...
                    dispatch(fetchArrayProfile(matches.map(({ target }) => target)));
                } else if (matches) {
                    // or a somewhat object if there's only one match
                    dispatch(fetchProfile(parseInt(Object.keys(matches)[0])));
                }
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(null);
        }
    }, [currProfile, matches, dispatch]);

    return (
        <ProfileList>
            {!loading && matches ?
                (matches.length > 0 ? matches.slice().sort(
                    (a, b) => getScore(profiles?.find(p => p.key === b.target)?.tags, currProfile.tags)
                        - getScore(profiles?.find(p => p.key === a.target)?.tags, currProfile.tags)
                ).map((match, index) =>
                    (match.isPending == pendingList ? <ProfileItem key={index} id={match.target} isPending={match.isPending} /> : '')) // Matches can be an array of match or a somewhat object if there's only one match
                    : (matches[Object.keys(matches)[0]]?.isPending == pendingList ? <ProfileItem key={parseInt(Object.keys(matches)[0])} id={matches[Object.keys(matches)[0]]?.target} isPending={matches[Object.keys(matches)[0]]?.isPending} /> : '')
                )
                : <WaitingForData length={16} />}
        </ProfileList>
    );
}

export default MyMatches;