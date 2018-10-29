const get = <T>(url: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
  
    xhr.open('GET', url, true);
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 || xhr.status >= 300) {
          resolve(JSON.parse(xhr.responseText));
        }
      
        reject(new Error(xhr.statusText));
      }
    };
  
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });
  
    xhr.send();
  });
};

export const httpGet = <T>(url: string, params?: URLSearchParams): Promise<T> => {
  if (!params) {
    return get<T>(url);
  }

  return get<T>(`${url}?${params.toString()}`);
};
