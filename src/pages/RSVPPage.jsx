import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { 
  TextField,
  Button,
  Card,
  CardContent,
  Typography
} from 'material-ui';
import axios from 'axios';

export default class RSVPPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        email: '',
        number: 1,
        note: ''
      },
      hasSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleChange(name, event) {
    console.log(name, event.target.value);
    this.setState({
      form: {
        [name]: event.target.value
      }
    });
  }
  submitForm() {
    axios.post('http://localhost' + '/api/rsvp',
      { name: 'test' },
      { 'Content-Type': 'application/json' }
    ).then(() => {
      this.setState({hasSubmitted: true});
      console.log('Great success');
    }).catch(err => console.error(err));

  }
  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  render() {
    return (
      <Grid item xs={12} lg={4}>
        <Card>
          <CardContent>
            <Typography type="title">RSVP</Typography>
            <Typography type="subtitle">
            We are so excited to celebrate this momentous occasion! Are you in? 
            </Typography>

            <form>
              <TextField
                id="name"
                label="Guest Name"
                value={this.state.form.name}
                onChange={(e) => this.handleChange('name', e)}
                margin="normal"
                fullWidth
                required
                autoFocus
              /><br/>
              <TextField
                id="number"
                label="Number Attending"
                value={this.state.form.number}
                onChange={(e) => this.handleChange('number', e)}
                margin="normal"
                type="number"
                min="0"
                fullWidth
                required
              /><br/>
              
              <TextField
                id="email"
                label="Email"
                value={this.state.form.email}
                onChange={(e) => this.handleChange('email', e)}
                margin="normal"
                type="email"
                fullWidth
              /><br/>

              <TextField
                id="note"
                label="Note"
                multiline
                rowsMax="8"
                value={this.state.form.note}
                onChange={(e) => this.handleChange('note', e)}
                fullWidth
                margin="normal"
              /><br/>
              <br/>
              <Button onClick={this.submitForm}>Send</Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}