import React,{useEffect} from 'react'

function Info({selected, close}){
    const style = {
        backgroundImage: 'linear-gradient(0deg, rgba(0, 21, 39, 0.9), rgba(0, 21, 39, 0.6)), url(' + selected.bannerImage + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        backgroundPosition: 'center'
      };

    useEffect(() => {
    document.body.style.overflow = 'hidden';
    return ()=> document.body.style.overflow = 'unset';
    }, []);

    return(
        <section className="popup" style={style}>
            <button className = "close" onClick = {close}>⇦</button>
            <div className = "content">
                <h2>{selected.title.english ? selected.title.english : selected.title.romaji}</h2>
                <h3 style={{color: selected.season === "WINTER"? "cornflowerblue" : selected.season === "SUMMER" ? "khaki": selected.season === "FALL"? "darkorange" : "salmon"}}>
                    {selected.season}{selected.season && selected.seasonYear ? " • " : null}{selected.seasonYear}</h3>
                <div className ="plot">
                    <img src = {selected.coverImage.large} alt = {selected.title.english}/>
                    <p dangerouslySetInnerHTML = {{__html: selected.description}}></p>
                </div>
                <p style={{textAlign:'center'}}>Genre: {selected.genres.map(gen => <span className = "tag" key={gen}>{gen}</span>)}</p>
            </div>
        </section>
    )
}

export default Info;