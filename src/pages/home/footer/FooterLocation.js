import React from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
const FooterLocation = () => {
  return (
    <div className="col-lg-4 col-md-6 mb-4 mb-md-0 location-footer sm-location-footer">
      <h5 className=" text-center">Khu vực</h5>
      <div>
        <div
          className="tab-content tabs-scroll sm-tabs-scroll"
          id="nav-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <p>
              <LocalOfferIcon className="icon-location" />
              15/9, KP 7, P. Tân Phong, TP. Biên Hoà, Đồng Nai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLocation;
