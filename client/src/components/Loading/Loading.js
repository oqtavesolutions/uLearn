import React from "react";
import "./Loading.scss";
import loadingLogo from "../../assets/logo/loading-logo.svg";

function Loading() {
  return (
    <div className='loading'>
      <div className='loader-container'>
        <img
          src={loadingLogo}
          alt='loading'
          className='loader-container__image'
        />
        <div className='loader'></div>
      </div>

      <p className='loading__description'>We're loading your data...</p>
    </div>
  );
}

export default Loading;
