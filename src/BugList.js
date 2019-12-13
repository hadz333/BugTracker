import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

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
        <ListGenerator items={this.state.items} />
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
  	if (e.target.id == "new-todo") {
    	this.setState({ text: e.target.value });
	} else if (e.target.id == "name") {
		this.setState({ name: e.target.value });
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

class ListGenerator extends React.Component {
  
  render() {
  	var d = new Date();
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
     	<td>{item.status}</td>
     	</tr> 
     )}

        
      </tbody>
      </Table>
    );
  }
}

export default BugList;