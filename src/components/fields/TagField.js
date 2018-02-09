import React from 'react';
// import '../../styles/.css';
import '../../styles/checkbox-fancy.css';

const TagItem = (props) => {
  return (
    <li>
      <input
        className='fancy'
        type="checkbox"
        onClick={() => props.handleClick(props.name)}
        value={props.name}
      />
      {/* <label htmlFor={props.name}>{props.name}</label> */}
       {props.name}
    </li>
  );
};

export const TagField = (props) => {
  // console.log(props.tagArray);
  const handleClick = (name) => {
    props.handleCheckBoxClick(name);
  };
  return (
    <fieldset>
      <legend>Tags</legend>
      <ul className="tag-list">
        {props.tagArray.map((tagItem) => (
          <TagItem
            key={tagItem.id}
            handleClick={handleClick}
            name={tagItem.name}
          />
        ))}
      </ul>
    </fieldset>
  );
};
