import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useInfiniteQuery } from "react-query";
import { fetchTodos } from "./api";
import { AddTodo } from "./AddTodo";
import { TodoItem } from "./TodoItem";

function App() {
  const {
    data,
    error,
    isLoading,
    isError,
    canFetchMore,
    fetchMore,
    isFetchingMore,
  } = useInfiniteQuery("todos", fetchTodos, {
    getFetchMore: (lastGroup) => lastGroup.offset,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <>
      <AddTodo/>
      <ul>
        {data.map((group, i) => (
          <React.Fragment key={i}>
            {group.records.map(({id, fields}) => {
              return <TodoItem key={id} id={id} {...fields}/>
            })}
          </React.Fragment>
        ))}
      </ul>
      <div>
        <button
          onClick={() => fetchMore()}
          disabled={!canFetchMore || isFetchingMore}
        >
          {isFetchingMore
            ? "Loading more..."
            : canFetchMore
            ? "Load more"
            : "Nothing to load"}
        </button>
      </div>
    </>
  );
}

export default App;
