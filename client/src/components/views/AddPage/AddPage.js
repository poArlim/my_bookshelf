import React, { useState } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function Add(props) {

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

    const onSubmitHandler = () => {
        let userFrom = localStorage.getItem('userId');

        Axios.post('/api/book/addBook', 
        {userFrom: userFrom, bookTitle: BookTitle, bookAuthor: BookAuthor, bookLink: BookLink, bookReview: BookReview})
            .then(response => {
                if(response.data.success){
                    alert('책이 성공적으로 추가되었습니다.');
                    props.history.push("/");
                }
                else {
                    alert('책 정보를 리스트에 추가하는 것을 실패했습니다.');
                }
            })
    }

    return (
    <body class="bg-light">
        <div class="container">
            <div class="py-5 text-center">
                <h2>Book Save Form</h2>
                <p class="lead">
                새로 추가하고자 하는 책의 정보를 아래 형식에 맞추어서 입력하여 주세요.
                </p>
            </div>
            <div class="row">
                <div class="col-md-12 order-md-1">
                    <h4 class="mb-3">Book Info</h4>
                    <form id="form-add-book" class="needs-validation" novalidate>
                        <div class="mb-3">
                        <label for="title">Title <span class="text-muted">책 제목</span></label>
                        <input
                            type="text"
                            class="form-control"
                            id="title"
                            placeholder="책 제목을 입력하세요"
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
                            required
                            onChange={onBookReviewHandler}
                        />
                        </div>
                        <hr class="mb-4" />
                        <button class="btn btn-primary btn-lg btn-block" type="button" onClick={onSubmitHandler}>Save</button>
                    </form>
                </div>
            </div>
        </div>      
    </body>
    )
}

export default withRouter(Add);
