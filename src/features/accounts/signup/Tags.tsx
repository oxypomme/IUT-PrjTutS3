import React from "react";

import Creatable from "react-select";
import { components, MenuProps } from "react-select";
import { useDispatch } from 'react-redux';

export interface ITag { value: string, label: string; }

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

    const [selectedTags, setSelectedTags] = React.useState<Array<ITag>>();


    React.useEffect(() => {
        dispatch({
            type: 'FETCH_TAGS_REQUESTED'
        });
    }, [0]);

    const tags = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'chocolat2e', label: 'Chocolate2' },
        { value: 'strawberry2', label: 'Strawberry2' },
        { value: 'vanilla2', label: 'Vanilla2' },
        { value: '3chocolate', label: 'Chocolate' },
        { value: '3strawberry', label: 'Strawberry' },
        { value: '3vanilla', label: 'Vanilla' },
        { value: '3chocolat2e', label: 'Chocolate2' },
        { value: '3strawberry2', label: 'Strawberry2' },
        { value: '3vanilla2', label: 'Vanilla2' }
    ] as ITag[]

    const isValidNewOption = (inputValue, selectValue) =>
        inputValue.length > 0 && selectValue.length < 5;

    return (

        <form>
            <Creatable
                components={{ Menu }}
                isMulti
                isSearchable={true}
                isClearable={true}
                menuIsOpen={true}
                isValidNewOption={isValidNewOption}
                onChange={mytags => setSelectedTags(mytags as ITag[])}
                options={tags}
            />
        </form>
    );
}