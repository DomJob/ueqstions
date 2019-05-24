import React, { useState, useEffect } from "react";
import { QuestionsList } from "./QuestionsList";
import { RouteComponentProps } from "react-router";
import { question } from "../types";
import { from } from "rxjs";
import { getByDate } from "../service/questionService";
import { NavLink } from "react-router-dom";
import "./MainPage.css";

type RouteParams = {
  date: string;
};

export default function SingleQuestionPage(
  props: RouteComponentProps<RouteParams>
) {
  const [questions, setQuestions] = useState<question[]>([]);

  useEffect(() => {
    let sub = from(getByDate(props.match.params.date)).subscribe(res =>
      setQuestions(res.result)
    );

    return () => {
      if (sub) sub.unsubscribe();
    };
  });

  return (
    <div>
      <h1 className="App-header">
        <NavLink to="/" className="App-header go-back">
          <span className="white">ue</span>
          <span className="q">q</span>
          <span className="white">stions</span>
        </NavLink>
      </h1>

      <QuestionsList questions={questions} moreQuestions={false} />
    </div>
  );
}
