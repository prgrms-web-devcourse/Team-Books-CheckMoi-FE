export const isValueNumber = (value: string) => {
  const lastVal = value[value.length - 1];

  if (
    lastVal.charCodeAt(0) >= "0".charCodeAt(0) &&
    lastVal.charCodeAt(0) <= "9".charCodeAt(0)
  )
    return true;

  return false;
};
