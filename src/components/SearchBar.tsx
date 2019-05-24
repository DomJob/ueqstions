import React from "react";
import "./SearchBar.css";

type sbProps = {
  onInputChanged: (q: string) => void;
};

export function SearchBar(props: sbProps) {
  let timer: NodeJS.Timeout;

  function onChanged(q: string) {
    clearTimeout(timer);
    timer = setTimeout(() => props.onInputChanged(q), 500);
  }

  return (
    <div>
      <input
        className="form-control"
        placeholder="search..."
        onChange={e => onChanged(e.target.value)}
      />
    </div>
  );
}
