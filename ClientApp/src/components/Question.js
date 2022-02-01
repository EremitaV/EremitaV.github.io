import React, { useEffect, useState } from "react"
import Quiz from "./Quiz"
import QuizOption from "./QuizOption"
function Question(props) {

    const [chosen, setChosen] = useState([false,false,false,false])
    const [randomizedOptions, setRandomizedOptions] = useState(false)
    const [options, setOptions] = useState([])
    console.log(`   Question props: ${JSON.stringify(props.data)}`)
    var data = props.data
    var correct = data.correct_answer
    
    useEffect(() => {
        var correct = data.correct_answer
        var incorrect = data.incorrect_answers
        var temp = [...incorrect, correct].sort((a, b) => 0.49 - Math.random())
        setOptions(temp)
        setRandomizedOptions(true)
        return function cleanup() {
            setChosen([false,false,false,false])
        }
    },[])

    function handleClick(val, id) {
        if (!chosen.some(elem => elem)) {
            setChosen(prev => prev.map((elem, ind)=> {
                if (ind === id) {
                    if (val === correct) {
                        props.handleClick();
                    }
                    return true
                }
                return elem;
            }))
        }
    }

    

    return (
        <div className="main-container question">
            <h1>Question {props.id + 1}</h1>
            <h3 dangerouslySetInnerHTML={{ __html: props.data.question}}></h3>
            <div className="question--options">
                {randomizedOptions ? options.map((val,index) => <QuizOption 
                    handleClick={() => handleClick(val, index)}
                    option={val}
                    isCorrect={val === props.data.correct_answer ? true : false}
                    chosen={chosen[index]}
                />) : <div></div>}
            </div>
        </div>
    )
}

export default Question;