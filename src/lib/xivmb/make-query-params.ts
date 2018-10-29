const columnPropertiesBase = {
  data: 0,
  name: '',
  searchable: true,
  orderable: true,
  search: {
    value: '',
    regex: false,
  },
};
type Column = typeof columnPropertiesBase;
const makeColumns = (): Column[] => {
  const arr = (new Array(11)).fill(columnPropertiesBase);
  return arr.map((v, i) => {
    return {
      ...v,
      data: i,
    };
  });
};
const orderBase = {
  column: '10',
  dir: 'asc',
};
type Order = typeof orderBase;
const makeOrders = (): Order[] => {
  return [orderBase];
};
export const makeQueryParams = (category: string, keyword: string): URLSearchParams => {
  const columns = makeColumns();
  const orders = makeOrders();
  const params = new URLSearchParams({
    'handler': 'Data',
    'SelectedSearchCategory': category,
    'appId': 'None',
    'draw': '1',
    'start': '0',
    'length': '10',
    'search[value]': keyword,
    'search[regex]': 'false',
    '_': String(Date.now()),
  });
  
  columns.forEach((value, i) => {
    Object.entries(value).forEach(([k, v]) => {
      if (typeof v !== 'object') {
        params.append(`columns[${i}][${k}]`, String(v));
        return;
      }
      
      Object.entries(v).forEach(([kk, vv]) => {
        params.append(`columns[${i}][${k}][${kk}]`, String(vv));
      });
    });
  });
  
  orders.forEach((value, i) => {
    Object.entries(value).forEach(([k, v]) => {
      params.append(`order[${i}][${k}]`, v);
    });
  });
  
  return params;
};