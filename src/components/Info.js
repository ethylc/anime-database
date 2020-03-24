import React from 'react'

function Info({selected, close}){
    const style = {
        backgroundImage: 'linear-gradient(0deg, rgba(0, 21, 39,.9), rgba(0, 21, 39,.5)), url(' + selected.bannerImage + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'auto 100%',
        backgroundPosition: 'center'
      };
    return(
        <section className="popup" style={style}>
            <div className = "content">
                <button className = "close" onClick = {close}>←</button>
                <h2>{selected.title.english ? selected.title.english : selected.title.romaji}</h2>
                <div className ="plot">
                    <img src = {selected.coverImage.large} alt = {selected.title.english}/>
                    <p>{selected.description}</p>
                </div>
                <p style={{textAlign:'center'}}>Genre: {selected.genres.map(gen => <span className = "tag" key={gen}>{gen}</span>)}</p>
            </div>
        </section>
    )
}

export default Info;