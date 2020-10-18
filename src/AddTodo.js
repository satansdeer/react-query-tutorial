import React, { useRef } from 'react'
import { useMutation, useQueryCache } from 'react-query'
import { createTodo } from './api'

export const AddTodo = () => {
  const inputRef = useRef()
  const queryCache = useQueryCache()

  const [mutateAdd] = useMutation(createTodo, {
    onSuccess: () => queryCache.invalidateQueries("todos")
  })

  const onAdd = () => {
    mutateAdd({text: inputRef.current.value})
    inputRef.current.value = ""
  }

  return <>
    <input ref={inputRef}/>
    <button onClick={onAdd}>Add ToDo</button>
    <hr/>
  </>
}