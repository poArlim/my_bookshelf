import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../../../css/ViewPage.css';
import SERVER_URL from '../../Config';

function ViewPage(props) {
    let userFrom = localStorage.getItem('userId');
    let bookTitle = props.match.params.bookTitle;

    const [Book, setBook] = useState([]);

    useEffect(() => {
        if(userFrom === null) userFrom = '5f66072386bd0bdcb4ce695a';
        fetchBookDetail();
    }, [])

    const fetchBookDetail = () => {
        axios.post('/api/books/getBookDetail', { userFrom, bookTitle })
        .then(response => {
            if(response.data.success){
                setBook(response.data.bookDetail);
            } else {
                alert('책 정보를 가져오는데 실패 했습니다.');
            }
        })
    }

    const onClickDelete = () => {
        let variables = {
            userFrom,
            bookTitle
        }

        axios.post('/api/books/removeBook', variables)
        .then(response => {
            if(response.data.success){
                if(response.data.isRead) props.history.push('/');
                else props.history.push('/toread')
                window.location.reload('false');
            }
            else {
                alert('Book 리스트에서 지우는 것을 실패했습니다(권한이 없습니다).');
            }
        })
    }

    return (
        <div class="album py-5 bg-light">
            <div class="container">
                <div class="card_column bg-light">
                    {Book && Book.map((book, index) => (
                        <React.Fragment key={index}>
                            <img src={`${SERVER_URL}${book.thumbnailPath}`}></img>
                            <div class="card_row">
                                <div class="card-body">
                                    <h4>{book.bookTitle}</h4>
                                    <small class="text-muted">작성일 : {new Date(
                                    book.createdAt,
                                    ).toLocaleString()}</small>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">글쓴이 : {book.bookAuthor}</p>
                                    <p class="card-text">링크 : <a href={`${book.bookLink}`} target="_BLANK">바로 가기</a></p>
                                    <pre><h6 class="card-title">{book.bookReview ? `${book.bookReview}` : null}</h6></pre>
                                    <a href={`/edit/${bookTitle}`} class="btn btn-primary btn-sm">Edit</a>
                                    <button type="button" class="btn btn-danger btn-sm" id="btn-delete" onClick={onClickDelete}>Delete</button>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default withRouter(ViewPage);
