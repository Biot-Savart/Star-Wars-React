import React, { Component } from "react";
import Modal from "react-responsive-modal";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
 
class Planet extends Component {
constructor(props) {
  	super();
 	this.state={planet: [], open: false};
 	this.planetUrl = props.planet;			
  }
  onOpenModal = () => {
    this.setState({ open: true });

    fetch(this.planetUrl)
 		.then(result=>result.json())
    	.then(planet=>{
    		this.setState({planet: planet});  		
    	});
  }
  onCloseModal = () => {
    this.setState({ open: false });
  }
  render() {
  	const { open } = this.state;
    return (
      <div>      	
        <a onClick={this.onOpenModal}>View Detail</a>
        <Modal open={open} onClose={this.onCloseModal} little>
	        <h2 class="planetHeading bg-primary">PLANET INFORMATION</h2>
	        <p>     
	          
	        <table className="planetTable table table-hover table-bordered table-striped">
				<tbody>
					<tr><td><b>Name</b></td><td>{this.state.planet.name}</td></tr>
					<tr><td><b>Diameter</b></td><td>{this.state.planet.diameter}</td></tr>
					<tr><td><b>Climate</b></td><td>{this.state.planet.climate}</td></tr>
					<tr><td><b>Population</b></td><td>{this.state.planet.population}</td></tr>
				</tbody>
			</table>

			{this.state.planet.name ? <p></p>	: <p>Loading...</p>}
	        </p>

        </Modal>      
      </div>
    );
  }
}
 
export default Planet