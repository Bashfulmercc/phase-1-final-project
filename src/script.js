function populatePlayers(player) {
  const playerList = document.getElementById("player-list")
  const div = document.createElement("div")
  div.classList.add("card")
  const name = document.createElement("h1")
  name.textContent = player.name
  const PPG = document.createElement("h3")
  PPG.textContent = `${player.PPG} PPG`
  const RPG = document.createElement("h3")
  RPG.textContent = `${player.RPG} RPG`
  const teams = document.createElement("h3")
  teams.textContent = `Teams: ${player.teams}`
  const achievements = document.createElement("h3")
  achievements.textContent = `Achievements: ${player.achievements}`
  const img = document.createElement("img")
  img.src = player.image
  img.classList.add("player-photo")
  const p = document.createElement("p")
  p.textContent = `${player.votes} votes`
  p.dataset.votes = player.votes
  p.id = player.id
  const button = document.createElement("button")
  button.classList.add("vote-btn")
  button.textContent = "Vote"
  button.id = player.id
  div.append(name, PPG, RPG, teams, achievements, img, p, button)
  playerList.append(div)
}

function getPlayers() {
  fetch("http://localhost:3000/players")
  .then(resp => resp.json())
  .then(data => data.forEach(player => populatePlayers(player)))
}

