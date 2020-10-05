import React from 'react';
import Axios from 'axios';

import '../../../css/LandingPage.css';

function Cards(props) {
    const userFrom = props.userFrom;
    const bookTitle = props.bookTitle;

    const onClickDelete = () => {
        let variables = {
            userFrom,
            bookTitle
        }

        Axios.post('/api/books/removeBook', variables)
        .then(response => {
            if(response.data.success){
                window.location.reload('false');
            }
            else {
                alert('Book 리스트에서 지우는 것을 실패했습니다.');
            }
        })
    }

    return (
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
                <p class="card-text">{bookTitle === '' ? '제목 없음' : bookTitle}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    <a href={`/book/id=${bookTitle}`}>
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
                        onClick={onClickDelete}
                    >
                        Delete
                    </button>
                    </div>
                    <small class="text-muted">{new Date(
                    props.createdAt,
                    ).toLocaleString()}</small>
                </div>
            </div>
        </div>
    )
}

export default Cards;