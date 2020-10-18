import React from "react";
import { useMutation, useQueryCache } from "react-query";
import { deleteTodo, updateTodo } from "./api";

export const TodoItem = ({ id, text, completed }) => {
  const queryCache = useQueryCache();

  const [mutateDelete] = useMutation(deleteTodo, {
    onSuccess: () => queryCache.invalidateQueries("todos"),
  });

  const [mutateCheck] = useMutation(updateTodo, {
    onMutate: (newTodo) => {
      queryCache.cancelQueries("todos");
      const previousQuery = queryCache.getQueryData("todos");
      queryCache.setQueryData("todos", (oldQuery) => {
        return oldQuery.map((group) => {
          return {
            ...group,
            records: group.records.map((record) => {
              if (record.id === newTodo.id) {
                return {
                  ...record,
                  fields: { ...record.fields, ...newTodo.fields },
                };
              } else {
                return record;
              }
            }),
          };
        });
      });
      return () => queryCache.setQueryData("todos", previousQuery);
    },
    onError: (err, newTodo, rollback) => rollback(),
    onSettled: (newTodo) => {
      queryCache.invalidateQueries("todos");
    },
  });

  const remove = () => {
    mutateDelete(id);
  };

  const onCheck = (event) => {
    mutateCheck({ id, fields: { completed: event.target.checked } });
  };

  return (
    <li>
      <span>{text}</span>
      <input type="checkbox" onChange={onCheck} checked={!!completed} />
      <button onClick={remove}>Delete</button>
    </li>
  );
};
