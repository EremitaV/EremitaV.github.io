import React, {useState} from "react";

export default function QuizOption(props) {
    const styles = {
        backgroundColor: 'green'
    }

    return (
        <div 
            onClick={() => props.handleClick()}
            className={props.chosen
                ? props.isCorrect ? "option-chosen" : "option-wrong"
                : "option-notchosen"}
        >{props.option}</div>
    )
}