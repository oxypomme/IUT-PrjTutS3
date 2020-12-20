import React from "react";
import Creatable from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { components, MenuProps } from "react-select";
import { fetchTags, getAllTags } from "../tagSlice";
import { useHistory } from "react-router-dom";
import { Button } from '../../../components/styledComponents';
import { addTag } from "../accountSlice";
import { ITag } from "../../../include/ITag";

const Menu = (props: MenuProps<ITag, true>) => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
        <components.Menu {...props}>
            {optionSelectedLength < 5 ? ( //? max amount of selectable props
                props.children
            ) : (
                    <div style={{ margin: 15 }}>Max limit achieved</div>
                )}
        </components.Menu>
    );
};

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
        const canSubmit = selectedTags.length > 0; // minimum of 1 selected tags
        if (canSubmit) {
            dispatch(addTag(selectedTags.map((tag) => tag.value)))
            history.push('SignUp/3');
        }
    }
    const isValidNewOption = (inputValue, selectValue) =>
        inputValue.length > 0 && selectValue.length < 5;

    return (
        <form onSubmit={handleOnSubmit}>
            <Creatable
                components={{ Menu }}
                isMulti
                isSearchable={true}
                isClearable={true}
                menuIsOpen={true}
                isValidNewOption={isValidNewOption}
                onChange={(mytags) => setSelectedTags(mytags as ITag[])}
                options={tags}
            />
            <Button>Suivant</Button>
        </form>
    );
};
