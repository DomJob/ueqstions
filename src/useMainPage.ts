import { useState, useEffect, useRef } from "react";
import { question } from "./types";
import { from, Subscription } from "rxjs";
import { getRecent, search } from "./service/questionService";

export default function useMainPage(query: string) {
  const [questions, setQuestions] = useState<question[]>([]);
  const [nbFetch, setNbFetch] = useState<number>(0);
  const [moreQuestions, setMoreQuestions] = useState<boolean>(true);

  const getQuestionsSub = useRef<Subscription>();

  useEffect(() => {
    fetchQuestions();

    return () => {
      if (getQuestionsSub.current) {
        getQuestionsSub.current.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!query) {
      fetchQuestions();
      return;
    }
    setNbFetch(n => n + 1);

    setQuestions([]);

    getQuestionsSub.current = from(search(query))
      .subscribe(res => setQuestions(res.result))
      .add(() => setNbFetch(n => n - 1));

    return () => {
      if (getQuestionsSub.current) {
        getQuestionsSub.current.unsubscribe();
      }
    };
  }, [query]);

  useEffect(() => {
    setMoreQuestions(questions.length % 25 === 0);
  }, [questions]);

  function fetchQuestions() {
    setNbFetch(n => n + 1);

    setQuestions([]);

    getQuestionsSub.current = from(getRecent())
      .subscribe(res => setQuestions(res.result))
      .add(() => setNbFetch(n => n - 1));
  }

  function loadMore() {
    if (!questions) {
      fetchQuestions();
      return;
    }
    let after = questions[questions.length - 1].date;

    setMoreQuestions(false);
    setNbFetch(n => n + 1);

    let req = query ? search(query, after) : getRecent(after);

    getQuestionsSub.current = from(req)
      .subscribe(res => {
        if (res.result.length < 25) setMoreQuestions(false);

        setQuestions(prev => prev.concat(res.result));
      })
      .add(() => setNbFetch(n => n - 1));
  }

  return { questions, loadMore, nbFetch, moreQuestions };
}
