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
          <div /*className={classes.list}*/>
            <List>
              <ListItem button>
                <Link to="/">
                  <ListItemText primary="M + L"/>
                </Link>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItem>
            </List>
            <Divider />
            <List></List>
          </div>
        </div>
      </Drawer>
    );
  }
}