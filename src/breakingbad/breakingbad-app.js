


/**
 * @returns {Promise<Object>} character information
 */

const fetchApp = async() => {

    const value = () => {
        let number = Math.random()*10
        return Math.round(number)
    }

    const res = await fetch(`https://rickandmortyapi.com/api/character/${ value() }`);
    const data = await res.json();
    return data;
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async( element ) => {

    document.querySelector('#app-title').innerHTML = 'Breakingbad App'
    element.innerHTML = 'Loading...'

    const nameLabel = document.createElement('blockquote');
    const statusLabel = document.createElement('h3');
    const nextCharacterBtn = document.createElement('button');

    nextCharacterBtn.innerHTML = 'Next Character'

    const renderCharacter = ( data ) => {
        nameLabel.innerHTML = data.name
        statusLabel.innerHTML = data.status
        element.replaceChildren( nameLabel, statusLabel, nextCharacterBtn );
    }

    //Evento
    nextCharacterBtn.addEventListener('click', () => {
    

        setTimeout(() => {
            
        element.innerHTML = ('Loading...') ? nextCharacterBtn.disabled === true : nextCharacterBtn.disabled === false;
    
        fetchApp()
        .then( renderCharacter )

        },500)
    })

    fetchApp()
    .then( renderCharacter )

}