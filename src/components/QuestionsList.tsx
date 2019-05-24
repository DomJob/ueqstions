import React from "react";
import { question } from "../types";
import { Question } from "./Question";

type qlProps = {
  questions: question[];
  onClickedPrevious?: () => void;
  moreQuestions: boolean;
};

export function QuestionsList(props: qlProps) {
  return (
    <div className="questions-list">
      {props.questions.map((q, i) => (
        <Question key={i} question={q} />
      ))}

      {props.moreQuestions && props.questions.length > 0 ? (
        <u onClick={() => props.onClickedPrevious!()}>PREVIOUS QUESTIONS</u>
      ) : (
        ""
      )}
    </div>
  );
}
