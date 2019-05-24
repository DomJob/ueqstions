import { question } from "../types";

type questionsResult = {
  result: question[];
};

export async function getRecent(after?: string): Promise<questionsResult> {
  let url = "https://ueqstions.dom.gg/api/questions";
  if (after) url += "?after=" + after;

  const response = await fetch(url);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unexpected error");
  }
}

export async function search(
  query: string,
  after?: string
): Promise<questionsResult> {
  let url = "https://ueqstions.dom.gg/api/search?q=" + query;
  if (after) url += "&after=" + after;

  const response = await fetch(url);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unexpected error");
  }
}

export async function getByDate(date: string): Promise<questionsResult> {
  let url = "https://ueqstions.dom.gg/api/question?date=" + date;
  const response = await fetch(url);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unexpected error");
  }
}
