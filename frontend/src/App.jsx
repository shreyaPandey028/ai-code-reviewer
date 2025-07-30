import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [review]) // re-highlight when review content changes

  async function reviewCode() {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:4000/ai/get-review', { code })

     if (response.data && response.data.response) {
  setReview(response.data.response)
} else {
  setReview("⚠️ Unexpected response format from server.")
}

    } catch (error) {
      console.error("Error reviewing code:", error)
      setReview("❌ Error while getting code review.")
    }
    setLoading(false)
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
              backgroundColor: "#0c0c0c",
              color: "#ffffff"
            }}
          />
        </div>
        <div
          onClick={loading ? null : reviewCode}
          className="review"
          style={{
            opacity: loading ? 0.6 : 1,
            pointerEvents: loading ? "none" : "auto"
          }}
        >
          {loading ? "Reviewing..." : "Review"}
        </div>
      </div>

      <div className="right">
        <Markdown
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <pre className={className}><code {...props}>{children}</code></pre>
              ) : (
                <code className={className} {...props}>{children}</code>
              )
            }
          }}
        >
          {review || ""}
        </Markdown>
      </div>
    </main>
  )
}

export default App
