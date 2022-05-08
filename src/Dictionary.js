import React, { useState } from "react";
import axios from "axios";
const Dictionary = () => {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setData(null);
    setWord("");

    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        const data = response.data;
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 bg-white">
      <h1 className="mb-10 text-5xl font-bold">Definition App</h1>
      <form
        onSubmit={handleSearch}
        className="px-2 py-4 border-2 border-black rounded-xl w-96"
      >
        <div className="flex flex-col space-y-4">
          <label>Word:</label>
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="px-2 py-1 border-2 border-black rounded-lg focus:outline-none"
          />
          <button type="submit" className="border-2 border-black rounded-lg">
            Search 🔎
          </button>
        </div>
      </form>
      {data !== null ? (
        <div className="flex flex-col py-4 space-y-4 w-96 rounded-xl ">
          <h1 className="text-4xl italic font-semibold">
            {data[0].word}{" "}
            <span className="text-lg">{data[0].meanings[1].partOfSpeech}</span>
          </h1>
          <p className="text-xl">Definitions:</p>
          <div className="flex flex-col space-y-4">
            {data[0].meanings[1].definitions.map((element, i) => {
              return (
                <p className="text-lg">
                  {i + 1}. {element.definition}
                </p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dictionary;
