import React from 'react'
import Card from './Card'

const TRENDING_QUERY =  `
query ($page: Int, $perPage:Int) {
    Page (page:$page, perPage:$perPage){
        mediaTrends{
            media{
                id
                title {
                    romaji
                    english
                    native
                }
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
            page: 1,
            perPage: 20
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
        this.setState( {result: data} )
        console.log( this.result );
    }
    
    handleError = (error) => {
        console.error(error);
    }
    render(){
        return(
            <div className="dis">
                {this.state.result ? this.state.result.data.Page.mediaTrends.map( ({media}) => <Card result = {media} key={media.id}></Card>) : null}
            </div>
        )
    }

}
export default Trending