import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class BugList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    	items: [], 
    	text: '', 
    	name: '', 
    	dropdownOptions: [], 
    	dropdownVariants: [],
    	dates: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dropdownSelect = this.dropdownSelect.bind(this);
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
	     	<td>{this.state.dates[index].toString().slice(0, 25)}</td>
	     	<td><DropdownButton id="status-dropdown" 
	     		title={this.state.dropdownOptions[index]} variant={this.state.dropdownVariants[index]} >
	  			<Dropdown.Item id={index} onClick={this.dropdownSelect}>Unresolved</Dropdown.Item>
	  			<Dropdown.Item id={index} onClick={this.dropdownSelect}>In progress</Dropdown.Item>
	  			<Dropdown.Item id={index} onClick={this.dropdownSelect}>Resolved</Dropdown.Item>
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
		      dropdownOptions: [],
		      dropdownVariants: [],
		      dates: []
		    }));
		} else {
			this.state.items.splice(index, 1);
			this.state.dropdownOptions.splice(index, 1);
			this.state.dropdownVariants.splice(index, 1);
			this.state.dates.splice(index, 1);
			this.setState(state => ({
		      items: this.state.items,
		      dropdownOptions: this.state.dropdownOptions,
		      dropdownVariants: this.state.dropdownVariants,
		      dates: this.state.dates
		    }));
		}
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
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: '',
      name: '',
      dropdownOptions: state.dropdownOptions.concat("Unresolved"),
      dropdownVariants: state.dropdownVariants.concat("warning"),
      dates: state.dates.concat(Date(Date.now()))
    }));
  }

  dropdownSelect(e) {
  	const selection = e.target.innerHTML;
  	const selectionId = e.target.id;
	if (selection.includes("Unresolved")) {
		console.log('a');
		let arrO = this.state.dropdownOptions;
		let arrV = this.state.dropdownVariants;
		arrO[selectionId] = "Unresolved";
		arrV[selectionId] = "warning";
		this.setState(state => ({
		      dropdownOptions: arrO,
		      dropdownVariants: arrV
		}));
  	} else if (selection.includes("In progress")) {
  		console.log('b');
  		let arrO = this.state.dropdownOptions;
		let arrV = this.state.dropdownVariants;
  		arrO[selectionId] = "In progress";
  		arrV[selectionId] = "primary";
		this.setState(state => ({
		      dropdownOptions: arrO,
		      dropdownVariants: arrV
		}));
  	} else if (selection.includes("Resolved")) {
  		console.log('c');
  		let arrO = this.state.dropdownOptions;
		let arrV = this.state.dropdownVariants;
  		arrO[selectionId] = "Resolved";
  		arrV[selectionId] = "success";
		this.setState(state => ({
		      dropdownOptions: arrO,
		      dropdownVariants: arrV
		}));
  	}
  }
}
export default BugList;