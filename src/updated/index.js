import { isDate, isEmpty, isObject, properObject } from '../utils';

const updatedDiff = (lhs, rhs) => {

  if (lhs === rhs) return {};

  if (!isObject(lhs) || !isObject(rhs)) return rhs;

  const l = properObject(lhs);
  const r = properObject(rhs);

  if (isDate(l) || isDate(r)) {
    if (l.valueOf() == r.valueOf()) return {};
    return r;
  }

  return Object.keys(r).reduce((acc, key) => {

    if (l.hasOwnProperty(key) && !Array.isArray(l) && !Array.isArray(r)) {
      const difference = updatedDiff(l[key], r[key]);

      if (isObject(difference) && isEmpty(difference) && !isDate(difference)) return acc;

      return { ...acc, [key]: difference };
    }
    else if (Array.isArray(l) && Array.isArray(r)) {
      const rId = r[key].id;

      const lItem = l.find((i) => i.id === rId);

      if(!lItem) return acc;

      const difference = updatedDiff(lItem, r[key]);

      if (isObject(difference) && isEmpty(difference) && !isDate(difference)) return acc;

      return { ...acc, [key]: {...difference, id: rId} };
  }

    return acc;
  }, {});
};

export default updatedDiff;
