import { isEmpty, isObject, properObject } from '../utils';

const addedDiff = (lhs, rhs, uniqueProperty = "id") => {

  if (lhs === rhs || !isObject(lhs) || !isObject(rhs)) return {};

  const l = properObject(lhs);
  const r = properObject(rhs);

  return Object.keys(r).reduce((acc, key) => {
    if (l.hasOwnProperty(key) && !Array.isArray(l) && !Array.isArray(r)) {
      const difference = addedDiff(l[key], r[key]);

      if (isObject(difference) && isEmpty(difference)) return acc;

      return { ...acc, [key]: difference };
    }
    else if (Array.isArray(l) && Array.isArray(r)) {
        const rId = r[key][uniqueProperty];
  
        const lItem = l.find((i) => i[uniqueProperty] === rId);
  
        if (!lItem) return { ...acc, [key]: r[key] };
  
        const difference = addedDiff(lItem, r[key]);
  
        if (isObject(difference) && isEmpty(difference)) return acc;
  
        return { ...acc, [key]: difference };
      }

    return { ...acc, [key]: r[key] };
  }, {});
};

export default addedDiff;
