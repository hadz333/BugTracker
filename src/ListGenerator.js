import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class ListGenerator extends React.Component {
  
  render() {
    return (
      <Table striped bordered hover>
      <thead>
	    <tr>
	      <th>#</th>
	      <th>Bug details</th>
	      <th>Reported by</th>
	      <th>Date</th>
	      <th>Status</th>
	   
	    </tr>
	  </thead>
	  <tbody>
	  	
        
	  
    
     {this.props.items.map((item,index) => 
     	<tr key={index}>
     	<td>{index+1}</td>
     	<td>{item.text}</td>
     	<td>{item.name}</td>
     	<td>{Date(item.id).toString().slice(0, 25)}</td>
     	<td><DropdownButton id="status-dropdown" title="Unresolved" variant="warning">
  			<Dropdown.Item href="#/action-1">Unresolved</Dropdown.Item>
  			<Dropdown.Item href="#/action-2">In progress</Dropdown.Item>
  			<Dropdown.Item href="#/action-3">Resolved</Dropdown.Item>
			</DropdownButton></td>
		<td><Button id="remove" variant="danger" type="button" onChange={this.props.handleChange}>
            Remove
          </Button></td>
     	</tr> 
     )}

        
      </tbody>
      </Table>
    );
  }
}

export default ListGenerator;