import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdote)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
    }

    const filteredAnecdotes = !filter 
        ? anecdotes.slice().sort((a, b) => b.votes - a.votes)
        : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))  

    return(
        <div>
            {filteredAnecdotes.map( anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList