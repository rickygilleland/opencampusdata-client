import React, { Component } from "react";
import client from './feathers'
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button } from 'reactstrap';
import classnames from 'classnames';

class School extends Component {
  constructor(props) {
    super(props);
    
    this.state = { school: [], annualCrimeStats: [], activeTab: '1' };
    
    this.toggle = this.toggle.bind(this);

  }

  componentDidMount() {
    const school = client.service('schools');
    const annualCrimeStats = client.service('annualcrimestats');
    
    Promise.all([
	    school.get(this.props.match.params.id)
    ]).then( ([ schoolPage ]) => {
	    const school = schoolPage;
	    
	    this.setState({ school });
    });
    
    //fetch all of the annual crime stats
    Promise.all([
	    annualCrimeStats.find({
		    query: {
			    schoolsId: this.props.match.params.id
		    }
	    })
    ]).then( ([ annualCrimeStatsResult ]) => {
	    const annualCrimeStats = annualCrimeStatsResult;
	    
	   this.setState({ annualCrimeStats });
	    
    });
 
  }
  
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
      
  render() {
	  
	  return (
		  <div>
		  	<h1>{this.state.school.name}</h1> 
		  	<hr/>
		  	<Row>
		  		<Col xs="6">
			  		<p class="lead">{this.state.school.city}, {this.state.school.state}</p>
			  	</Col>
			  	<Col xs="6">
			  		<p class="text-right lead"><a href={this.state.school.url}>{this.state.school.url}</a></p>
			  	</Col>
			</Row>
          
		  
		  	<h2>Crime Statistics</h2>
		  	
		  	<Nav tabs>
		  		<NavItem>
		  			<NavLink
		  				className={classnames({ active: this.state.activeTab === '1' })}
		  				onClick={() => { this.toggle('1'); }}
		  			>
		  				Criminal Offenses
		  			</NavLink>
		  		</NavItem>
		  		<NavItem>
		  			<NavLink
		  				className={classnames({ active: this.state.activeTab === '2' })}
		  				onClick={() => { this.toggle('2'); }}
		  			>
		  				VAWA Offenses
		  			</NavLink>
		  		</NavItem>
		  		<NavItem>
		  			<NavLink
		  				className={classnames({ active: this.state.activeTab === '3' })}
		  				onClick={() => { this.toggle('3'); }}
		  			>
		  				Arrests
		  			</NavLink>
		  		</NavItem>

		  		<NavItem>
		  			<NavLink
		  				className={classnames({ active: this.state.activeTab === '4' })}
		  				onClick={() => { this.toggle('4'); }}
		  			>
		  				Hate Crimes
		  			</NavLink>
		  		</NavItem>
		  		<NavItem>
		  			<NavLink
		  				className={classnames({ active: this.state.activeTab === '5' })}
		  				onClick={() => { this.toggle('5'); }}
		  			>
		  				Disciplinary Actions
		  			</NavLink>
		  		</NavItem>
		  		<NavItem>
		  			<NavLink
		  				className={classnames({ active: this.state.activeTab === '6' })}
		  				onClick={() => { this.toggle('6'); }}
		  			>
		  				Unfounded Crimes
		  			</NavLink>
		  		</NavItem>
		  		<NavItem>
		  			<NavLink
		  				className={classnames({ active: this.state.activeTab === '7' })}
		  				onClick={() => { this.toggle('7x'); }}
		  			>
		  				Fire Statistics
		  			</NavLink>
		  		</NavItem>
		  	</Nav>
		  	<TabContent activeTab={this.state.activeTab}>
		  		<TabPane tabId="1">
		  			<Row>
		  				<Col sm="12">
		  					<br/>
		  					
		  					<h3>On Campus</h3>
						  	
						  	<Table striped responsive>
						  		<thead>
						  			<tr>
						  				<th>Year</th>
						  				<th>Murder</th>
						  				<th>Neglegent Manslaughter</th>
						  				<th>Rape</th>
						  				<th>Fondling</th>
						  				<th>Incest</th>
						  				<th>Statutory Rape</th>
						  				<th>Robbery</th>
						  				<th>Aggravated Assault</th>
						  				<th>Vehicle Theft</th>
						  				<th>Arson</th>
						  			</tr>
						  		</thead>
						  		<tbody>{this.state.annualCrimeStats.map(function(item, key) {
							  		if (item.type == "oc_crime") {
								  		return(
									  		<tr key = {key}>
									  			<td>{item.year}</td>
									  			<td>{item.data.murder}</td>
									  			<td>{item.data.neg_manslaughter}</td>
									  			<td>{item.data.rape}</td>
									  			<td>{item.data.fondling}</td>
									  			<td>{item.data.incest}</td>
									  			<td>{item.data.stat_rape}</td>
									  			<td>{item.data.robbery}</td>
									  			<td>{item.data.agg_assault}</td>
									  			<td>{item.data.vehicle_theft}</td>
									  			<td>{item.data.arson}</td>
									  		</tr>
								  		)	
							  		}
						  		})}</tbody>
						  	</Table>		  				
		  					
		  				</Col>
					</Row>
				</TabPane>
				<TabPane tabId="2">
		  			<Row>
		  				<Col sm="12">
		  					<br/>
		  					
						  	<h3>On Campus</h3>
						  	
						  	<Table striped responsive>
						  		<thead>
						  			<tr>
						  				<th>Year</th>
						  				<th>Stalking</th>
						  				<th>Dating Violence</th>
						  				<th>Domestic Violence</th>
						  			</tr>
						  		</thead>
						  		<tbody>{this.state.annualCrimeStats.map(function(item, key) {
							  		if (item.type == "oc_vawa") {
								  		return(
									  		<tr key = {key}>
									  			<td>{item.year}</td>
									  			<td>{item.data.stalking}</td>
									  			<td>{item.data.dating_violence}</td>
									  			<td>{item.data.domestic_violence}</td>
									  		</tr>
								  		)	
							  		}
						  		})}</tbody>
						  	</Table>
							
							<h3>Residence Hall</h3>
						  	<Table striped responsive>
						  		<thead>
						  			<tr>
						  				<th>Year</th>
						  				<th>Stalking</th>
						  				<th>Dating Violence</th>
						  				<th>Domestic Violence</th>
						  			</tr>
						  		</thead>
						  		<tbody>{this.state.annualCrimeStats.map(function(item, key) {
							  		if (item.type == "rh_vawa") {
								  		return(
									  		<tr key = {key}>
									  			<td>{item.year}</td>
									  			<td>{item.data.stalking}</td>
									  			<td>{item.data.dating_violence}</td>
									  			<td>{item.data.domestic_violence}</td>
									  		</tr>
								  		)	
							  		}
						  		})}</tbody>
						  	</Table>
						</Col>
					</Row>
				</TabPane>
				<TabPane tabId="3">
		  			<Row>
		  				<Col sm="12">
		  					<br/>
		  					
						  	<h3>On Campus</h3>
						  	
						  	<Table striped responsive>
						  		<thead>
						  			<tr>
						  				<th>Year</th>
						  				<th>Weapon</th>
						  				<th>Drug</th>
						  				<th>Liquor</th>
						  			</tr>
						  		</thead>
						  		<tbody>{this.state.annualCrimeStats.map(function(item, key) {
							  		if (item.type == "oc_arrest") {
								  		return(
									  		<tr key = {key}>
									  			<td>{item.year}</td>
									  			<td>{item.data.weapon}</td>
									  			<td>{item.data.drug}</td>
									  			<td>{item.data.liquor}</td>
									  		</tr>
								  		)	
							  		}
						  		})}</tbody>
						  	</Table>
							
							<h3>Residence Hall</h3>
						  	<Table striped responsive>
						  		<thead>
						  			<tr>
						  				<th>Year</th>
						  				<th>Weapon</th>
						  				<th>Drug</th>
						  				<th>Liquor</th>
						  			</tr>
						  		</thead>
						  		<tbody>{this.state.annualCrimeStats.map(function(item, key) {
							  		if (item.type == "rh_arrest") {
								  		return(
									  		<tr key = {key}>
									  			<td>{item.year}</td>
									  			<td>{item.data.weapon}</td>
									  			<td>{item.data.drug}</td>
									  			<td>{item.data.liquor}</td>
									  		</tr>
								  		)	
							  		}
						  		})}</tbody>
						  	</Table>
						</Col>
					</Row>
				</TabPane>
			</TabContent>
		  	
		  	
		  </div>
	  )
	  
		
		
		
	}
	
}

export default School;