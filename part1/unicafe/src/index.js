import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

const Button = ({ state, setState, text }) => {

  const handleClick = () => {
    const newState = state + 1;
    setState(newState)
  }

  return(
    <button onClick={handleClick}>{text}</button>
  );
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {

  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good}/>
        <StatisticLine text={"neutral"} value={neutral}/>
        <StatisticLine text={"bad"} value={bad}/>
        <StatisticLine text={"all"} value={total}/>
        <StatisticLine text={"average"} value={average}/>
        <StatisticLine text={"positive"} value={positive ? positive : 0}/>
      </tbody>
    </table>
  )
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + bad + neutral;
  const positive = (good * 100) / total;
  const average = [good + -(bad)] / total;

  return (
    <div>
      <div className="give-feedback">
        <h1>Give us a feedback</h1>
        <Button state={good} setState={setGood} text={"good"} />
        <Button state={neutral} setState={setNeutral} text={"neutral"} />
        <Button state={bad} setState={setBad} text={"bad"} />
      </div>
      <div className="feedback-statistics">
        <h2>Feedbacks statistics</h2>
        {total === 0 ? (
          <p>No feedback given</p>
        ) : (
          <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={`${positive}%`} />
        )}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)