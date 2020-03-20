import React from 'react'

function Card({result}){
    return(
        <div className='card'>
            <img src={result.coverImage.large} alt={result.title.english}></img>
            <h3>{result.title.english}</h3>
        </div>
    )
}

export default Card