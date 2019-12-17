import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class BugList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', name: '', status: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Bug Tracker</h3>
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
		  	
	        
		  
	    
	       {this.state.items.map((item,index) => 
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
			<td><Button id={index} variant="danger" type="button" onClick={this.handleChange}>
	            Remove
	          </Button></td>
	     	</tr> 
	       )}

	        
	      </tbody>
	      </Table>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            Would you like to report a bug? Please describe the issue below.  
          </label>
          <br />
          <textarea
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text} style={{width: 300 + 'px', height: 100 + 'px'}}
            required
          />
          <br />
          Your Name: &nbsp; &nbsp;
          <input 
           id="name"
           onChange={this.handleChange}
           value={this.state.name}
           required
          />
          <br />
          <Button variant="primary" type="submit" 
            style={{marginLeft: 10 + 'px', marginBottom: 8 + 'px', marginTop: 15 + 'px'}}>
            Report Bug
          </Button>
        </form>
	      
	    </div>
    );
  }
  handleChange(e) {
  	if (e.target.id === "new-todo") {
    	this.setState({ text: e.target.value });
	} else if (e.target.id === "name") {
		this.setState({ name: e.target.value });
	} else if (e.target.type === "button") {
		console.log(e.target.id);
		const index = e.target.id;
		if (this.state.items.length <= 1) {
			this.setState(state => ({
		      items: [],
		      text: '',
		      name: '',
		    }));
		} else {
			this.state.items.splice(index, 1);
			this.setState(state => ({
		      items: this.state.items
		    }));
		}
		
	    console.log(this.state.items);

	}
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      name: this.state.name,
      status: 'Unresolved'
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: '',
      name: '',
    }));
  }

}


export default BugList;