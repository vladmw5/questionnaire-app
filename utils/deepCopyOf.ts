export const deepCopyOf = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const clonedArr: any[] = [];

    for (let i = 0; i < obj.length; i++) {
      clonedArr[i] = deepCopyOf(obj[i]);
    }
    return clonedArr as T;
  }

  const clonedObj = {} as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepCopyOf(obj[key]);
    }
  }

  return clonedObj;
};
