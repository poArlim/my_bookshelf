import React, { useState, useEffect } from 'react';
import AboveMenu from './Sections/AboveMenu';
import './Sections/Navbar.css';
import {SERVER_URL} from '../../Config';

function NavBar(props) {
  const [visible, setVisible] = useState(false)

  const switchVisible = () => {
    if(visible) setVisible(false);
    else setVisible(true);
  };

  useEffect(() => {
    setVisible(false);
  }, [])
  
  return (
    <header>
      {visible && <AboveMenu />}
      <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container d-flex justify-content-between">
        <div>
          <a href="/" class="navbar-brand align-items-center">
                <img src={`${SERVER_URL}/uploads/book-icon.png`} alt="no image"  />
                {/* 아이콘 제작자 <a href="https://www.flaticon.com/kr/authors/mavadee" title="mavadee">mavadee</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon"> www.flaticon.com</a> */}
                <strong> &nbsp; &nbsp; Aron's bookshelf</strong>
            </a>
          <a href="/" class="menu_left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;읽은 책</a>
          <a href="/toread" class="menu_left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;읽을 책</a>
        </div>
        <button class="navbar-toggler" type="button" onClick={switchVisible}>
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      </div>
    </header>
  )
}

export default NavBar