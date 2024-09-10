import React from 'react'
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

 const Pagination = ( { onPageChange , value} ) => {
  return (
    <ReactPaginate
      className={styles.root}
        breakLabel={value}
        nextLabel=">"
        onPageChange={(event) => onPageChange(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={value - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
  )
}

export default Pagination;
