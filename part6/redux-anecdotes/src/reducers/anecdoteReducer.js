import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    setVote(state, action){
      const updatedAnecdote = action.payload
      const index = state.findIndex(anecdote => anecdote.id === updatedAnecdote.id)
      if( index !== -1 ){
        state[index] = updatedAnecdote;
      }
      return state
    }
  }
})

export const { setAnecdotes, appendAnecdote, setVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateLikes(anecdote)
    dispatch(setVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer