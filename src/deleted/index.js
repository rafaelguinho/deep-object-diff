import { isEmpty, isObject, properObject } from '../utils';

const deletedDiff = (lhs, rhs) => {
  if (lhs === rhs || !isObject(lhs) || !isObject(rhs)) return {};

  const l = properObject(lhs);
  const r = properObject(rhs);

  return Object.keys(l).reduce((acc, key) => {
    if (l.hasOwnProperty(key) && !Array.isArray(l) && !Array.isArray(r)) {
      const difference = deletedDiff(l[key], r[key]);

      if (isObject(difference) && isEmpty(difference)) return acc;

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

    return { ...acc, [key]: undefined };
  }, {});
};

export default deletedDiff;
