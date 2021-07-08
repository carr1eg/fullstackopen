import React, { useState} from 'react'
function App() {
  const [ counterGood, setGoodCounter ] = useState(0);
  const [ counterNeutral, setNeutralCounter ] = useState(0);
  const [ counterBad, setBadCounter ] = useState(0);
  const statistics = 'statistics';
  const title = "GIVE FEEDBACK";
  const good = () => setGoodCounter(counterGood + 1);
  const neutral = () => setNeutralCounter(counterNeutral + 1)
  const bad = () => setBadCounter(counterBad + 1)
  let all = counterGood + counterBad + counterNeutral;
  let avg = (counterGood - counterBad) / all;
  let positive = `${counterGood / all * 100}%`;
  if(counterGood === 0 && counterBad === 0 && counterNeutral === 0) {
    return(
      <div>
      <Title title={title}/>
      <Buttons good={good} neutral={neutral} bad={bad} />
      <Title title={statistics}/> 
      <Title title="No feedback given"/>
      </div>
    )
  }
  return (
    <div>
      <Title title={title}/>
      <Buttons good={good} neutral={neutral} bad={bad} />
      <Title title={statistics}/>
      <table style = {{textAlign: "center"}}>
        <tbody>
      <Statistics value={counterGood} text='good'/>
      <Statistics value={counterBad} text='bad'/>
      <Statistics value={counterNeutral} text='neutral'/>
      <Statistics value={all} text='all'/>
      <Statistics value={avg} text='average'/>
      <Statistics value={positive} text='positive'/>
      </tbody>
      </table>
    </div>
  );
}

const Title = props => <div><h1>{props.title}</h1></div>

const Statistics = (props) => {
  return(
  <tr>
      <td>{props.text} {props.value}</td>
  </tr>
  )}

const Buttons = ({good, bad, neutral}) => {
  return(
    <div>
    <button onClick={good}>Good</button>
    <button onClick={neutral}>neutral</button>
    <button onClick={bad}>bad</button>
    </div>
  )
}



export default App;
