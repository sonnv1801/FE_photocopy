import React from "react";
import Menu from "../menu/Menu";

export const HomePageAdmin = () => {
  return (
    <div className="row">
      <div className="col-3">
        <Menu />
      </div>
      <div className="col-9">
        <div className="container-fluid mt-5 text-center">
          <header className="App-header">
            <h1>Admin Máy PHOTOCOPY</h1>
          </header>
          <main>
            <h2>Chào mừng đến với cửa hàng Máy PHOTOCOPY</h2>
            <p>
              Chúng tôi cung cấp các loại Máy PHOTOCOPY chất lượng với giá cả
              phải chăng.
            </p>
          </main>
          <footer>
            <p>Bản quyền © 2023 Shop Máy PHOTOCOPY. Nguyễn Văn Sơn.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};
