module.exports = (props) => ({
  name: props.name || "Chunky",
  version: props.version || "0.1.0",
  description: props.description || "This is Chunky",
  scripts: {
    test: "react-savor test",
    lint: "react-savor lint",
    coverage: "react-savor coverage",
    codeclimate: "react-savor codeclimate"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/fluidtrends/chunky.git"
  },
  homepage: "http://www.chunky.io",
  dependencies: {
    "react-dom-chunky": "latest"
  },
  devDependencies: {
   "react-savor": "latest"
  }
})
