import EGender from "./EGender";
import EOrientation from "./EOrientation";

class ProfileClass {
    age: number;
    desc: string;
    imageURL: string;
    name: string;
    orientation: EOrientation;
    sex: EGender;
    tags: string[];
    town: string;
}

export default ProfileClass;