/**
 *
 * @param {string} questionId - URI encoded question id
 *
 * @returns {string} - a route segment to the question
 */
export const getQuestionUrl = (questionId: string): string =>
  `/question/${questionId}`;
