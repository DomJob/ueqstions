import React from "react";
import { question } from "../types";
import { formatDate } from "../util";
import "./Question.css";
import { NavLink } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

type props = {
  question: question;
};

export function Question(props: props) {
  return (
    <div className="whole-question">
      <NavLink to={"/question/" + props.question.date} className="date">
        {formatDate(props.question.date)}
      </NavLink>
      {props.question.body.map((d, i) => {
        if (d.answer) {
          return (
            <div key={i} className="answer">
              {ReactHtmlParser(d.answer)}
            </div>
          );
        } else if (d.question) {
          return (
            <span
              key={i}
              className={"question" + (i > 0 ? " question-other" : "")}
            >
              {ReactHtmlParser(d.question)}
            </span>
          );
        }
      })}
    </div>
  );
}
