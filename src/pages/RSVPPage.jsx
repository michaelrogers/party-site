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
// import { CSSTransitionGroup } from 'react-transition-group';
import CustomParticles from '../components/CustomParticles';


import axios from 'axios';
axios.defaults.baseURL = process.env.PUBLIC_URL || 'http://localhost';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class RSVPPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      number: 1,
      note: '',
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
    if (number > 6) {
      safeNumber = this.state.number;
    }
    this.setState({
      number: safeNumber
    });
  } 

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value
    });
  }
  submitForm(e) {
    e.preventDefault();
    const { name, email, number, note } = this.state;
    axios({
      method: 'POST',
      url: '/rsvp',
      responseType: 'json',
      data: {
        name,
        email,
        number,
        note
      }
    }).then((data) => {
      this.setState({hasSubmitted: true});
      console.log('Great success', data);
    }).catch(err => console.error(err));

  }
  displayMessage() {
    if (this.state.hasSubmitted) {
      return (
        <Typography type="body1" align="center">
          Thanks for letting us know! If you entered your email, you will get a confirmation email shortly.
        </Typography>
      );
    } else {
      return (
        <div>
          <Typography type="body1" align="center">
            We are so excited to celebrate this momentous occasion with you!
          </Typography>
          <Typography type="body1" align="center">
            Are you in?
          </Typography>
        </div>
      );
    } 
  }

  // handleChange = name => event => {
  //   this.setState({
  //     [name]: event.target.value,
  //   });
  // };

  render() {
    return (
      <Grid container justify="center">
        <CustomParticles/>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Grid>
            <div className="particle-transition">
              <Typography type="title" className="page-header" align="center">RSVP</Typography>
              <br/>
              <Divider className="divider" />
              <br/>
              <br/>
              <div>
                {this.displayMessage()}
              </div>
            </div>
            <br/>
            
            
            <br/>
            <br/>
            <Card style={{display: this.state.hasSubmitted ? 'none' : 'block' }}>
              <CardContent>
                <form style={{display: this.state.hasSubmitted ? 'none' : 'block' }} onSubmit={this.submitForm}>
                  <TextField
                    id="name"
                    label="Guest Name"
                    value={this.state.name}
                    onChange={(e) => this.handleChange('name', e)}
                    margin="normal"
                    fullWidth
                    required
                    autoFocus
                  /><br/>
                  <TextField
                    id="number"
                    label="Number Attending"
                    value={this.state.number}
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
                    value={this.state.email}
                    onChange={(e) => this.handleChange('email', e)}
                    margin="normal"
                    type="email"
                    fullWidth
                  /><br/>

                  <TextField
                    id="note"
                    placeholder="Send us some love or request a song"
                    label="Note"
                    multiline
                    rowsMax="8"
                    value={this.state.note}
                    onChange={(e) => this.handleChange('note', e)}
                    fullWidth
                    margin="normal"
                  /><br/>
                  <br/>
                  <div style={{textAlign: 'center'}}>
                    <Button style={{border: '1px solid white'}} type="submit" >Send Response</Button>
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