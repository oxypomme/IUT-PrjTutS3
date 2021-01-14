import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import IProfile, { instanceOfIProfile } from '../../../include/IProfile';
import { randomProfile } from './FilterProfiles';

import { fetchArrayProfile, fetchProfile, getCurrProfile } from '../profileSlice';
import { newMatch } from '../matches/matchesSlice';

import ProfileCard from '../profile/ProfileCard';
import { Button, ButtonFlex, WaitingForData } from '../../../components/styledComponents';

const Error = styled.p`
    text-align: center;
`;

const SurpriseMatch = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [profId, setProfId] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean | null>(false);
    const currProfile: IProfile | Record<string, never> = useSelector(getCurrProfile);

    const findMatch = React.useCallback(() => {
        (async () => {
            try {
                setLoading(true);

                if (instanceOfIProfile(currProfile)) {
                    const prof = await randomProfile(currProfile);
                    setProfId(prof);
                    if (prof) {
                        dispatch(fetchProfile(prof));
                        dispatch(newMatch(prof));
                    }

                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(null);
            }
        })();
    }, []);

    React.useEffect(() => {
        if (!profId) {
            findMatch();
        }
    }, [currProfile]);

    const handleBack = (event: React.SyntheticEvent) => {
        event.preventDefault();
        history.push('/matches');
    }

    const handleRestart = (event: React.SyntheticEvent) => {
        event.preventDefault();
        findMatch();
    }

    return (
        <div>
            {!loading ?
                (profId ? <ProfileCard id={profId} isMatchableOverride={false} /> : <Error>Aucun profil trouvé... Visiblement, vous connaissez tout le monde 😅.</Error>)
                : (loading === null ? 'ERROR, see console for more info' : <WaitingForData length={16} />)}
            <ButtonFlex>
                <Button onClick={handleBack}>Mes Matchs</Button>
                <Button primary onClick={handleRestart}>Recommencer</Button>
            </ButtonFlex>
        </div>
    );
}

export default SurpriseMatch;