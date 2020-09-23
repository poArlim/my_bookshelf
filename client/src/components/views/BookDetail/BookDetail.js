import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function BookDetail(props) {
    let userFrom = localStorage.getItem('userId');
    let bookTitle = props.match.params.bookTitle;

    const [Book, setBook] = useState([]);

    useEffect(() => {
        fetchBookDetail();
    }, [])

    const fetchBookDetail = () => {
        axios.post('/api/books/getBookDetail', { userFrom: localStorage.getItem('userId'), bookTitle })
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
                props.history.push("/");
            }
            else {
                alert('Book 리스트에서 지우는 것을 실패했습니다.');
            }
        })
    }

    const renderBook = Book.map((book, index) => {
        return (
            <React.Fragment key={index}>
                <div class="card bg-light w-100">
                    <div class="card-header"><h4>{book.bookTitle}</h4></div>
                    <div class="card-body">
                        <h5 class="card-title">{book.bookReview ? `"${book.bookReview}"` : null}</h5>
                        <p class="card-text">글쓴이 : {book.bookAuthor}</p>
                        <p class="card-text">링크 : <a href={`${book.bookLink}`} target="_BLANK">바로 가기</a></p>
                        <a href={`/edit/${bookTitle}`} class="btn btn-primary btn-sm">Edit</a>
                        <button type="button" class="btn btn-danger btn-sm" id="btn-delete" onClick={onClickDelete}>Delete</button>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">작성일 : {new Date(
                        book.createdAt,
                        ).toLocaleString()}</small>
                    </div>
                </div>
            </React.Fragment>
    )})

    return (
        <div class="album py-5 bg-light">
            <div class="container">
                <div class="card bg-light w-100">
                    <div class="card-header">
                        {renderBook}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(BookDetail);
