import firebase from 'firebase/app';
import '@firebase/database'

import EGender from '../include/EGender';
import EOrientation from '../include/EOrientation';
import IProfile from '../include/IProfile';

const db = firebase.database();
const ref = db.ref('/profiles');

/**
 * Get the tag score between 2 profiles
 * @param profile The profile to compare with my tags
 * @param myTags my tags
 */
export const getScore = (profTags: number[], myTags: number[]): number => {
    let commonTags = 0;
    if (profTags) {
        profTags.forEach((tagId: number) => {
            if (myTags.includes(tagId)) {
                commonTags++;
            }
        });
        return Math.floor((commonTags / myTags.length) * 100);
    }
    return -1;
}

/**
 * Get all profiles and then return the IDs of thoses one to show + their score based on the commons tags (myTags).
 * @param mySex The sex of the current profile
 * @param myOrientation The orrientation of the current profile
 * @param myTags The tags IDs of the current profile
 * @param myProfileId The id to exclude
 */
const filterProfiles = async (mySex: EGender, myOrientation: EOrientation, myTags: number[], myProfileId: number): Promise<{ key: number, score: number }[]> => {
    //TODO: Move to SAGA ?
    const profiles = (await ref.once('value')).val();

    const profilesScore = [];

    const calcScore = (profile) => getScore(profile.tags, myTags);

    profiles.forEach((profile: IProfile, key: number) => {
        if (myProfileId != key) {
            const score = calcScore(profile);
            if (score > 10) {
                if (mySex == EGender.NonBinary) {
                    if (profile.sex == EGender.NonBinary) {
                        profilesScore.push({ key, score });
                    }
                }
                else { // Men or Women
                    if (myOrientation == EOrientation.Bisexual) {
                        if (profile.orientation == EOrientation.Homosexual) {
                            if (mySex == profile.sex) {
                                profilesScore.push({ key, score });
                            }
                        }
                        else if (profile.orientation == EOrientation.Heterosexual) {
                            if (mySex != profile.sex) {
                                profilesScore.push({ key, score });
                            }
                        }
                        else { // profile is Bi
                            profilesScore.push({ key, score });
                        }
                    } else if (myOrientation == EOrientation.Heterosexual) {
                        if (mySex != profile.sex) {
                            if (profile.orientation != EOrientation.Homosexual) {
                                profilesScore.push({ key, score });
                            }
                        }
                    } else { // if (myOrientation == EOrientation.Homosexual)
                        if (mySex == profile.sex) {
                            if (profile.orientation != EOrientation.Heterosexual) {
                                profilesScore.push({ key, score });
                            }
                        }
                    }
                }
            }
        }
    });
    return profilesScore.sort((a, b) => b.score - a.score);
}

export default filterProfiles;