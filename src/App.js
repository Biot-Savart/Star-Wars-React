import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import People from "./components/People";
 
class Main extends Component {
  render() {
    return (
    	<HashRouter>
	        <div>
	          <h1>Star Wars Universe</h1>
	          <ul className="header">
				<li><NavLink exact to="/">Characters</NavLink></li>
	          </ul>
	          <div className="content">				
				<Route exact path="/" component={People}/>
	          </div>
	        </div>
        </HashRouter>
    );
  }
}
 
export default Main;