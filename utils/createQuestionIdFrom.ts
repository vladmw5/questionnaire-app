import { URIEncodedQuestionId } from '@/types/Question';

/**
 * @param {string} seed - a string used to generate id
 * @returns {string} - encoded question id
 * @pure
 * */
export const createQuestionIdFrom = (seed: string): URIEncodedQuestionId => {
  const index = 0;
  const transformOffset = 1;

  return encodeURIComponent(
    seed
      .split('')
      .map((char) =>
        String.fromCharCode(char.charCodeAt(index) + transformOffset),
      )
      .join(''),
  );
};
