import React from "react";
import Creatable from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { components, MenuProps } from "react-select";
import { fetchTags, getAllTags } from "../tagSlice";
import { useHistory } from "react-router-dom";
import { Button } from '../../../components/styledComponents';

export interface ITag {
  value: string;
  label: string;
}

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
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const canSubmit = tags;
    if (canSubmit) {
      dispatch(fetchTags());
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
