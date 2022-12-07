export interface CommentUser {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export interface Comment {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: CommentUser;
}

export type Comments = Comment[];
