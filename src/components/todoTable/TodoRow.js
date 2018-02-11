import React from 'react';
import Combobox from 'react-widgets/lib/Combobox';
import 'react-widgets/dist/css/react-widgets.css';
import TagsCell from './TagsCell';
import TitleCell from './TitleCell';

export default (props) => {
  return (
    <tr className="table-row">
      <td>{props.index + 1}</td>
      <td>
        <TitleCell
          editable={props.enableEdit}
          title={props.title}
          editTitle={props.editTitle}
          initiateEdit={props.initiateEdit}
          handleChange={props.handleTitleChange}
          performEdit={props.performEdit}
        />
      </td>
      <td>
        <Combobox
          data={props.completedVals}
          value={String(props.completed)}
          onChange={props.changeCompleted}
          onSelect={props.setCompleted}
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
