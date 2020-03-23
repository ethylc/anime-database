import React from 'react'

function Search({handleInput, search}){

    return (        
        <div>
            <section className="searchbox-wrap">
                <input type="text"
                placeholder="Search Anime..."
                className="searchbox"
                onChange={handleInput}
                onKeyPress={search}></input>
            </section>
        </div>
    )
}

export default Search