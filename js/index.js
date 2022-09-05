//Monsters
document.addEventListener('DOMContentLoaded', () => {

    let limit = 50
    let page = 1
    let monsterURL = `http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`
    
    function grabDbMonsters(page) {
        fetch(`${monsterURL}?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsterDetails => renderMonsters(monsterDetails))
    }
    grabDbMonsters(page)
    
    const nextPage = document.querySelector('#forward')
    const previousPage = document.querySelector('#back')

    nextPage.addEventListener('click', () => {
        page += 1
        monsterURL = `http://localhost:3000/monsters/?_limit=50&_page=${page}`
        monsterList.innerHTML = ''
        grabDbMonsters(page)
    })

    previousPage.addEventListener('click', () => {
        if(page>1) {
            page -= 1
            monsterURL = `http://localhost:3000/monsters/?_limit=50&_page=${page}`
            monsterList.innerHTML = ''
            grabDbMonsters(page)
        }
    })

    const monsterList = document.querySelector('#monster-container')
    function renderMonsters(monsterDetails) {
        monsterDetails.map(eachMonster => {
            const card = document.createElement('article')
            card.innerHTML = `
                <h2>${eachMonster.name}</h2>
                <h4>${eachMonster.age}</h4>
                <p>${eachMonster.description}</p>
                <hr/>
            `
            monsterList.appendChild(card)
        })
    }   
    
    const monsterFormContainer = document.querySelector('#create-monster')
    const newMonsterCard = document.createElement('form')
    newMonsterCard.method = 'POST'
    newMonsterCard.id = 'new-monster-form'
    newMonsterCard.innerHTML = `
        <h2>New Monster Form</h2>
        <label for="name">Name: </label> <input name='monster-name' type='text' placeholder='Enter Monster Name'> <br/>
        <label for="age">Age: </label> <input name='monster-age' type='text' placeholder='Enter Monster Age'> <br/>
        <label for="description">Description: </label> <input name='monster-description' type='text' placeholder='Enter Description'> <br/>
        <button type='submit'>Create Monster</button>        
    `

    monsterFormContainer.appendChild(newMonsterCard)

    newMonsterCard.addEventListener('submit', (e) => {
        e.preventDefault()
        const addedName = document.querySelector('input[name="monster-name"]').value
        const addedAge = document.querySelector('input[name="monster-age"]').value
        const addedDescription = document.querySelector('input[name="monster-description"]').value

        const addedMonster = {
            name: addedName,
            age: addedAge,
            description :addedDescription,
        }

        fetch(monsterURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(addedMonster)        
        })
        .then(response => response.json())
        .then(newMonster => {
            console.log(newMonster)
        })

        newMonsterCard.reset()
    }) 
})
