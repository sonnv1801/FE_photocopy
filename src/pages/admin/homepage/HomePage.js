import React from "react";
import Menu from "../menu/Menu";

export const HomePageAdmin = () => {
  return (
    <div className="row">
      <div className="col-3 menu-admin-dt">
        <Menu />
      </div>
      <div className="col-xl-9 col-sm-12">
        <div className="container-fluid mt-5 text-center">
          <header className="App-header">
            <h1>Admin Máy Photocopy</h1>
          </header>
          <main>
            <h2>Chào mừng đến với cửa hàng Máy Photocopy</h2>
            <p>
              Chúng tôi cung cấp các loại Máy Photocopy chất lượng với giá cả
              phải chăng.
            </p>
          </main>
          <footer>
            <p>Bản quyền © 2023 Shop Máy Photocopy.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};
