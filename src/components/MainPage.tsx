import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { QuestionsList } from "./QuestionsList";
import useMainPage from "../useMainPage";
import "./MainPage.css";

export default function MainPage() {
  const [query, setQuery] = useState<string>("");

  const { questions, loadMore, nbFetch, moreQuestions } = useMainPage(query);

  return (
    <div className="App">
      <h1 className="App-header">
        ue<span className="q">q</span>stions
      </h1>
      <SearchBar onInputChanged={(q: string) => setQuery(q)} />

      <QuestionsList
        questions={questions}
        onClickedPrevious={() => loadMore()}
        moreQuestions={moreQuestions}
      />

      {nbFetch > 0 ? "loading..." : ""}
    </div>
  );
}
