import React from 'react';

export default (props) => {
  let opacity = props.height === 0 ? 0 : 1;

  const handleAddClick = (e) => {
    // console.log('add category name', props.categoryToAdd);
    props.addCategory(props.userId, props.categoryToAdd);
  };

  const handleChange = (e) => {
    props.setCategoryToAdd(e.target.value);
  };

  return (
    <form
      className="form-inline height-transition"
      style={{ margin: '0 auto' }}
    >
      <input
        className="height-transition add-form-category-input"
        type="text"
        placeholder="add category name here..."
        value={props.categoryToAdd}
        onChange={handleChange}
        style={{ height: props.height, opacity }}
      />
      <button
        type="button"
        className="btn btn-primary height-transition"
        onClick={handleAddClick}
        style={{ height: props.height, opacity }}
      >
        Add
      </button>
    </form>
  );
};
