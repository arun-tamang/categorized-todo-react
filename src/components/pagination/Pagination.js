import React from 'react';

const PageItem = (props) => {
  return (
    <li className={props.currentPage === props.page ? 'active' : ''}>
      <a onClick={() => props.setPage(props.page)}> {props.page} </a>
    </li>
  );
};

export const Pagination = (props) => {
  let pages = Array.from(Array(props.totalPages).keys(), (i) => i + 1);
  // console.log('from pagination', props);
  return (
    <ul className="pagination">
      <li className={props.currentPage === 1 ? 'disabled' : ''}>
        <a onClick={() => props.setPage(1)}> First </a>
      </li>
      <li className={props.currentPage === 1 ? 'disabled' : ''}>
        <a onClick={() => props.setPage(props.currentPage - 1)}> &laquo; Previous </a>
      </li>
      {pages.map((item) => (
        <PageItem
          key={item}
          page={item}
          currentPage={props.currentPage}
          setPage={props.setPage}
        />
      ))}
      <li className={props.currentPage === props.totalPages ? 'disabled' : ''}>
        <a onClick={() => props.setPage(props.currentPage + 1)}> Next &raquo;</a>
      </li>
      <li className={props.currentPage === props.totalPages ? 'disabled' : ''}>
        <a onClick={() => props.setPage(props.totalPages)}> Last </a>
      </li>
    </ul>
  );
};
