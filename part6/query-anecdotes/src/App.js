import { useMutation, useQuery, useQueryClient  } from 'react-query'
import { getAnecdotes, updateAnecdote } from './request'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch  } from './notificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({ 
        type: 'SHOW_NOTIFICATION', 
        payload: `you voted '${updatedAnecdote.content}'` 
      })
      setTimeout(() => {
        dispatch({ 
          type: 'HIDE_NOTIFICATION' 
        })
      }, 3000)
    },
  })

  const addVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery(
    'anecdotes', getAnecdotes, 
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )
  
  const anecdotes = result.data
  
  if(result.isLoading){
    return <div>Loading data...</div>
  }

  else if (result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }
  
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
