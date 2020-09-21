import React from 'react';
import { Col } from 'antd';

function Books(props) {
    return (
        // <Col lg={6} md={8} xs={24}>
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <svg class="bd-placeholder-img card-img-top" 
                    width="100%" height="225" 
                    xmlns="http://www.w3.org/2000/svg" 
                    preserveAspectRatio="xMidYMid slice" 
                    focusable="false" 
                    role="img" 
                    aria-label="Placeholder: Thumbnail">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"/>
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                </svg>
                <div class="card-body">
                    <p class="card-text">${book.title === '' ? '제목 없음' : book.title}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <a href="./book.html?id=${book.bookId}">
                            <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                            >
                            View
                            </button>
                        </a>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary btn-delete"
                            data-book-id="${book.bookId}"
                        >
                            Delete
                        </button>
                        </div>
                        <small class="text-muted">${new Date(
                        book.createdAt,
                        ).toLocaleString()}</small>
                    </div>
                </div>
            </div>
        </div>
            {/* </div>
            <div style={{ position: 'relative' }}>
                <a href={`/movie/${props.movieId}`} >
                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
                </a>
            </div> */}
        {/* </Col> */}
    )
}

export default Books;