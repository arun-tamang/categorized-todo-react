import React from 'react';
import Combobox from 'react-widgets/lib/Combobox';
import 'react-widgets/dist/css/react-widgets.css';
import TagsCell from './TagsCell';
import TitleCell from './TitleCell';

const completedVals = [true, false];

export default (props) => {
  const setCompleted = (value) => {
    if (completedVals.indexOf(value) !== -1) {
      props.setTodoCompleted(value, props.id);
    }
  };

  const changeCompleted = (value) => {
    props.changeCompleted(value, props.id);
  };

  // console.log('type of completed', typeof(props.completed));

  return (
    <tr className="table-row">
      <td>{props.index + 1}</td>
      <td>
        <TitleCell
          editable={props.enableEdit}
          title={props.title}
          editTitle={props.editTitle}
          id={props.id}
          initiateEdit={props.initiateEdit}
          handleChange={props.handleTitleChange}
          performEdit={props.performEdit}
        />
      </td>
      <td>
        <Combobox
          data={completedVals}
          value={String(props.completed)}
          onChange={changeCompleted}
          onSelect={setCompleted}
          filter="contains"
        />
      </td>
      <td>
        <TagsCell tags={props.tags} />
      </td>
      <td>{props.createdAt}</td>
      <td>{props.expiresAt}</td>
    </tr>
  );
};
