// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://playground-d4953-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const publishBtn = document.getElementById('publish-btn')
const endorsementInputField = document.getElementById('endorsement-input-field')
const listOfEndorsements = document.getElementById('list-of-endorsements')

publishBtn.addEventListener('click', publishEndorsement)

function publishEndorsement() { 
  const userEndorsement = endorsementInputField.value
  clearEndorsementInputfield()
  //push to data base the value of userEdorsement
  push(endorsementsInDB, userEndorsement)
}

function clearEndorsementInputfield() {
  endorsementInputField.value = ""
}

function renderEndorsement(endorsementMessage) {
  const newListItem = document.createElement('li')
  newListItem.textContent = endorsementMessage
  listOfEndorsements.append(newListItem)
}

onValue(endorsementsInDB, function(snapshot) {
  const endorsementsArray = Object.entries(snapshot.val())

  endorsementsArray.forEach(function (endorsement) {
    // endorsement[1] = the value
    renderEndorsement(endorsement[1])
  })
  
  
})

function clearEndorsementList() {
  listOfEndorsements.innerHTML = ""
}

