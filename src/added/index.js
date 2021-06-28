import { isEmpty, isObject, properObject } from '../utils';

const addedDiff = (lhs, rhs, uniqueProperty = "id") => {

  if (lhs === rhs || !isObject(lhs) || !isObject(rhs)) return {};

  const l = properObject(lhs);
  const r = properObject(rhs);

  return Object.keys(r).reduce((acc, key) => {
    if (r.hasOwnProperty(key) && !Array.isArray(l) && !Array.isArray(r)) {
      const difference = deletedDiff(l[key], r[key]);

      if (isObject(difference) && isEmpty(difference)) return acc;

      return { ...acc, [key]: difference };
    } else if (Array.isArray(l) && Array.isArray(r)) {
      const lId = l[key][uniqueProperty];

      const rItem = r.find((i) => i.id === lId);

      if (!rItem) return { ...acc, [key]: {id: lId} };

      const difference = deletedDiff(l[key], rItem);

      if (isObject(difference) && isEmpty(difference)) return acc;

      return { ...acc, [key]: difference };
    }

    return { ...acc, [key]: undefined };
  }, {});
};

export default addedDiff;
