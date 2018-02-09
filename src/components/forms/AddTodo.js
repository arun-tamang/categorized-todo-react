import React from 'react';
import DatePicker from 'react-datepicker';
// import { AddButton } from '../buttons/AddButton';
import { AddTagField } from '../fields/AddFormTagField';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-datepicker/dist/react-datepicker.min.css';

// const Fragment = (props) => props.children;

export const AddTodoForm = (props) => {
  let handleTitleChange = (event) => {
    props.setTitleToAdd(event.target.value);
  };

  let handleDateChange = (newDate) => {
    props.setExpDateToAdd(newDate);
  };

  const handleAddTagClick = (id, name) => {
    props.setTagIdsToAdd(id);
    props.setTagNamesToAdd(name);
  };

  let opacity = props.height === 0 ? 0 : 1;
  let tagFieldHeight = props.height === 0 ? 0 : 10;

  return (
    <form
      className="form-inline height-transition"
      style={{ margin: '0 auto' }}
    >
      <input
        className="height-transition add-form-input"
        type="text"
        placeholder="add todo title here..."
        onChange={handleTitleChange}
        value={props.addTitle}
        style={{ height: props.height, opacity }}
      />
      {props.height === 0 ? null : (
        <div className="clearfix">
          <div>
            ExpiryDate:
            <DatePicker
              selected={props.expiryDate}
              onChange={handleDateChange}
              customInput={
                <input
                  className="height-transition add-form-input"
                  style={{ height: props.height / 2, opacity }}
                />
              }
            />
          </div>
        </div>
      )}
      <AddTagField
        activeTagIds={props.activeTagIds}
        tagArray={[...props.availableTags]}
        handleClick={handleAddTagClick}
        style={{ height: tagFieldHeight, opacity }}
      />
      {/* <div className="datepicker-container">
        <DatePicker selected={props.expiryDate} onChange={handleDateChange} />
      </div> */}
      <button
        type="button"
        className="btn btn-primary height-transition"
        onClick={props.handleAddSubmit}
        style={{ height: props.height, opacity }}
      >
        Add
      </button>
    </form>
  );
};
