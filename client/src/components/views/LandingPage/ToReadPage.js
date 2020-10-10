import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Cards from '../commons/Cards';
import '../../../css/LandingPage.css';

function ToReadPage(props) {

    const [Books, setBooks] = useState([]);
    const [UserName, setUserName] = useState("")
    let userFrom = localStorage.getItem('userId');

    useEffect(() => {
        if(userFrom === null) userFrom = '5f66072386bd0bdcb4ce695a'
        axios.post('/api/users/findName', { userFrom: userFrom })
            .then(response => {
                if(response.data.success){
                    setUserName(response.data.user[0].name);
                }
                else {
                    alert('유저 이름을 찾는 데 실패했습니다.');
                }
            })

        axios.post('/api/books/getBooks', { userFrom: userFrom, isRead: false })
            .then(response => {
                setBooks([...Books, ...response.data.books]);
            })
    }, [])

    return (
        <main role="main">
            <section class="jumbotron text-center">
                <div class="container">
                    <h1><strong>{UserName} 의 서재</strong></h1>
                    <p class="lead text-muted">앞으로 읽고 싶은 책, 이미 읽은 책 저장해두고 독후감도 쓰려고 만든 페이지</p>
                    <p>
                        <br/>
                        <a class="btn btn-primary my-2" href="/addread">읽은 책 추가</a>
                        &nbsp;
                        <a class="btn btn-primary my-2" href="/addtoread">읽을 책 추가</a>
                    </p>
                </div>
            </section>
            <div class="album py-5 bg-light">
                <div class="container">
                    <h4>내가 읽을 책</h4><hr />
                    <div class="row" id="list">
                        {Books && Books.map((book, index) => (
                            <React.Fragment key={index}>
                                <div class="col-md-3">
                                    <Cards
                                        userFrom={userFrom}
                                        bookTitle={book.bookTitle}
                                        bookAuthor={book.bookAuthor}
                                        thumbnailPath={book.thumbnailPath}
                                        createdAt={book.createdAt}
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default withRouter(ToReadPage);
