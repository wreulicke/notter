
import ReactDOM from "react-dom";
import React, {useEffect, useState} from "react"
import { ReactComponentLike } from "prop-types";


const initialiState = () => JSON.parse(window.localStorage.getItem("posts") || "[\"Hello World\"]") as string[]


const post = (e: React.KeyboardEvent<HTMLTextAreaElement>, oldPosts: string[], setPosts: (st: string[]) => void) => {
  if (e.key === "Enter" && e.currentTarget.value !== "") {
    const text = e.currentTarget.value
    setPosts([text].concat(oldPosts))
    e.currentTarget.value = ""
    e.currentTarget.selectionStart = 0
    e.currentTarget.selectionEnd = 0
    e.preventDefault()
  }
}

const Root:ReactComponentLike = () => {
  const [posts, setPosts] = useState(initialiState)
  useEffect(() => {
    window.localStorage.setItem("posts", JSON.stringify(posts))
  }, [posts])
  return <div>
  <textarea
    style={{
      position: "fixed",
      bottom: "1em",
      height: "5em"
    }}
    onKeyPress = {(e) => post(e, posts, setPosts)}
    name="post"
    className="post"
  ></textarea>
  <div style={{
    width: "100%",
    marginBottom: "5em"
  }}>
    {
      posts.map((t, i) => <div key = {i} style={{
        paddingBottom: "0.5em",
        width: "100%",
        paddingTop: "0.5em",
        borderBottom: "1px solid #e6ecf0"
      }}>{t}</div>)
    }
  </div>
</div>
}

ReactDOM.render(
  <Root/>,
  document.getElementById('container')
);