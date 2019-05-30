import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { QuestionsList } from "./QuestionsList";
import useMainPage from "../useMainPage";
import "./MainPage.css";
import { NavLink } from "react-router-dom";

export default function MainPage() {
  const [query, setQuery] = useState<string>("");

  const { questions, loadMore, nbFetch, moreQuestions } = useMainPage(query);

  return (
    <div className="App">
      <h1 className="App-header">
        ue
        <NavLink to="/random" className="q">
          q
        </NavLink>
        stions
      </h1>
      <SearchBar onInputChanged={(q: string) => setQuery(q)} />

      <QuestionsList
        questions={questions}
        onClickMore={() => loadMore()}
        moreQuestions={moreQuestions}
      />

      {nbFetch > 0 ? "loading..." : ""}
    </div>
  );
}
