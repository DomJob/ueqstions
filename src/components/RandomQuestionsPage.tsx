import React, { useState, useEffect, useRef } from "react";
import { from, Subscription } from "rxjs";
import { QuestionsList } from "./QuestionsList";
import { question } from "../types";
import { NavLink } from "react-router-dom";
import { random } from "../service/questionService";

export function RandomQuestionsPage() {
  const [questions, setQuestions] = useState<question[]>([]);
  const [nbFetch, setNbFetch] = useState<number>(0);
  const [moreQuestions, setMoreQuestions] = useState<boolean>(true);

  const getQuestionsSub = useRef<Subscription>();

  useEffect(() => {
    fetchMoreQuestions();
  }, []);

  function fetchMoreQuestions() {
    setNbFetch(n => n + 1);
    setMoreQuestions(false);
    let req = random();

    getQuestionsSub.current = from(req)
      .subscribe(res => {
        setQuestions(prev => prev.concat(res.result));
      })
      .add(() => {
        setNbFetch(n => n - 1);
        setMoreQuestions(true);
      });
  }

  return (
    <div>
      <h1 className="App-header">
        <NavLink to="/" className="App-header go-back">
          <span className="white">ue</span>
          <span className="q">q</span>
          <span className="white">stions</span>
        </NavLink>
      </h1>
      <QuestionsList
        questions={questions}
        previousLabel="MORE QUESTIONS"
        moreQuestions={moreQuestions}
        onClickMore={fetchMoreQuestions}
      />

      {nbFetch > 0 ? "loading..." : ""}
    </div>
  );
}
