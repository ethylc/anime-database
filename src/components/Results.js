import React from 'react'
import Card from './Card'

const SEARCH_QUERY = `
query ($page: Int, $search: String, $year: Int, $season: MediaSeason) {
  Page (page: $page) {
    media (search: $search, seasonYear: $year, season: $season, type: ANIME) {
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
      description
      genres
      season
      seasonYear
    }
  }
}
`;

class Results extends React.Component{
    constructor(props) {
        super(props)
        const query = SEARCH_QUERY
        const variables = {
            page: 1,
            search: this.props.name,
            year: this.props.year,
            season: this.props.season
        }
        this.state = {
            result: null,
            url: 'https://graphql.anilist.co',
            variables,
            query
        }
    }

    makeNewOptions(query, variables){
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
        return options
    }

    componentDidMount() {
        const options = this.makeNewOptions(this.state.query, this.state.variables)
        fetch (this.state.url, options).then(this.handleResponse)
        .then(this.handleData)
        .catch(this.handleError);
    }

    componentDidUpdate(prevProps, prevState) {
        if ( prevProps.name !== this.props.name || prevProps.year !== this.props.year || prevProps.season !== this.props.season ){
            this.setState({variables: {
                ...this.state.variables,
                search:this.props.name,
                year:this.props.year,
                season:this.props.season
            }})
        }
        if (prevState.variables !== this.state.variables) {
            const options = this.makeNewOptions(this.state.query, this.state.variables)
            fetch (this.state.url, options).then(this.handleResponse)
            .then(this.handleData)
            .catch(this.handleError);
        }
    }
    
    handleResponse = (response) => {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }
    
    handleData = (data) => {
        const categories = data.data.Page.media
        //.map(({media})=> media)
        .reduce((acc, media)=>{
            const {format} = media;
            if (format !== 'MUSIC'){
                if(acc[format] === undefined) acc[format] = [];
                acc[format].push(media);
            }
            return acc;
        }, {});
        this.setState( {result: categories} )
        //console.log(categories)
    }
    
    handleError = (error) => {
        console.error(error);
    }
    render(){
        return(
            <div className = "dis">
                {!this.state.result ? null : Object.keys(this.state.result).length === 0 ? <span>No Results Found</span> : Object.keys(this.state.result).map( title => <div key = {title}><h2>{title}</h2> 
                <div className = "category-row">{this.state.result[title].map( media => <Card result = {media} key = {media.id} selectedCard = {this.props.selected}></Card>)} </div></div>) }
            </div>
        )
    }

}

export default Results