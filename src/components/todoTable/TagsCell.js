import React from 'react';

export default (props) => {
  return (
    <ul className="table-list">
      {props.tags.map((item, index) => {
        return <li key={String(index)}>{item.name}</li>;
      })}
    </ul>
  );
};
