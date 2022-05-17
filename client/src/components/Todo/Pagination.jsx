import React from 'react';

const Pagination = ({countPages, totalResult, paginate, nextPage, prevPage}) => {

    const pageNumber = [];
    for(let i = 1; i<= Math.ceil(totalResult / countPages); i++) {
        pageNumber.push(i)
    }
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous" onClick={prevPage}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {
                    pageNumber.map(number => (
                        <li className="page-item" key={number} onClick={() => paginate(number)}>
                            <a href="#" className="page-link">
                                {number}
                            </a>
                        </li>
                    ))
                }
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next" onClick={nextPage}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
