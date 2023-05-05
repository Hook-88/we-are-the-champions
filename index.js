// javascript
const publishBtn = document.getElementById('publish-btn')
const endorsementInputField = document.getElementById('endorsement-input-field')
const listOfEndorsements = document.getElementById('list-of-endorsements')

publishBtn.addEventListener('click', publishEndorsement)

function publishEndorsement() { 
  const userEndorsement = endorsementInputField.value
  clearEndorsementInputfield()
  renderEndorsement(userEndorsement)
}

function clearEndorsementInputfield() {
  endorsementInputField.value = ""
}

function renderEndorsement(endorsementMessage) {
  const newListItem = document.createElement('li')
  newListItem.textContent = endorsementMessage
  listOfEndorsements.append(newListItem)
}

