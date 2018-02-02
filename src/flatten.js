const flatten = obj =>
  Array.isArray(obj)
    ? [].concat.apply([], obj.map(flatten))
    : [].concat.apply([], Object.values(obj).map(flatten));
