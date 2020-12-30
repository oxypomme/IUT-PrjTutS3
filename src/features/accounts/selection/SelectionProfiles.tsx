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

    const profile: IProfile[] = useSelector(getAllProfiles);

    React.useEffect(() => {
        (async function getProfiles() {
            try {
                setLoading(true);

                if (instanceOfIProfile(currProfile)) {
                    const profiles = await filterProfiles(currProfile.sex, currProfile.orientation, currProfile.tags, currProfile.key);
                    if (profiles?.length > 0) {
                        profiles.forEach(({ key }) => {
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
            {!loading ? profile?.map(({ key }, index) => (
                <ProfileCard key={index} id={key} />
            )) : (loading == null ? 'ERROR, see console for more info' : <WaitingForData length={16} />)}
        </div>
    );
}

export default SelectionProfiles;