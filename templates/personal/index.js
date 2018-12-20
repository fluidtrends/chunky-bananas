module.exports = (fixture) => {
  const template = Object.assign({}, fixture)

  template.id = "personal"
  template.fixture: "starter"
  template.tags: ["personal", "branding", "starter"]
  template.chunks.intro.routes.main.cover = "This is my personal website"
  template.chunks.intro.routes.main.cover.subtitle = "I built it myself"
  template.assets["cover.r.png"] = "https://imgur.com/download/4rUQrOC"

  return template
}
