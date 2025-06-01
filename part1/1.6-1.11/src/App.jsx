import { useState } from 'react'

const Display = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick = {handleClick}>
    {text}
  </button>
  )
}

const Statistics = ({stat, number}) => {
  return (
  <tr>
    <td>{stat}</td>
    <td>{number}</td>
  </tr>
  )
}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

    
  const handleAnOpinion = (type) => {
    if (type === "good") setGood(good + 1)
    if (type === "neutral") setNeutral(neutral + 1)
    if (type === "bad") setBad(bad + 1)
  }

  const total = good + neutral + bad
  const average = (good - bad)/total
  const positive = (good/total) * 100
  if(total == 0){
    return (
    <div>
      <Display text={"give feedback"}/>
      <Button handleClick = {() => handleAnOpinion('good')} text='good'/>
      <Button handleClick = {() => handleAnOpinion('neutral')} text= 'neutral'/>
      <Button handleClick = {() =>  handleAnOpinion('bad')} text='bad'/>
      <Display text={"statistics"}/>
      <p>No feedback given</p>
    </div>
    )
  }
  return (
    <div>
      <Display text={"give feedback"}/>
      <Button handleClick = {() => handleAnOpinion('good')} text='good'/>
      <Button handleClick = {() => handleAnOpinion('neutral')} text= 'neutral'/>
      <Button handleClick = {() =>  handleAnOpinion('bad')} text='bad'/>
      <Display text={"statistics"}/>
      <table>
        <tbody>
          <Statistics stat="good" number={good}/>
          <Statistics stat="neutral" number={neutral}/>
          <Statistics stat="bad" number={bad}/>
          <Statistics stat="all" number ={total}/>
          <Statistics stat="average" number = {average}/>
          <Statistics stat="positive" number = {positive.toString() + " %"}/>
        </tbody>
      </table>
    </div>
    
  )
}

export default App