import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, CardHeader, Button, CardColumns, CardFooter } from 'reactstrap';
 import dateformat from 'dateformat';

// You can attach your API key to a request in one of three ways:
// Via the apiKey querystring parameter.
// Via the X-Api-Key HTTP header.
// Via the Authorization HTTP header. Bearer optional, do not base 64 encode.
// We strongly recommend the either of latter 2 so that your API key isn't visible to others in logs or request sniffing.
let API_KEY = 'e238e021e36a4141aac512a02d5fe346';

class News extends Component {

	constructor(props){
		super(props);
		this.state = {
			data: [],
			dataReceived: false
		}
		this.getNews = this.getNews.bind(this);
		this.renderNews = this.renderNews.bind(this);
	}

	componentDidMount(){
		console.log('hello News')
		this.getNews();
	}

	getNews(){
		axios.get(`https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=${API_KEY}`)
			.then(response => {
				console.log('response from news API is', response.data.articles)
				this.setState({data: response.data.articles, dataReceived: true })
			})
	}

	renderNews(){
		let newsCards = [];
		console.log('data in renderNews is', this.state.data)
		this.state.data.forEach(article => {
			let published = dateformat(article.publishedAt, "fullDate")
			newsCards.push(
				 <Card>
				 	<CardHeader tag="h3">{article.title}</CardHeader>
		        <img width="100%" src={article.urlToImage} alt="Card image cap" />
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
		return(
		<div style={{margin: 1 + '%'}} className="row">
				<Sidebar logout={this.props.logout} data={this.state.allCoinData} user={this.props.user} url={this.props.url} getData={this.props.routeProps.location.getData} />
					<div className="col-lg-8 content mt-3 mb-5">
						<div class="column">
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
	  	</div>
			)
	}

}

export default News;