import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function BelowMenu(props) {
  return (
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container d-flex justify-content-between">
          <a href="#" class="navbar-brand d-flex align-items-center">
              <img src="http://localhost:5000/uploads/book-icon.png" alt="no image"  />
              <strong> &nbsp; &nbsp; Aron's bookshelf</strong>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
      </div>
    </div>
  )

  //   <Menu mode={props.mode}>
  //     <Menu.Item key="mail">
  //       <a href="/">Home</a>
  //     </Menu.Item>
  //     <Menu.Item key="favorite">
  //       <a href="/favorite">Favorite</a>
  //     </Menu.Item>
  // </Menu>
}

export default BelowMenu;