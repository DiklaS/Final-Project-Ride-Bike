// filterUtils.js
export const filterData = (data, filterString) => {
  if (!filterString) {
    return data;
  }
  return data.filter(
    (item) =>
      item.item.toLowerCase().startsWith(filterString) 
      || item.bizNumber.toString().toLowerCase().startsWith(filterString)
  );
};

