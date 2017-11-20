import React, { Component } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
 
class People extends Component {
	constructor() {
  		super();
 		this.state={items:[]};
 		this.page = 1;
    this.search = "";
    this.searchInterval = null;

 		this.handleNextClick = this.handleNextClick.bind(this);
 		this.handlePreviousClick = this.handlePreviousClick.bind(this);
 		this.handleSearchClick = this.handleSearchClick.bind(this);
 		this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
  	fetch(`https://swapi.co/api/people`)
 		.then(result=>result.json())
    	.then(items=>this.setState({items}));
  }
  handleNextClick() {
  	if (this.state.items.next != null)
  	{
  		this.page = this.page + 1;
    	fetch(`https://swapi.co/api/people/?page=` + this.page)
 			.then(result=>result.json())
    		.then(items=>this.setState({items}));
    }
  }
  handlePreviousClick() {
  	if (this.state.items.previous != null)
  	{
  		this.page = this.page - 1;
    	fetch(`https://swapi.co/api/people/?page=` + this.page)
 			.then(result=>result.json())
    		.then(items=>this.setState({items}));
    }
  }
  handleSearchClick() {
    clearInterval(this.searchInterval);
  	this.page = 1;
    fetch(`https://swapi.co/api/people/?search=` + this.search)
 			.then(result=>result.json())
    		.then(items=>this.setState({items}));
  }
  handleChange(e) {  
  		this.search = e.target.value;
      clearInterval(this.searchInterval);
      this.searchInterval = setInterval(this.handleSearchClick.bind(this), 500);
  }
  render() {
    return (
      <div>
        <h2>People</h2>

        <div className="row">
        	<div className="col-lg-4">
				<div className="input-group">
					<input type="text" className="form-control" placeholder="Search by name..." onChange={this.handleChange}/>
					<span className="input-group-btn">
						<button className="btn btn-primary" type="button" onClick={this.handleSearchClick}><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
					</span>
				</div>
			</div>
		</div>

        <table className="peopleTable table table-hover table-bordered table-striped">
        	<tbody>
        		<tr><th>Name</th><th>Height</th><th>Mass</th><th>Created</th><th>Edited</th><th>Planet</th></tr>        	
       
          {this.state.items.results ?
          	this.state.items.results.map(item=><tr key={item.url.substring(28,item.url.length - 1)}><td>{item.name}</td><td>{item.height}</td><td>{item.mass}</td><td>{item.created}</td><td>{item.edited}</td><td>{item.homeworld}</td></tr>) 
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