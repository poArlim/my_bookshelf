import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone';


function EditPage(props) {
    let userFrom = localStorage.getItem('userId');
    let bookTitle = props.match.params.bookTitle;

    const [BookTitle, setBookTitle] = useState("");
    const [BookAuthor, setBookAuthor] = useState("");
    const [BookLink, setBookLink] = useState("");
    const [BookReview, setBookReview] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("")
    
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
        if(userFrom === null) {
            alert('로그인이 필요합니다.');
            return props.history.push('/login');
        }
        fetchBookDetail();
    }, [])

    const fetchBookDetail = () => {
        axios.post('/api/books/getBookDetail', { userFrom: localStorage.getItem('userId'), bookTitle })
        .then(response => {
            if(response.data.success){
                setBookTitle(response.data.bookDetail[0].bookTitle);
                setBookAuthor(response.data.bookDetail[0].bookAuthor);
                setBookLink(response.data.bookDetail[0].bookLink);
                setBookReview(response.data.bookDetail[0].bookReview);
                setThumbnailPath(response.data.bookDetail[0].thumbnailPath);
            } else {
                alert('책 정보를 가져오는데 실패 했습니다.');
            }
        })
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);

        axios.post('/api/books/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success) {
                    axios.post('/api/books/resizefiles', {url: response.data.url})
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

    const onSubmitHandler = () => {
        let variables = {
            userFrom,
            originTitle: bookTitle,
            bookTitle: BookTitle,
            bookAuthor: BookAuthor,
            bookLink: BookLink,
            bookReview: BookReview,
            thumbnailPath: ThumbnailPath
        }
        axios.post('/api/books/duplicateCheck', { userFrom: userFrom, bookTitle: BookTitle })
            .then(response => {
                if(response.data.isDuplicate){
                    return alert('이미 추가되어 있는 책입니다.');
                }
                else {
                    axios.post('/api/books/editBook', variables)
                    .then(response => {
                        if(response.data.success){
                            alert('책 정보가 성공적으로 수정되었습니다.');
                            props.history.push("/");
                        }
                        else {
                            alert('책 정보 수정에 실패했습니다.');
                        }
                    })
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
                    <h2>Book Edit Form</h2>
                    <p class="lead">
                        수정하고자 하는 책의 정보를 수정한 후 "Save" 버튼을 눌러 저장을 완료하여 주세요.
                    </p>
                </div>
                <div class="row">
                    <div class="col-md-12 order-md-1">
                        <h4 class="mb-3">Book Info</h4>
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
                                                <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                                            </div> :
                                            <span class="text-muted"> <br /><br /><br /><br />Drop image or Click here to add image</span>
                                        }
                                    </div>
                                )}
                            </Dropzone>
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
            </div>
        </body>
    )
}

export default withRouter(EditPage);
