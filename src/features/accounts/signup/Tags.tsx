import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, getAllTags } from "../tagSlice";
import { useHistory } from "react-router-dom";
import { Button, Spacer } from '../../../components/styledComponents';
import { addTag } from "../accountSlice";

import IComboBoxItem from '../../../include/IComboBoxItem';
import Select from "react-select";

export const Tags = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tags: Array<IComboBoxItem> = useSelector(getAllTags);

    const [selectedTags, setSelectedTags] = React.useState<Array<IComboBoxItem>>();

    React.useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const canSubmit = selectedTags?.length >= 3; // minimum of 3 selected tags
        if (canSubmit) {
            dispatch(addTag(selectedTags.map((tag) => tag.value)))
            history.push('/SignUp/3');
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <Select
                isMulti
                isSearchable={true}
                isClearable={true}
                onChange={(mytags) => setSelectedTags(mytags as IComboBoxItem[])}
                options={tags}
                placeholder="Sélectionnez vos tags"
                closeMenuOnSelect={false}
            />
            <Button>Suivant</Button>
        </form>
    );
};
