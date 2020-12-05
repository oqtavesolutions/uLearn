import React from "react";
import { Link } from "react-router-dom";
import "./MyPage.scss";

function MyPage() {
  return (
    <div className='mypage-page'>
      <h1 className='mypage-page__title'>Edit Your Page</h1>
      <form className='mypage-page-form'>
        <input
          type='text'
          placeholder='Author Name'
          className='mypage-page-form__input'
        />
        <textarea
          type='text'
          placeholder='Author Description'
          className='mypage-page-form__text-area'></textarea>
        <div className='mypage-page-form__buttons'>
          <button className='mypage-page-form__button'>Save</button>
          <Link
            to='/'
            className='mypage-page-form__button mypage-page-form__button--cancel'>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default MyPage;
