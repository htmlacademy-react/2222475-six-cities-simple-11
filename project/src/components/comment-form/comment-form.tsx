import React, {ChangeEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {sendCommentAction} from '../../store/api-actions';
import {changeCommentText, changeCommentRating} from '../../store/comment-data/comment-data';
import {getComment} from '../../store/comment-data/selectors';

type CommentFormProps = {
  offerId: number;
}

function CommentForm({offerId}: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const commentData = useAppSelector(getComment);

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    if(!commentData.posting) {
      const {value} = evt.target;
      dispatch(changeCommentText(value));
    }
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if(!commentData.posting) {
      const {value} = evt.target;
      dispatch(changeCommentRating(Number(value)));
    }
  };

  const handleCommentFormSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendCommentAction(offerId));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleCommentFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} checked={commentData.rating === 5} name="rating" value="5" id="5-stars" type="radio"/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} checked={commentData.rating === 4} name="rating" value="4" id="4-stars" type="radio"/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} checked={commentData.rating === 3} name="rating" value="3" id="3-stars" type="radio"/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} checked={commentData.rating === 2} name="rating" value="2" id="2-stars" type="radio"/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" onChange={handleRatingChange} checked={commentData.rating === 1} name="rating" value="1" id="1-star" type="radio"/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea maxLength={300} disabled={commentData.posting} className="reviews__textarea form__textarea" id="comment" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleCommentChange} value={commentData.comment}/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button disabled={commentData.comment.length <= 50 || commentData.rating === 0 || commentData.posting} className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
