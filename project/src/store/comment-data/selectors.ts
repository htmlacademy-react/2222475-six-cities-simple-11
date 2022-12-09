import {NameSpace} from '../../const';
import {State, StateComment} from '../../types/state';
import {Comments} from '../../types/comment';

export const getComments = (state: State): Comments => state[NameSpace.Comment].offerComments.items;
export const getComment = (state: State): StateComment => state[NameSpace.Comment].comment;
