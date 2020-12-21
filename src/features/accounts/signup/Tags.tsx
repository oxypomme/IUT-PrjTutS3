import React from "react";
import Creatable from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, getAllTags } from "../tagSlice";
import { useHistory } from "react-router-dom";
import { Button, Spacer } from '../../../components/styledComponents';
import { addTag } from "../accountSlice";

import ITag from "../../../include/ITag";

export const Tags = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tags: Array<ITag> = useSelector(getAllTags);

    const [selectedTags, setSelectedTags] = React.useState<Array<ITag>>();

    React.useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const canSubmit = selectedTags?.length >= 3; // minimum of 3 selected tags
        if (canSubmit) {
            dispatch(addTag(selectedTags.map((tag) => tag.value)))
            history.push('SignUp/3');
        }
    }
    const isValidNewOption = (inputValue) => inputValue.length > 0;

    return (
        <form onSubmit={handleOnSubmit}>
            <Creatable
                isMulti
                isSearchable={true}
                isClearable={true}
                isValidNewOption={isValidNewOption}
                onChange={(mytags) => setSelectedTags(mytags as ITag[])}
                options={tags}
            />
            <Button>Suivant</Button>
        </form>
    );
};
