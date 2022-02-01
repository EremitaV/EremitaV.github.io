import React, {useState, useEffect, Component} from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function Tenzies() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [numberOfRolls, setNumberOfRolls] = useState(1)
    const [startTime, setStartTime] = useState(Date.now())
    const [endTime, setEndTime] = useState(Date.now())
    const [highscore, setHighScore] = useState(JSON.parse(localStorage.getItem("highscore")) || {rolls: 1000, time: 1000})


    useEffect(() => {
        console.log(`numberOfRolls: ${numberOfRolls}`)
        console.log(`current highscore: ${highscore.rolls}`)
    }, [tenzies])
    
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setEndTime(Date.now())
            setHighScore(prev => {
                let res = {rolls: highscore.rolls, time: highscore.time}
                if (numberOfRolls < highscore.rolls) {
                    res.rolls = numberOfRolls
                    localStorage.setItem("highscore",JSON.stringify(res))
                    setHighScore(res)
                }
                if (timeInSeconds(startTime, endTime) < highscore.time) {
                    res.rolls = timeInSeconds(startTime, endTime)
                    localStorage.setItem("highscore",JSON.stringify(res))
                    setHighScore(res)
                }
                return res
            })
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setNumberOfRolls(prevCount => prevCount + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setNumberOfRolls(1)
            setStartTime(Date.now())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    function timeInSeconds(startTime, endTime) {
        return Math.floor((endTime-startTime)/ 1000)
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <div className="main-container">
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="blue-button" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            {tenzies ? <p>You won in {numberOfRolls} rolls in {timeInSeconds(startTime, endTime)} seconds</p> : ""}
        </div>
    )
}

export default Tenzies;