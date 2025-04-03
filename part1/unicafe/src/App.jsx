import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.headerText}</h1>
  )
}

const StatisticTableLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => (
  <button onClick={() => props.option.setNumVotes(props.option.numVotes + 1)}>
    {props.option.name}
  </button>
)

const Feedback = (props) => {
  return(
    <div>
      <Header headerText={"give feedback"}></Header>
      <Button option={props.options[0]} />
      <Button option={props.options[1]} />
      <Button option={props.options[2]} />
    </div>
  )
}

const Statistics = (props) => {
  let voteOptions = props.options;

  const numTotalVotes = (feedbackOptions) => {    
    return ((feedbackOptions[0].numVotes) + (feedbackOptions[1].numVotes) + (feedbackOptions[2].numVotes))
  }

  const calcAverage = (feedbackOptions) => {    
    return (Number(((feedbackOptions[0].numVotes) - (feedbackOptions[2].numVotes))/numTotalVotes(feedbackOptions)).toPrecision(3))
  }

  const percPostitive = (feedbackOptions) => {
    return (Number((feedbackOptions[0].numVotes) * 100 / numTotalVotes(feedbackOptions)).toPrecision(3) + "%")
  }

    if (numTotalVotes(voteOptions) === 0) {
      return (
        <div>
        <Header headerText={"give feedback"}></Header>
        <div>No feedback given</div>
      </div>
      )
    }
<div>No feedback given</div>
  return(
    <div>
      <Header headerText={"give feedback"}></Header>
      <table>
        <tbody>
          <StatisticTableLine text={voteOptions[0].name} value={voteOptions[0].numVotes} />
          <StatisticTableLine text={voteOptions[1].name} value={voteOptions[1].numVotes} />
          <StatisticTableLine text={voteOptions[2].name} value={voteOptions[2].numVotes} />
          <StatisticTableLine text={"all"} value={numTotalVotes(voteOptions)} />
          <StatisticTableLine text={"average"} value={calcAverage(voteOptions)} />
          <StatisticTableLine text={"positive"} value={percPostitive(voteOptions)} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackOptions = {
    options: [
      {
        name: 'good',
        numVotes: good,
        setNumVotes: setGood
      },
      {
        name: 'neutral',
        numVotes: neutral,
        setNumVotes: setNeutral
      },
      {
        name: 'bad',
        numVotes: bad,
        setNumVotes: setBad
      }
    ]
  }

  return (
    <div>
      <Feedback options = {feedbackOptions.options}></Feedback>
      <Statistics options = {feedbackOptions.options}></Statistics>
    </div>
  )
}

export default App