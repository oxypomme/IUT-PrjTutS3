import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WaitingForData } from '../../../components/styledComponents';
import IProfile, { instanceOfIProfile } from '../../../include/IProfile';

import filterProfiles from '../../../tests/FilterProfiles';
import ProfileCard from '../profile/ProfileCard';
import { fetchProfile, getAllProfiles, getCurrProfile } from '../profileSlice';

const SelectionProfiles = (): JSX.Element => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean | null>(false);
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
                        profs.forEach(({ key }) => {
                            dispatch(fetchProfile(key));
                        });
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(null);
            }
        })();
    }, []);

    return (
        <div>
            {!loading ? profiles?.map(({ key }, index) => (
                //<ProfileCard key={index} id={key} />
                <p key={index}>{key}</p>
            )) : (loading == null ? 'ERROR, see console for more info' : <WaitingForData length={16} />)}
        </div>
    );
}

export default SelectionProfiles;