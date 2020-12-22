import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WaitingForData } from '../../../components/styledComponents';
import IProfile from '../../../include/IProfile';

import filterProfiles from '../../../tests/FilterProfiles';
import { fetchProfile, getAllProfiles, getCurrProfile, getCurrProfileId } from '../profileSlice';

const SelectionProfiles = (): JSX.Element => {
    const dispatch = useDispatch();
    const [profilesToShow, setProfilesToShow] = useState<Array<{ key: number, score: number }>>();
    const [loading, setLoading] = useState<boolean | null>(false);
    const { sex: mySex, orientation: myOrientation, tags: myTags } = useSelector(getCurrProfile);
    const myProfileId = useSelector(getCurrProfileId);

    const profiles: IProfile[] = useSelector(getAllProfiles);

    React.useEffect(() => {
        (async function getProfiles() {
            try {
                setLoading(true);
                if (mySex != undefined) {
                    const profiles = await filterProfiles(mySex, myOrientation, myTags, myProfileId);
                    //setProfilesToShow(profiles);
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
            {loading ? profilesToShow?.map((element, index) => (
                "Loaded"//<Profile key={index} id={element} />
            )) : (loading == null ? 'ERROR, see console for more info' : <WaitingForData length={16} />)}
            {profiles ? profiles.map((element, index) => (
                <p key={index}>Name: {element.name}</p>
            )) : <WaitingForData length={16} />}
        </div>
    );
}

export default SelectionProfiles;