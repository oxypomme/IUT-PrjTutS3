import firebase from '../../../app/firebase';
import '@firebase/database'

import EGender from '../../../include/EGender';
import EOrientation from '../../../include/EOrientation';
import IProfile from '../../../include/IProfile';

const db = firebase.database();
const Pref = db.ref('/profiles');

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
const filterProfiles = async ({ sex: mySex, orientation: myOrientation, tags: myTags, authId: myProfileId }: IProfile): Promise<{ key: string, score: number }[]> => {
    const profiles = (await Pref.once('value')).val();

    const Mref = db.ref('/matches/').orderByChild('sender').equalTo(myProfileId);
    const matches = (await Mref.once('value')).val();

    const calcScore = (profile) => getScore(profile.tags, myTags);

    const profilesScore = [];
    Object.keys(profiles).forEach((key) => {
        const profile = profiles[key];
        if (myProfileId !== key) {
            const score = calcScore(profile);
            if (score > 10 && (!matches || Object.keys(matches).findIndex(matchId => matches[matchId]?.target === key) === -1)) {
                if (mySex === EGender.NonBinary) {
                    if (profile.sex === EGender.NonBinary) {
                        profilesScore.push({ key, score });
                    }
                }
                else if (profile.sex !== EGender.NonBinary) { // Men or Women
                    if (myOrientation === EOrientation.Bisexual) {
                        if (profile.orientation === EOrientation.Homosexual) {
                            if (mySex === profile.sex) {
                                profilesScore.push({ key, score });
                            }
                        }
                        else if (profile.orientation === EOrientation.Heterosexual) {
                            if (mySex !== profile.sex) {
                                profilesScore.push({ key, score });
                            }
                        }
                        else { // profile is Bi
                            return ({ key, score });
                        }
                    } else if (myOrientation === EOrientation.Heterosexual) {
                        if (mySex !== profile.sex) {
                            if (profile.orientation !== EOrientation.Homosexual) {
                                profilesScore.push({ key, score });
                            }
                        }
                    } else { // if (myOrientation === EOrientation.Homosexual)
                        if (mySex === profile.sex) {
                            if (profile.orientation !== EOrientation.Heterosexual) {
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

export const randomProfile = async ({ sex: mySex, orientation: myOrientation, authId: myProfileId }: IProfile): Promise<string> => {
    const profiles = (await Pref.once('value')).val();

    const Mref = db.ref('/matches/').orderByChild('sender').equalTo(myProfileId);
    const matches = (await Mref.once('value')).val();

    let nbTries = 0;
    let result = undefined;

    do {
        nbTries++;
        const rndId = Math.floor(Math.random() * Math.floor(Object.keys(profiles).length + 1));
        const key = Object.keys(profiles)[rndId];
        const profile = profiles[key];

        if (myProfileId !== key) {
            if ((!matches || Object.keys(matches).findIndex(matchId => matches[matchId]?.target === key) === -1)) {
                if (mySex === EGender.NonBinary) {
                    if (profile.sex === EGender.NonBinary) {
                        result = key
                    }
                }
                else if (profile.sex !== EGender.NonBinary) { // Men or Women
                    if (myOrientation === EOrientation.Bisexual) {
                        if (profile.orientation === EOrientation.Homosexual) {
                            if (mySex === profile.sex) {
                                result = key
                            }
                        }
                        else if (profile.orientation === EOrientation.Heterosexual) {
                            if (mySex !== profile.sex) {
                                result = key
                            }
                        }
                        else { // profile is Bi
                            result = key
                        }
                    } else if (myOrientation === EOrientation.Heterosexual) {
                        if (mySex !== profile.sex) {
                            if (profile.orientation !== EOrientation.Homosexual) {
                                result = key
                            }
                        }
                    } else { // if (myOrientation === EOrientation.Homosexual)
                        if (mySex === profile.sex) {
                            if (profile.orientation !== EOrientation.Heterosexual) {
                                result = key
                            }
                        }
                    }
                }
            }
        }
        if (result || nbTries >= Object.keys(profiles).length) {
            return Object.keys(profiles)[rndId];
        }
    } while (!result);

}

export default filterProfiles;