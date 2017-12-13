import React, { Component } from 'react';
import { 
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider
} from 'material-ui';
import { CSSTransitionGroup } from 'react-transition-group';


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
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleNumberChange(event) {
    const number = parseInt(event.target.value, 10);
    let safeNumber = 0;
    if (number >= 0) {
      safeNumber = number;
    }
    this.setState({form: {
      number: safeNumber
    }});
  } 

  handleChange(name, event) {
    this.setState({
      form: {
        [name]: event.target.value
      }
    });
  }
  submitForm(e) {
    e.preventDefault();
    axios.post('http://localhost' + '/api/rsvp',
      { form: this.state.form },
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
      <Grid container justify="center" spacing={24}>
        <Grid item xs={12} lg={4}>
          <Grid>
            <Typography type="title" className="page-header" align="center">RSVP</Typography>
            <br/>
            <Divider className="divider" />
            <br/>
            <br/>
            <Typography type="subtitle" align="center">
              { this.state.hasSubmitted ? 'Thanks for letting us know! If you entered your email, you will get a confirmation email shortly. Feel free to share the party info with friends!' : 'We are so excited to celebrate this momentous occasion! Are you in?' }
            </Typography>
            <br/>
            <br/>
            <br/>
            <Card>
              <CardContent>
                <form style={{display: this.state.hasSubmitted ? 'none' : 'block' }} >
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
                    onChange={this.handleNumberChange}
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
                  <div style={{textAlign: 'center'}}>
                    <Button type="submit" onClick={this.submitForm}>Send Response</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}