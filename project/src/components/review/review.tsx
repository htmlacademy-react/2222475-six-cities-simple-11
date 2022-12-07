import moment from 'moment';
import {Comment as CommentType} from '../../types/comment';
import React from 'react';

type ReviewProps = {
  comment: CommentType;
}

function Review({comment}: ReviewProps): JSX.Element {
  const date = moment(comment.date);
  const ratingPercent: number = Math.round(comment.rating) * 20;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={date.format('YYYY-MM-DD')}>{date.format('MMMM YYYY')}</time>
      </div>
    </li>
  );
}

export default Review;
