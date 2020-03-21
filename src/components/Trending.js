import React from 'react'
import Card from './Card'

const TRENDING_QUERY =  `
query ($page: Int) {
    Page (page:$page){
        mediaTrends{
            media{
                id
                title {
                    romaji
                    english
                    native
                }
                format
                coverImage{
                    large
                }
                bannerImage
            }
        }
    }
}
`

class Trending extends React.Component{
    constructor(props) {
        super(props)
        const query = TRENDING_QUERY
        const variables = {
            page: 1
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables
            })
        }
        this.state = {
            result: null,
            url: 'https://graphql.anilist.co',
            variables,
            options,
            query
        }
    }

    componentDidMount(){
        fetch (this.state.url, this.state.options).then(this.handleResponse)
        .then(this.handleData)
        .catch(this.handleError);
    }
    
    handleResponse = (response) => {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }
    
    handleData = (data) => {
        const categories = data.data.Page.mediaTrends
        //.map(({media})=> media)
        .reduce((acc, media)=>{
            const {format} = media.media;
            if(acc[format] === undefined) acc[format] = [];
            acc[format].push(media);
            return acc;
        }, {});
        this.setState( {result: categories} )
        //const printlog = Object.keys(categories).map(cat => categories[cat].map(med => med.media.id));
    }
    
    handleError = (error) => {
        console.error(error);
    }
    render(){
        return(
            <div className = "dis">
                {/* { this.state.result ? this.state.result.data.Page.mediaTrends.map( ({media}) => <Card result = {media} key = {media.id}></Card>) : null} */}
                {this.state.result ? Object.keys(this.state.result).map( title => <div><h1>{title}</h1> 
                <div className = "category-row">{this.state.result[title].map( media => <Card result = {media.media} key = {media.media.id}></Card>)} </div></div>) : null }
            </div>
        )
    }
}
export default Trending