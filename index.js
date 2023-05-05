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
const fromInputField = document.getElementById('from-input-field')
const toInputField = document.getElementById('to-input-field')
const listOfEndorsements = document.getElementById('list-of-endorsements')


endorsementInputField.addEventListener('input', activatePublishBtn)

function activatePublishBtn() {
  //checks if there's an input by user
  if (endorsementInputField.value) {
      publishBtn.disabled = false
      publishBtn.classList.remove('disabled-btn')
  } else {
      publishBtn.classList.add('disabled-btn')
      publishBtn.disabled = true
  }   
}


publishBtn.addEventListener('click', publishEndorsement)

function publishEndorsement() { 
  //INSERT CODE HERE
  const endorsement =  {
    senderName: fromInputField.value,
    reciverName: toInputField.value,
    message: endorsementInputField.value,
    numOfLikes: 0
  }
  
  
  clearEndorsementInputfield()
  //push to data base the value of userEdorsement
  push(endorsementsInDB, endorsement)
}

function clearEndorsementInputfield() {
  endorsementInputField.value = ""
}

onValue(endorsementsInDB, function(snapshot) {
  const endorsementsArray = Object.entries(snapshot.val())

  clearEndorsementList()

  endorsementsArray.forEach(function (endorsement) {
    // endorsement[1] = the value
    const htmlListItem = `
      <li class="card">
        <div class="card-header">
          To <span>${endorsement[1].reciverName}</span>
        </div>
        ${endorsement[1].message} 
        <div class="card-footer">
          From&nbsp;<span>${endorsement[1].senderName}</span>
          <div class="likes-container">
            <span id="like-icon-btn" class="like-icon-btn">&hearts;</span> <span id="total-likes">${endorsement[1].numOfLikes}</span>
          </div>
        </div>
      </li>
    `
    listOfEndorsements.innerHTML += htmlListItem
  })
})

function clearEndorsementList() {
  listOfEndorsements.innerHTML = ""
}

