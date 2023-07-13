import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const Anecdote = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes.</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdotes.map(x => 0));
  const maxValue = Math.max.apply(null, votes);
  const indexOfMax = votes.indexOf(maxValue);

  const handleClickVote = () => {
    const newVotes = votes.map((value, index) => {
      if (index === selected) {
        return value + 1
      } else {
        return value
      }
    })
    setVotes(newVotes)
  }

  const nextAnecdote = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(newSelected)
  }

  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={props.anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleClickVote}>Vote</button>
      <button onClick={nextAnecdote}>Next anecdote</button>
      <hr />
      {maxValue === 0 ? (
        <p>There is no more voted anecdote at the moment</p>
      ) : (
        <Anecdote title="Anecdote with most votes" anecdote={props.anecdotes[indexOfMax]} votes={maxValue} />
      )}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.createRoot(document.getElementById('root')).render(<App anecdotes={anecdotes}/>)