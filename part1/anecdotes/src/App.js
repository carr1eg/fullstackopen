import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [voteCount, setVote] = useState(new Uint8Array(anecdotes.length))

  const nextAnecdote = () => setSelected(Math.round(Math.random() * (anecdotes.length - 1)));
  const votePlus = () => {
    let newVote = [...voteCount];
    newVote[selected] += 1;
    setVote(newVote);
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {voteCount[selected]} votes</p>
      <button onClick={votePlus}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdote of most votes</h1>
      {anecdotes[voteCount.indexOf(Math.max(...voteCount))]}
      <p>has {voteCount[voteCount.indexOf(Math.max(...voteCount))]} votes</p>
    </div>
  )
}

export default App
//voteCount.sort((a, b) => b - a)[0]