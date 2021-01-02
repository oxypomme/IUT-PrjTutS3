import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import ProfileItem from '../profile/ProfileItem';
import IProfile from '../../../include/IProfile';

import { getAllProfiles, getCurrProfile } from '../profileSlice';

import { fetchMatches, getIngoingMatches, getOutgoingMatches } from './matchesSlice';
import { Separator, WaitingForData } from '../../../components/styledComponents';
import { getScore } from '../../../tests/FilterProfiles';

const ProfileList = styled.ul`
    list-style-type: none;
    padding: 0 40px;
    width: fit-content;
    margin: 15px auto;

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
    const matches: IMatch = useSelector(getOutgoingMatches);
    const inMatches: IMatch = useSelector(getIngoingMatches);

    React.useEffect(() => {
        try {
            dispatch(fetchMatches());
        } catch (error) {
            console.log(error);
        }
    }, [currProfile]);

    const compScore = (authId: string) => getScore((profiles.find(p => p.authId == authId))?.tags, currProfile.tags)

    const Profiles = (props: { isPending?: boolean }): JSX.Element => {
        let { isPending } = props;
        if (isPending == undefined) {
            isPending = false;
        }

        return (
            <ProfileList>
                {
                    matches ?
                        Object.keys(matches).sort((a, b) => compScore(b) - compScore(a))
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
            <Separator />
            <ProfileList>
                {
                    inMatches ?
                        Object.keys(inMatches).sort((a, b) => compScore(b) - compScore(a))
                            .map((target, index) =>
                                inMatches[target]?.isPending == true ?
                                    <ProfileItem key={index} id={target} inviting />
                                    : <></>)
                        : <WaitingForData length={16} />
                }
            </ProfileList>
        </div >
    );
}

export default MyMatches;