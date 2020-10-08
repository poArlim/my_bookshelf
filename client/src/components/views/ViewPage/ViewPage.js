import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function ViewPage(props) {
    let userFrom = localStorage.getItem('userId');
    let bookTitle = props.match.params.bookTitle;

    const [BookAuthor, setBookAuthor] = useState("");
    const [BookLink, setBookLink] = useState("");
    const [BookReview, setBookReview] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");

    useEffect(() => {
        if(userFrom === null) userFrom = '5f66072386bd0bdcb4ce695a';
        fetchBookDetail();
    }, [])

    const fetchBookDetail = () => {
        axios.post('/api/books/getBookDetail', { userFrom, bookTitle })
        .then(response => {
            if(response.data.success){
                setBookAuthor(response.data.bookDetail[0].bookAuthor);
                setBookLink(response.data.bookDetail[0].bookLink);
                setBookReview(response.data.bookDetail[0].bookReview);
                setThumbnailPath(response.data.bookDetail[0].thumbnailPath);
            } else {
                alert('책 정보를 가져오는데 실패 했습니다.');
            }
        })
    }

    const onCancleHandler = () => {
        props.history.push("/");
    }

    return (
        <body class="bg-light">
            <div class="container">
                <div class="py-5 text-center">
                    <h2>Book View Form</h2>
                    <p class="lead">
                        책의 상세 정보를 담은 페이지 입니다. 수정하고자 하면 "Edit" 버튼을 클릭해 주세요.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-12 order-md-1">
                        <h4 class="mb-3">Book Info</h4>
                        <div class="mb-3">
                            <label for="title">Title <span class="text-muted">책 제목</span></label>
                            <div>{bookTitle}</div>
                        </div>    
                        <div class="mb-3">
                            <label for="author">Author <span class="text-muted">글쓴이</span></label>
                            <div>{BookAuthor}</div>
                        </div>
                        <div class="mb-3">
                            <label for="link">Link <span class="text-muted">링크</span></label>
                            <div>{BookLink}</div>
                        </div>
                        <div class="mb-3">
                            <label for="review">Review <span class="text-muted">리뷰</span></label>
                            <div>{BookReview}</div>
                        </div>


                        <label for="thumbnail">Thumbnail <span class="text-muted">썸네일</span></label>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {ThumbnailPath ?
                            <div>
                                <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                            </div> :
                            <span class="text-muted"> <br /><br /><br /><br />No image</span>
                        }
                        </div>


                        <hr class="mb-4" />
                        <a href={`/edit/${bookTitle}`}>
                            <button type="button" class="btn btn-primary btn-lg btn-block">
                            Edit
                            </button>
                        </a>
                        <button type="button" class="btn btn-secondary btn-lg btn-block" id="btn-cancel" onClick={onCancleHandler}>
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default withRouter(ViewPage);
