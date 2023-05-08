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

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#create-player-btn");
  const playerContainer = document.querySelector(".container");
  const form = document.querySelector(".add-player-form")
  form.addEventListener("submit", addYourPlayer)
  let addPlayer = false;
  playerContainer.style.display = "none";
  addBtn.addEventListener("click", () => {
    addPlayer = !addPlayer;
    if (addPlayer) {
      playerContainer.style.display = "block";
    } else {
      playerContainer.style.display = "none";
    }
  });
  getPlayers()
});



function addYourPlayer(e) {
  e.preventDefault()
  const [name, PPG, RPG, teams, achievements, image] = e.target

  fetch("http://localhost:3000/players", {
    method: "POST", 
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: name.value,
      PPG: PPG.value,
      RPG: RPG.value,
      teams: teams.value,
      achievements: achievements.value,
      image: image.value,
      votes: 0
    })
  })
  .then(resp => resp.json())
  .then(resp => populatePlayers(resp))
  name.value = ""
  PPG.value = ""
  RPG.value = ""
  teams.value = ""
  achievements.value = ""
  image.value = ""
}


