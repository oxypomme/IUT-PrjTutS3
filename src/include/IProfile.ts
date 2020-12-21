import EGender from "./EGender";
import EOrientation from "./EOrientation";

interface IProfile {
    age: number,
    desc: string,
    imageURL: string,
    name: string,
    orientation: EOrientation,
    sex: EGender,
    tags: string[],
    town: string
}

export default IProfile;