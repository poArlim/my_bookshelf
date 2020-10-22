import React, { useState } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {SERVER_URL} from '../../Config';


function AddToReadPage(props) {
    const [BookTitle, setBookTitle] = useState("");
    const [BookAuthor, setBookAuthor] = useState("");
    const [BookLink, setBookLink] = useState("");
    const [BookReview, setBookReview] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");

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
        
        Axios.post('/api/books/duplicateCheck', { userFrom: userFrom, bookTitle: BookTitle })
            .then(response => {
                if(response.data.isDuplicate){
                    return alert('이미 추가되어 있는 책입니다.');
                }
                else {
                    Axios.post('/api/books/addBook', 
                    { userFrom: userFrom, bookTitle: BookTitle, bookAuthor: BookAuthor, bookLink: BookLink, bookReview: BookReview, thumbnailPath: ThumbnailPath, isRead: false })
                        .then(response => {
                            if(response.data.success){
                                alert('책이 성공적으로 추가되었습니다.');
                                props.history.push("/toread");
                            }
                            else {
                                alert('책 정보를 리스트에 추가하는 것을 실패했습니다.');
                            }
                        })
                }
            })
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);

        Axios.post('/api/books/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success) {
                    Axios.post('/api/books/resizefiles', {url: response.data.url})
                        .then(response => {
                            if(response.data.success) {
                                setThumbnailPath(response.data.url);
                            }
                            else return alert('이미지 리사이징을 실패했습니다.');
                        })
                } else {
                    alert('이미지 업로드를 실패했습니다.');
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
                <h2>Book Save Form</h2>
                <p class="lead">
                <strong>읽을 책</strong>에 새로 추가하고자 하는 책의 정보를 아래 형식에 맞추어서 입력하여 주세요.
                </p>
            </div>
            <div class="row">
                <div class="col-md-12 order-md-1">
                    <h4 class="mb-3">Book Info</h4>
                    <form id="form-add-book" class="needs-validation" novalidate acceptCharset="UTF-8">
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
                            <textarea
                                style={{height: "300px"}}
                                class="form-control"
                                id="message"
                                placeholder="감상평을 입력하세요"
                                required
                                onChange={onBookReviewHandler}
                            />
                        </div>

                        <label for="thumbnail">Thumbnail <span class="text-muted">썸네일</span></label>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Dropzone 
                        onDrop={onDrop} 
                        multiple={false} 
                        maxSize={100000000}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ backgroundColor: 'white', width: '320px', height: '240px', border: '1px solid lightgray', 
                                alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {ThumbnailPath ?
                                        <div>
                                            <img src={`${SERVER_URL}${ThumbnailPath}`} alt="thumbnail" />
                                        </div> :
                                        <span class="text-muted"> <br /><br /><br /><br />Drop image or Click here to add image</span>
                                    }
                                </div>
                            )}
                        </Dropzone>
                        </div>

                        <hr class="mb-4" />
                        <button class="btn btn-primary btn-lg btn-block" type="button" onClick={onSubmitHandler}>Save</button>
                        <button type="button" class="btn btn-secondary btn-lg btn-block" id="btn-cancel" onClick={onCancleHandler}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>      
    </body>
    )
}

export default withRouter(AddToReadPage);
