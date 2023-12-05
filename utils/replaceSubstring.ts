const notFoundIndex = -1;
const firstIndex = 0;

export const replaceSubstring = (
  targetStr: string,
  substr: string,
  strToReplace: string,
): string => {
  const index = targetStr.indexOf(substr);

  if (index === notFoundIndex) {
    return targetStr;
  }

  const partBefore = targetStr.slice(firstIndex, index);
  const partAfter = targetStr.slice(index + substr.length);

  return partBefore + strToReplace + partAfter;
};
