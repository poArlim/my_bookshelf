import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function EditPage(props) {
    let userFrom = localStorage.getItem('userId');
    let bookTitle = props.match.params.bookTitle;

    const [BookTitle, setBookTitle] = useState("");
    const [BookAuthor, setBookAuthor] = useState("");
    const [BookLink, setBookLink] = useState("");
    const [BookReview, setBookReview] = useState("");

    const onBookTitleHandler = (event) => {
        setBookTitle(event.currentTarget.value);
    };
    const onBookAuthorHandler = (event) => {
        setBookAuthor(event.currentTarget.value);
    };
    const onBookLinkHandler = (event) => {
        setBookLink(event.currentTarget.value);
    };
    const onBookReviewHandler = (event) => {
        setBookReview(event.currentTarget.value);
    };

    useEffect(() => {
        fetchBookDetail();
    }, [])

    const fetchBookDetail = () => {
        axios.post('/api/books/getBookDetail', { userFrom: localStorage.getItem('userId'), bookTitle })
        .then(response => {
            console.log(response.data.bookDetail.bookTitle);
            if(response.data.success){
                setBookTitle(response.data.bookDetail[0].bookTitle);
                setBookAuthor(response.data.bookDetail[0].bookAuthor);
                setBookLink(response.data.bookDetail[0].bookLink);
                setBookReview(response.data.bookDetail[0].bookReview);
            } else {
                alert('책 정보를 가져오는데 실패 했습니다.');
            }
        })
    }

    const onSubmitHandler = () => {
        let variables = {
            userFrom,
            originTitle: bookTitle,
            bookTitle: BookTitle,
            bookAuthor: BookAuthor,
            bookLink: BookLink,
            bookReview: BookReview
        }
        axios.post('/api/books/editBook', variables)
            .then(response => {
                console.log(response.data);
                if(response.data.success){
                    alert('책 정보가 성공적으로 수정되었습니다.');
                    props.history.push("/");
                }
                else {
                    alert('책 정보 수정에 실패했습니다.');
                }
            })
    }

    const onCancleHandler = () => {
        props.history.push("/");
    }

    return (
        <div class="container">
        <div class="py-5 text-center">
            <h2>Book Save Form</h2>
            <p class="lead">
                수정하고자 하는 책의 정보를 수정한 후 "Save" 버튼을 눌러 저장을 완료하여 주세요.
            </p>
        </div>

        <div class="row">
            <div class="col-md-12 order-md-1">
                <h4 class="mb-3">Book Edit</h4>
                <form id="form-edit-book" class="needs-validation" novalidate>
                    <div class="mb-3">
                        <label for="title">Title <span class="text-muted">책 제목</span></label>
                        <input
                            type="text"
                            class="form-control"
                            id="title"
                            placeholder="책 제목을 입력하세요"
                            value={BookTitle}
                            required
                            onChange={onBookTitleHandler}
                        />
                    </div>    
                    <div class="mb-3">
                        <label for="author">Author <span class="text-muted">글쓴이</span></label>
                        <input
                            type="text"
                            class="form-control"
                            id="author"
                            placeholder="글쓴이를 입력하세요"
                            value={BookAuthor}
                            required
                            onChange={onBookAuthorHandler}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="link">Link <span class="text-muted">링크</span></label>
                        <input
                            type="text"
                            class="form-control"
                            id="url"
                            placeholder="URL 을 입력하세요"
                            value={BookLink}
                            required
                            onChange={onBookLinkHandler}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="review">Review <span class="text-muted">리뷰</span></label>
                        <input
                            type="text"
                            class="form-control"
                            id="message"
                            placeholder="감상평을 입력하세요"
                            value={BookReview}
                            required
                            onChange={onBookReviewHandler}
                        />
                    </div>
                    <hr class="mb-4" />
                    <button type="button" class="btn btn-primary btn-lg btn-block" onClick={onSubmitHandler}>
                    Save
                    </button>
                    <button type="button" class="btn btn-secondary btn-lg btn-block" id="btn-cancel" onClick={onCancleHandler}>
                    Cancel
                    </button>
                </form>
            </div>
        </div>

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2019 Marktube</p>
        </footer>
        </div>
    )
}

export default withRouter(EditPage);
