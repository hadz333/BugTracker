import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGenerator from './ListGenerator';

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
  	if (e.target.id === "new-todo") {
    	this.setState({ text: e.target.value });
	} else if (e.target.id === "name") {
		this.setState({ name: e.target.value });
	} else {
		console.log('hey');
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