const { NODE_ENV, REACT_APP_API_URL_LOCAL, REACT_APP_API_URL_PROD } = process.env;

export const BASE_URL = NODE_ENV  === 'production' ? REACT_APP_API_URL_PROD : REACT_APP_API_URL_LOCAL;

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return response.json().then((res) => {
    console.log('res.message', res.message)
    throw res.message;
  });
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
