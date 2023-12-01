// Pagination.js
import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  hasNextPage,
}) => (
  <div className="pagination">
    <div style={{ padding: "5px" }}>
      Page {currentPage} of {totalPages}
    </div>
    <button className="first-page" onClick={() => handlePageChange(1)}>First Page</button>
    <button className="previous-page" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>

                {/* Display buttons for each page */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            borderColor: currentPage === index + 1 ? '#000' : '#808080', 
                            color: currentPage === index + 1 ? '#000' : '#808080', 
                            fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="next-page" onClick={() => handlePageChange(currentPage + 1)} disabled={!hasNextPage}>Next Page</button>
                <button className="last-page" onClick={() => handlePageChange(totalPages)}>Last Page</button>
            </div>

  
);

export default Pagination;
