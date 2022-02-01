import React, {useState, useEffect} from "react"
import { nanoid } from 'nanoid'
import Question from "./Question"

function Quiz() {
    const [questions, setQuestions] = useState([])
    const [loadedQuestions, setLoadedQuestions] = useState(false)
    const [correctlyAnswered, setCorrectlyAnswered] = useState(0)
    const [questionOptions, setQuestionOptions] = useState({
        numberOfQuestions: 5,
        difficulty: "easy"
    })
    console.log(`questionOptions: ${questionOptions.numberOfQuestions} ${questionOptions.difficulty}`)

    const [questionElements, setQuestionElements] = useState()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        console.log(`Running useEffect to create question elements`)
        if (questions.length > 0) {
            const arr = []
            for (let i = 0; i < questionOptions.numberOfQuestions; i++) {
                arr.push(
                    <Question 
                    key={nanoid()} 
                    id={i} 
                    data={questions[i]} 
                    handleClick={() => handleCorrect()}
                />  
                )
            }
            setQuestionElements(arr)
        } 
    }, [questions])

    function handleClick() {
        setQuestions([])
        getData()
        scrollToTop()
    }

    async function getData() {       
        const response = await fetch(`api/quiz?difficulty=${questionOptions.difficulty}&amount=${questionOptions.numberOfQuestions}`)
        const data = await response.json()
        setQuestions(data)
        setCorrectlyAnswered(0)
        setLoadedQuestions(true)
        
    }

    function handleCorrect() {
        setCorrectlyAnswered(prev => prev + 1)
    }

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    }

    function handleForm(event) {
        const {value, name} = event.target
        setQuestionOptions(prev => ({   
                ...prev,
                [name]: value
            }
        ))
    }
    return loadedQuestions ? (
       <div className="quiz">
            {questionElements}
            <p>Correctly answered {correctlyAnswered} / {questionOptions.numberOfQuestions}</p>
            <form>
                <label>
                    Number of questions:
                    <select value={questionOptions.numberOfQuestions} onChange={(event) => handleForm(event)} name="numberOfQuestions">
                        {[...Array(25).keys()].map(elem => (
                            <option 
                                key={nanoid()} 
                                id={elem} 
                                value={elem+1} 
                            > {elem+1} </option>) 
                        )}
                        {/*<option value={5} name={"numberOfQuestions"}> 5</option>
                        <option value={10} name="numberOfQuestions"> 10</option>
                        <option value={15} name="numberOfQuestions"> 15</option>*/}
                    </select>
                </label>
                <label>
                    Difficulty:
                    <select value={questionOptions.difficulty} onChange={(event) => handleForm(event)} name="difficulty">
                        <option> Easy </option>
                        <option> Medium </option>
                        <option> Hard </option>
                    </select>
                </label>
                
            </form>
            <button 
                className="blue-button"
                onClick={handleClick}
            > Play Again </button>
            <hr></hr>
            <h3>Technologies used</h3>
            <p>Created in React using functional components and Hooks such as <a href="https://reactjs.org/docs/hooks-state.html">useState </a>
            and <a href="https://reactjs.org/docs/hooks-effect.html">useEffect</a>.<br/>
            <a href="https://reactjs.org/docs/lifting-state-up.html">State has been lifted</a> several times to accomidate functionality</p>
            <p>Data is queried through the backend written in C# which then makes a call to a REST API</p>
            <p>TODO:</p>
            <ul>
                <li>Use token to always get fresh questions in a session</li>
                <li>Styling</li>
                <li>Display number of correctly answered questions</li>
                <li>Be able to choose difficulty and categories of questions (will probably need controlled forms)</li>
                <li>Store questions in SQL database instead of calling API each time</li>
            </ul>
       </div>
    ) : <p>Fetching questions</p>
}

export default Quiz