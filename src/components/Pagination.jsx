import React from "react";

function Pagination({ pageCount, onPageChange, previousLabel, nextLabel }) {
  const pageNumbers = [];

  for (let i = 0; i < pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li className="page-item" onClick={() => onPageChange({ selected: 0 })}>
        <button className="page-link">{previousLabel}</button>
      </li>
      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber} className="page-item" onClick={() => onPageChange({ selected: pageNumber })}>
          <button className="page-link">{pageNumber + 1}</button>
        </li>
      ))}
      <li className="page-item" onClick={() => onPageChange({ selected: pageCount - 1 })}>
        <button className="page-link">{nextLabel}</button>
      </li>
    </ul>
  );
}

export default Pagination;
