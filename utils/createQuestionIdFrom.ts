/**
 * @param {string} seed - a string used to generate id
 * @pure
 * */
export const createQuestionIdFrom = (seed: string) => {
  const index = 0;
  const offset = 1;

  return encodeURIComponent(
    seed
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(index) + offset))
      .join(''),
  );
};
