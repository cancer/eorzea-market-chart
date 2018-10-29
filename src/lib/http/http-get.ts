const get = <T>(url: string): Promise<T> => {
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

export const httpGet = <T>(url: string, params: URLSearchParams | null | undefined): Promise<T> => {
  if (!params) {
    return get<T>(url);
  }

  return get<T>(`${url}?${params.toString()}`);
};
