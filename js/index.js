//Monsters
document.addEventListener('DOMContentLoaded', () => {

    let limit = 50 //limit on number of monsters
    let page = 1 //page number
    let monsterURL = `http://localhost:3000/monsters/?_limit=${limit}&_page=${page}` //fluid API URL
    
    function grabDbMonsters(page) {
        fetch(`${monsterURL}?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsterDetails => renderMonsters(monsterDetails))
    }

    grabDbMonsters(page) //Invoke GET and render monsters function
    
    const nextPage = document.querySelector('#forward') //Grab next page button
    const previousPage = document.querySelector('#back') //Grab previous page button

    //Next page event listener
    nextPage.addEventListener('click', () => {
        page += 1
        monsterURL = `http://localhost:3000/monsters/?_limit=50&_page=${page}`
        monsterList.innerHTML = ''
        grabDbMonsters(page)
    })

    //Previous page event listener
    previousPage.addEventListener('click', () => {
        if(page>1) {
            page -= 1
            monsterURL = `http://localhost:3000/monsters/?_limit=50&_page=${page}`
            monsterList.innerHTML = ''
            grabDbMonsters(page)
        }
    })

    //Add monsters to web page
    const monsterList = document.querySelector('#monster-container')
    function renderMonsters(monsterDetails) {
        //Iterate over all monster details
        monsterDetails.map(eachMonster => {
            const card = document.createElement('article')
            card.innerHTML = `
                <h2>${eachMonster.name}</h2>
                <h4>${eachMonster.age}</h4>
                <p>${eachMonster.description}</p>
                <hr/>
            `;
            monsterList.appendChild(card)
        })
    } 

    //Create form to add new monster
    const monsterFormContainer = document.querySelector('#create-monster')
    const newMonsterCard = document.createElement('form')
    newMonsterCard.method = 'POST'
    newMonsterCard.id = 'new-monster-form'

    //Create card to hold details
    newMonsterCard.innerHTML = `
        <h2>New Monster Form</h2>
        <label for="name">Name: </label> <input name='monster-name' type='text' placeholder='Enter Monster Name'> <br/>
        <label for="age">Age: </label> <input name='monster-age' type='text' placeholder='Enter Monster Age'> <br/>
        <label for="description">Description: </label> <input name='monster-description' type='text' placeholder='Enter Description'> <br/>
        <button type='submit'>Create Monster</button>        
    `;

    monsterFormContainer.appendChild(newMonsterCard)

    //New monster form event handler
    newMonsterCard.addEventListener('submit', (e) => {
        e.preventDefault() //Prevent reload
        const addedName = document.querySelector('input[name="monster-name"]').value //Grab value in name field
        const addedAge = document.querySelector('input[name="monster-age"]').value //Grab value in age field
        const addedDescription = document.querySelector('input[name="monster-description"]').value //Grab description from input field

        //Create object for monster details
        const addedMonster = {
            name: addedName,
            age: addedAge,
            description :addedDescription,
        }

        //POST sequence
        fetch(monsterURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(addedMonster)  //Change POJO to JSON format      
        })
        .then(response => response.json())
        .then(newMonster => {
            console.log(newMonster) //Show new monster details
        })

        newMonsterCard.reset() //Refresh the form
    }) 
})
