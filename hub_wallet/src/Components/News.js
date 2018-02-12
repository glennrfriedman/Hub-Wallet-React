import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardText, CardBody, CardHeader, Button, CardColumns, CardFooter } from 'reactstrap';
import dateformat from 'dateformat';
require('dotenv').config()
let API_KEY = process.env.REACT_APP_NEWS_API_KEY;

class News extends Component {

	constructor(props){
		super(props);
		this.state = {
			newsData: [],
			dataReceived: false,
		}
		this.getNews = this.getNews.bind(this);
		this.renderNews = this.renderNews.bind(this);
	}

	componentDidMount(){
		this.getNews();
		// console.log('this.state in news is', this.state)
	}

	getNews(){
		axios.get(`https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=${API_KEY}`)
			.then(response => {
				// console.log('response from news API is', response.data.articles)
				this.setState({newsData: response.data.articles, dataReceived: true })
			})
	}

	renderNews(){
		let newsCards = [];
		// console.log('data in renderNews is', this.state.data)
		this.state.newsData.forEach(article => {
			let published = dateformat(article.publishedAt, "fullDate")
			newsCards.push(
				 <Card key={article.title}>
				 	<CardHeader tag="h3">{article.title}</CardHeader>
		        <img width="100%" src={article.urlToImage} alt={article.source.name} />
		        <CardBody>
		          <CardText>{article.description}</CardText>
		          <Button color="primary" href={article.url} target="_blank">Read More</Button>
		        </CardBody>
		        <CardFooter>Published: {published}</CardFooter>
		      </Card>
				)
			return newsCards
		})
		return newsCards
	}

	render(){
		// console.log('this.routeProps are', this.props.routeProps.location)
		return(
					<div className="col-lg-8 content mt-3 mb-5">
						<div className="column">
	        	<div className="dashhead">
									<div className="dashhead-titles">
									    <h6 className="dashhead-subtitle">Hub</h6>
									    <h2 className="dashhead-title">News</h2>
									 </div>
									 <div className="dashhead-toolbar" style={{display: "flex", flexDirection: "row"}}>
  										<small>Powered by newsAPI.org</small>
							  </div>
								</div>
						</div>
						<div className="hr-divider">
	  						<h3 className="hr-divider-content hr-divider-heading">Crypto News</h3>
	  				</div>
	  				{this.state.dataReceived &&
	  					<CardColumns>
	  						{this.renderNews()}
	  					</CardColumns>}
	  			</div>
			)
	}

}

export default News;