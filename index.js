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

fromInputField.addEventListener('input', activatePublishBtn)

toInputField.addEventListener('input', activatePublishBtn)



function activatePublishBtn() {
  //checks if there's an input by user
  if (fromInputField.value && toInputField.value && endorsementInputField.value) {
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
    senderName: captilizeString(fromInputField.value) ,
    reciverName: captilizeString(toInputField.value),
    message: endorsementInputField.value,
    numOfLikes: 0
  }

  clearInputfield(endorsementInputField)
  clearInputfield(fromInputField)
  clearInputfield(toInputField)

  //push to data base the value of userEdorsement
  push(endorsementsInDB, endorsement)
}

function captilizeString(string) {
  return string.charAt(0).toUpperCase() + string.substring(1)
}

function clearInputfield(inputField) {
  inputField.value = ""
}

onValue(endorsementsInDB, function(snapshot) {
  const endorsementsArray = Object.entries(snapshot.val())

  clearEndorsementList()

  endorsementsArray.forEach(function (endorsement) {
    const newListItem = document.createElement('li')
    newListItem.classList.add('card')
    
    const listItemInnerHTML = `

        <div class="card-header">
          To <span>${endorsement[1].reciverName}</span>
        </div>
        ${endorsement[1].message} 
        <div class="card-footer">
          From&nbsp;<span>${endorsement[1].senderName}</span>
          <div class="likes-container">
            <span class="like-icon-btn" id="${endorsement[0]}">&hearts;</span> ${endorsement[1].numOfLikes}
          </div>
        </div>

    `
    newListItem.innerHTML = listItemInnerHTML

    listOfEndorsements.append(newListItem)


  })
})

function clearEndorsementList() {
  listOfEndorsements.innerHTML = ""
}

