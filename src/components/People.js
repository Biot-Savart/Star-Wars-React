import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Moment from "react-moment";
import Planet from "./Planet";
 
class People extends Component {
	constructor() {
  		super();
 		this.state={items:[], searching: false};
 		this.page = 1;
    this.search = "";
    this.searchInterval = null;

 		this.handleNextClick = this.handleNextClick.bind(this);
 		this.handlePreviousClick = this.handlePreviousClick.bind(this);
 		this.handleSearchClick = this.handleSearchClick.bind(this);
 		this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
  	fetch("https://swapi.co/api/people")
 		.then(result=>result.json())
    	.then(items=>this.setState({items}));    
  }
  handleNextClick() {
  	if (this.state.items.next != null)
  	{
  		this.page = this.page + 1;
    	fetch("https://swapi.co/api/people/?page=" + this.page)
 			.then(result=>result.json())
    		.then(items=>this.setState({items}));
    }
  }
  handlePreviousClick() {
  	if (this.state.items.previous != null)
  	{
  		this.page = this.page - 1;
    	fetch("https://swapi.co/api/people/?page=" + this.page)
 			.then(result=>result.json())
    		.then(items=>this.setState({items}));
    }
  }
  handleSearchClick() {
    this.setState({searching: true});
    clearInterval(this.searchInterval);
  	this.page = 1;
    fetch("https://swapi.co/api/people/?search=" + this.search)
 			.then(result=>result.json())
    		.then(items=>{
          this.setState({items, searching: false});          
        });
  }
  handleChange(e) {  
  		this.search = e.target.value;
      clearInterval(this.searchInterval);
      this.searchInterval = setInterval(this.handleSearchClick.bind(this), 500);      
  }
  render() {
    return (
      <div>
        <h2>Characters</h2>        
        <div className="row">
        	<div className="col-lg-4">
				<div className="input-group">
					<input type="text" className="form-control" placeholder="Search by name..." onChange={this.handleChange}/>
					<span className="input-group-btn">
						{this.state.searching === false ? <button className="btn btn-primary" type="button" onClick={this.handleSearchClick}><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
            : <button class="btn btn-primary disabled"><i class="glyphicon glyphicon-refresh gly-spin"></i></button>}
					</span>
				</div>
			</div>
		</div>

        <table className="peopleTable table table-hover table-bordered table-striped">
        	<tbody>
        		<tr><th>Name</th><th>Height</th><th>Mass</th><th>Created</th><th>Edited</th><th>Planet</th></tr>        	
       
          {this.state.items.results ?
          	this.state.items.results.map(item=><tr key={item.url.substring(28,item.url.length - 1)}><td>{item.name}</td><td>{item.height}</td><td>{item.mass}</td><td><Moment format="YYYY/MM/DD HH:mm">{item.created}</Moment></td><td><Moment format="YYYY/MM/DD HH:mm">{item.edited}</Moment></td><td><Planet planet={item.homeworld}/></td></tr>) 
            : <tr><td colSpan="6">Loading...</td></tr>
          }
      	</tbody>
        </table>
       
       	<p className="pageing">
       		<button type="button" className="btn btn-primary btn-xs" onClick={this.handlePreviousClick}>Previous</button> 
        	<button type="button" className="btn btn-primary btn-xs" onClick={this.handleNextClick}>Next</button>
        </p>       
       
      </div>




    );
  }
}
 
export default People