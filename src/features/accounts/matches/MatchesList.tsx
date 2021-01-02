import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import ProfileItem from '../profile/ProfileItem';
import IProfile from '../../../include/IProfile';

import { getAllProfiles, getCurrProfile } from '../profileSlice';

import { fetchMatches, getAllMatches } from './matchesSlice';
import { Separator, WaitingForData } from '../../../components/styledComponents';
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

const MyMatches = (): JSX.Element => {
    const dispatch = useDispatch();
    const currProfile: IProfile | Record<string, never> = useSelector(getCurrProfile);
    const profiles: IProfile[] = useSelector(getAllProfiles);
    const matches: IMatch = useSelector(getAllMatches);

    React.useEffect(() => {
        try {
            dispatch(fetchMatches());
        } catch (error) {
            console.log(error);
        }
    }, [currProfile]);

    const Profiles = (props: { isPending?: boolean }): JSX.Element => {
        let { isPending } = props;
        if (isPending == undefined) {
            isPending = false;
        }

        return (
            <ProfileList>
                {
                    matches ?
                        Object.keys(matches).sort((a, b) => getScore((profiles.find(p => p.authId == b))?.tags, currProfile.tags) - getScore((profiles.find(p => p.authId == a))?.tags, currProfile.tags))
                            .map((target, index) =>
                                matches[target]?.isPending == isPending ?
                                    <ProfileItem key={index} id={target} isPending={matches[target].isPending} />
                                    : <></>)
                        : <WaitingForData length={16} />
                }
            </ProfileList>
        )
    }

    return (
        <div>
            <Profiles />
            <Separator />
            <Profiles isPending={true} />
        </div >
    );
}

export default MyMatches;