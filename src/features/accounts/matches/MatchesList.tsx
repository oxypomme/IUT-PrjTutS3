import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import ProfileItem from '../profile/ProfileItem';
import IProfile from '../../../include/IProfile';

import { getAllProfiles, getCurrProfile } from '../profileSlice';

import { getIngoingMatches, getOutgoingMatches } from './matchesSlice';
import { Separator } from '../../../components/styledComponents';
import { getScore } from '../selection/FilterProfiles';

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
        key: string
    }
}

const MyMatches = (): JSX.Element => {
    const currProfile: IProfile | Record<string, never> = useSelector(getCurrProfile);
    const profiles: IProfile[] = useSelector(getAllProfiles);
    const outMatches: IMatch = useSelector(getOutgoingMatches);
    const inMatches: IMatch = useSelector(getIngoingMatches);

    const compScore = (authId: string) => getScore((profiles.find(p => p.authId === authId))?.tags, currProfile.tags)

    const Profiles = (props: { isPending?: boolean }): JSX.Element => {
        let { isPending } = props;
        if (isPending === undefined) {
            isPending = false;
        }

        return (
            <ProfileList>
                {
                    outMatches && inMatches ?
                        Object.keys(outMatches).sort((a, b) => compScore(b) - compScore(a))
                            .filter((target) => (!(outMatches[target] && inMatches[target]) === isPending) && !outMatches[target]?.isBlocked)
                            .map((target, index) =>
                                <ProfileItem key={index} id={target} match={outMatches[target]?.key} isPending={isPending} />
                            )
                        : <></>
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
                            .filter((target) => inMatches[target] && !(outMatches && outMatches[target]))
                            .map((target, index) =>
                                <ProfileItem key={index} id={target} match={inMatches[target]?.key} inviting />
                            )
                        : <></>
                }
            </ProfileList>
            <Separator />
            <ProfileList>
                {
                    outMatches ?
                        Object.keys(outMatches).sort((a, b) => compScore(b) - compScore(a))
                            .filter((target) => (outMatches[target]?.isBlocked))
                            .map((target, index) =>
                                <ProfileItem key={index} id={target} match={outMatches[target]?.key} isBlocked />
                            )
                        : <></>
                }
            </ProfileList>
        </div >
    );
}

export default MyMatches;