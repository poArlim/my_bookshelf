import React, { useState } from 'react';
import AboveMenu from './Sections/AboveMenu';
import './Sections/Navbar.css';

function NavBar(props) {
  const [visible, setVisible] = useState(false)

  const switchVisible = () => {
    if(visible) setVisible(false);
    else setVisible(true);
  };

  return (
    <header>
      {visible && <AboveMenu />}
      <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container d-flex justify-content-between">
          <a href="/" class="navbar-brand d-flex align-items-center">
              <img src="http://localhost:5000/uploads/book-icon.png" alt="no image"  />
              {/* 아이콘 제작자 <a href="https://www.flaticon.com/kr/authors/mavadee" title="mavadee">mavadee</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon"> www.flaticon.com</a> */}
              <strong> &nbsp; &nbsp; Aron's bookshelf</strong>
          </a>
          <button class="navbar-toggler" type="button" onClick={switchVisible}>
              <span class="navbar-toggler-icon"></span>
          </button>
      </div>
      </div>
    </header>
  )
}

export default NavBar