import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import ProfileItem from '../profile/ProfileItem';
import IProfile, { instanceOfIProfile } from '../../../include/IProfile';

import { fetchArrayProfile, getCurrProfile } from '../profileSlice';

import { fetchMatches, getAllMatches } from './matchesSlice';
import { WaitingForData } from '../../../components/styledComponents';
import { fetchTags, getAllTags } from '../tagSlice';

const ProfileList = styled.ul`
    list-style-type: none;
    padding: 0 40px;

    &>li {
        margin: 5px;
    }
`;

interface Match {
    isPending: boolean,
}

const MyMatches = (): JSX.Element => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState<boolean | null>(false);
    const currProfile: IProfile | Record<string, never> = useSelector(getCurrProfile);

    const matches: Match[] = useSelector(getAllMatches);
    const tags: string[] = useSelector(getAllTags);

    React.useEffect(() => {
        try {
            setLoading(true);

            if (instanceOfIProfile(currProfile)) {
                if (matches?.length <= 0) {
                    dispatch(fetchMatches());
                }
                else if (matches?.length > 0) {
                    dispatch(fetchArrayProfile(matches.map((match, index) => index)))
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
            {!loading && matches ? matches.map((match, index) =>
                <ProfileItem key={index} id={index} isPending={match.isPending} />
            ) : <WaitingForData length={16} />}
        </ProfileList>
    );
}

export default MyMatches;