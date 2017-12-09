import React, { Component } from 'react';
import { Drawer, Divider } from 'material-ui';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import { Link } from 'react-router-dom';



export default class DrawerCustom extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Drawer
        anchor="left"
        open={this.props.drawer}
        onRequestClose={() => this.props.toggleDrawer()}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={() => this.props.toggleDrawer()}
          onKeyDown={() => this.props.toggleDrawer()}
        >
          <div /*className={classes.list}*/ style={{minWidth: '200px'}}>
            <List>

              <Link to="/">
                <ListItem button>
                  <ListItemText primary="M + L"/>
                </ListItem>
              </Link>
              <Divider />
              
              <Link to="/details">
                <ListItem button>
                  <ListItemText primary="Details" />
                </ListItem>
              </Link>
              
              <Link to="/people">
                <ListItem button>
                  <ListItemText primary="Party People" />
                </ListItem>
              </Link>
              <Link to="/people">
                <ListItem button>
                  <ListItemText primary="Gifts" />
                </ListItem>
              </Link>

            </List>
            <Divider />
            <List></List>
          </div>
        </div>
      </Drawer>
    );
  }
}