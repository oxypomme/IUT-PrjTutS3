import EGender from "./EGender";
import EOrientation from "./EOrientation";

interface IProfile {
    age: number;
    desc: string;
    imageURL: string;
    name: string;
    orientation: EOrientation;
    sex: EGender;
    tags: number[];
    town: string;
}

export const instanceOfIProfile = (object: any): object is IProfile => {
    return 'age' in object
        && 'desc' in object
        && 'imageURL' in object
        && 'name' in object
        && 'orientation' in object
        && 'sex' in object
        && 'tags' in object
        && 'town' in object;
}

export default IProfile;