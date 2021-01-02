import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import ProfileItem from '../profile/ProfileItem';
import IProfile, { instanceOfIProfile } from '../../../include/IProfile';

import { fetchArrayProfile, fetchProfile, getAllProfiles, getCurrProfile } from '../profileSlice';

import { fetchMatches, getAllMatches } from './matchesSlice';
import { Separator, WaitingForData } from '../../../components/styledComponents';
import { fetchTags, getAllTags } from '../tagSlice';
import { getScore } from '../../../tests/FilterProfiles';

const ProfileList = styled.ul`
    list-style-type: none;
    padding: 0 40px;

    &>li {
        margin: 5px;
    }
`;

interface IMatch {
    [target: string]: {
        isBlocked: boolean,
        isPending: boolean
    }
}

const MyMatches = (props: any): JSX.Element => {
    const dispatch = useDispatch();
    const currProfile: IProfile | Record<string, never> = useSelector(getCurrProfile);
    const matches: IMatch = useSelector(getAllMatches);

    React.useEffect(() => {
        try {
            dispatch(fetchMatches());
        } catch (error) {
            console.log(error);
        }
    }, [currProfile]);

    return (
        <div>
            <ProfileList>
                {matches ? Object.keys(matches).map((target, index) => matches[target]?.isPending == false ? <ProfileItem key={index} id={target} isPending={matches[target].isPending} /> : '') : <WaitingForData length={16} />}
            </ProfileList>
            <Separator />
            <ProfileList>
                {matches ? Object.keys(matches).map((target, index) => matches[target]?.isPending == true ? <ProfileItem key={index} id={target} isPending={matches[target].isPending} /> : '') : <WaitingForData length={16} />}
            </ProfileList>
        </div>
    );
}

export default MyMatches;