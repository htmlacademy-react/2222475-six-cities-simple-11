import React, {useEffect} from 'react';
import CommentForm from '../comment-form/comment-form';
import {store} from '../../store';
import {fetchReviewsAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks';
import {getComments} from '../../store/comment-data/selectors';
import Review from '../review/review';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {AuthorizationStatus} from '../../const';

type ReviewsProps = {
  offerId: number;
}

function Reviews({offerId}: ReviewsProps): JSX.Element {
  const comments = useAppSelector(getComments);
  const currentAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      store.dispatch(fetchReviewsAction(offerId));
    }

    return () => {
      isMounted = false;
    };
  }, [offerId]);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      {
        comments.length ?
          <ul className="reviews__list">
            {comments.slice(0, 10).map((comment) => (
              <Review key={comment.id} comment={comment}/>
            ))}
          </ul>
          : ''
      }
      {
        currentAuthorizationStatus === AuthorizationStatus.Auth &&
        <CommentForm offerId={offerId}/>
      }
    </section>
  );
}

export default Reviews;
