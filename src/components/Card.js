import React from 'react'


function Card({result, selectedCard}){

    return(
        <div className='card' onClick = {() => selectedCard(result)}>
            <img src={result.coverImage.large} alt={result.title.english}></img>
            <h3>{result.title.english ? result.title.english : result.title.romaji}</h3>
        </div>
    )
}

export default Card