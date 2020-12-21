import firebase from 'firebase/app';
import '@firebase/database'

import EGender from '../include/EGender';
import EOrientation from '../include/EOrientation';

const db = firebase.database();
const ref = db.ref('/profiles');

/**
 * Get all profiles and then return the IDs of thoses one to show + their score based on the commons tags (myTags).
 * @param mySex The sex of the current profile
 * @param myOrientation The orrientation of the current profile
 * @param myTags The tags IDs of the current profile
 */
const filterProfiles = async (mySex: EGender, myOrientation: EOrientation, myTags: number[]): Promise<{ key: number, score: number }[]> => {
    //TODO: Move to SAGA ?
    //TODO: Auto get curr profile ? Or pass it in params ?
    const profiles = (await ref.once('value')).val();

    const profilesScore = [];
    let count = 0;

    const calcScore = (profile): number => {
        let commonTags = 0;
        profile.tags.forEach((tagId: number) => {
            if (myTags.includes(tagId)) {
                commonTags++;
            }
        });
        return Math.floor((commonTags / myTags.length) * 100);
    }

    profiles.forEach(profile => {
        const score = calcScore(profile);
        if (score > 10) {
            if (mySex == EGender.NonBinary) {
                if (profile.sex == EGender.NonBinary) {
                    profilesScore.push({ key: count, score });
                }
            }
            else { // Men or Women
                if (myOrientation == EOrientation.Bisexual) {
                    if (profile.orientation == EOrientation.Homosexual) {
                        if (mySex == profile.sex) {
                            profilesScore.push({ key: count, score });
                        }
                    }
                    else if (profile.orientation == EOrientation.Heterosexual) {
                        if (mySex != profile.sex) {
                            profilesScore.push({ key: count, score });
                        }
                    }
                    else { // profile is Bi
                        profilesScore.push({ key: count, score });
                    }
                } else if (myOrientation == EOrientation.Heterosexual) {
                    if (mySex != profile.sex) {
                        if (profile.orientation != EOrientation.Homosexual) {
                            profilesScore.push({ key: count, score });
                        }
                    }
                } else { // if (myOrientation == EOrientation.Homosexual)
                    if (mySex == profile.sex) {
                        if (profile.orientation != EOrientation.Heterosexual) {
                            profilesScore.push({ key: count, score });
                        }
                    }
                }
            }
        }

        count++;
    });
    return profilesScore.sort((a, b) => a.score - b.score);
}

export default filterProfiles;