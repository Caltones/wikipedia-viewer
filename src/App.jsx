import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);
  const changeHandler = (e) => {
    setText(e.target.value);
  };
  const search = () => {
    if (text === "") return;
    const regexStr = text.replace(/\s/g, "%20");
    const app = document.getElementById("root");
    app.style.margin = 0;
    fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${regexStr}&format=json`
    )
      .then((val) => val.json())
      .then((res) => {
        setResult(res.query.search);
      });
  };
  return (
    <div className="App">
      <h2>
        Click{" "}
        <a
          id={"top"}
          target={"_blank"}
          href={"https://en.wikipedia.org/wiki/Special:Random"}
        >
          here
        </a>{" "}
        for random page🎲
      </h2>
      <div id="searchbar">
        <input type="text" name="search" id="search"  onChange={changeHandler} />
        <button onClick={search}>🔍</button>
      </div>
      <div id="searchresult">
        <p>
          {result.length > 0 ? (
            <ul>
              {result.map((v) => (
                <li>
                  <h3>
                    {v.title}{" "}
                    <a
                      className="detail"
                      target={"_blank"}
                      href={`https://en.wikipedia.org/wiki/${v.title.replace(
                        /\s/g,
                        "_"
                      )}`}
                    >
                      <svg viewBox="0 0 448 512" title="plus">
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </a>
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: v.snippet }}></p>
                </li>
              ))}
            </ul>
          ) : (
            " "
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
