import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CommentsData as CommentsDataType} from '../../types/state';
import {Comment as CommentType} from '../../types/comment';
import {fetchReviewsAction, sendCommentAction} from '../api-actions';

const initialState: CommentsDataType = {
  offerComments: {
    items: [],
    loading: true
  },
  comment: {
    rating: 5,
    comment: '',
    posting: false,
  },
};

export const commentData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    changeCommentText: (state, action: PayloadAction<string>) => {
      state.comment.comment = action.payload;
    },
    changeCommentRating: (state, action: PayloadAction<number>) => {
      state.comment.rating = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.offerComments.items = [];
        state.offerComments.loading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        const comments = action.payload;
        state.offerComments.items = comments.sort(sortComments);
        state.offerComments.loading = false;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.comment.posting = true;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        const comments = action.payload;
        state.offerComments.items = comments.sort(sortComments);
        state.comment.posting = false;
        state.comment.comment = '';
        state.comment.rating = 5;
      })
      .addCase(sendCommentAction.rejected, (state, action) => {
        state.comment.posting = false;
      });
  }
});

function sortComments(a: CommentType, b: CommentType) {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}

export const {changeCommentText, changeCommentRating} = commentData.actions;
