const BASE = "appKZu8KmXP6GgwNI";
const TABLE = "Table%201";
const VIEW = "Grid%20view";
const API_URL = "https://api.airtable.com/v0";

const AUTH_HEADER = {
  Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_TOKEN}`,
};

export const fetchTodos = (key, cursor) => {
  let url = `${API_URL}/${BASE}/${TABLE}/?${VIEW}&pageSize=${2}`;
  if (cursor) {
    url = url + `&offset=${cursor}`;
  }

  return fetch(url, {
    headers: {
      ...AUTH_HEADER,
    },
  }).then((res) => res.json());
};

export const createTodo = (fields) => {
  const url = `${API_URL}/${BASE}/${TABLE}`;

  return fetch(url, {
    method: "POST",
    headers: {
      ...AUTH_HEADER,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
};

export const updateTodo = ({ id, fields }) => {
  const url = `${API_URL}/${BASE}/${TABLE}/${id}`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      ...AUTH_HEADER,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
};

export const deleteTodo = (id) => {
  const url = `${API_URL}/${BASE}/${TABLE}/${id}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      ...AUTH_HEADER,
    },
  });
};
