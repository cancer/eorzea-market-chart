const get = (url: string): Promise<any> => {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  return new Promise((resolve, reject) => {
    fetch(url, {
      mode: 'cors',
      headers,
    })
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};

export const httpGet = (url: string, params: URLSearchParams | null | undefined): Promise<any> => {
  if (!params) {
    return get(url);
  }

  return get(`${url}?${params.toString()}`);
};
