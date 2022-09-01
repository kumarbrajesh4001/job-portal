import RATING from '../constants/rating';
import TRANSACTION_TYPE from '../constants/transactionType';

const TRANSACTION_TYPE_COLOR = {
  [TRANSACTION_TYPE.CREDIT]: 'color-3DC996',
  [TRANSACTION_TYPE.DEBIT]: 'color-F25C05',
};

export const transactionTypeColor = (transactionType) =>
  TRANSACTION_TYPE_COLOR[transactionType];

const RATING_COLOR = {
  [RATING.DEFAULT]: 'color-AAAAAA',
  [RATING.BEGINNER]: 'color-AD2DB5',
  [RATING.INTERMEDIATE]: 'color-FEAF18',
  [RATING.PROFICIENT]: 'color-35CDB0',
  [RATING.EXPERT]: 'color-F25C05',
};

const ratingColor = (rating) => RATING_COLOR[rating] || 'color-AAAAAA';
export default ratingColor;
