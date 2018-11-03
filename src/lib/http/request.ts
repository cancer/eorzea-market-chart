export interface Abortable {
  abort: () => void;
}

interface Callbacks<T> {
  whenSucceeded: (data: T) => void;
  whenFailed: (error: Error) => void;
}

interface GetRequestOption {
  params?: URLSearchParams;
  headers?: Headers;
}

const defaultHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
};

const appendDefaultHeaders = (headers: Headers): Headers => {
  Object.entries(defaultHeaders).forEach(([key, value]) => {
    headers.append(key, value);
  });
  
  return headers;
};

const makeQueryStrings = (params: URLSearchParams): string => {
  let paramsStr = '';
  
  params.forEach((value, key) => {
    paramsStr = paramsStr === '' ? `?${key}=${value}` : `${paramsStr}&${key}=${value}`;
  });
  
  return paramsStr;
};

const request = <T>(
  url: string,
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
  data: { [key: string]: any },
  headers: Headers,
  whenSucceeded: (data: T) => void,
  whenFailed: (error: Error) => void,
): Abortable => {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url, true);

  headers.forEach((value, key) => {
    xhr.setRequestHeader(key, value);
  });

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 || xhr.status >= 300) {
        whenSucceeded(JSON.parse(xhr.responseText) as T);
      }

      whenFailed(new Error(xhr.statusText));
    }
  };

  xhr.send();

  return xhr;
};

export const requestGet = <T>(
  url: string,
  options: GetRequestOption,
  callbacks: Callbacks<T>,
): Abortable => {
  const params = makeQueryStrings(options.params || new URLSearchParams());
  const headers = appendDefaultHeaders(options.headers || new Headers());
  
  return request<T>(
    `${url}${params}`,
    'GET',
    {},
    headers,
    callbacks.whenSucceeded,
    callbacks.whenFailed,
  );
};
