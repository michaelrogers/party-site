import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 100,
    height: 100,
  },
};

const avatarData = [
  {
    name: 'Alex Steimle',
    src: '/images/partypeople/alex.jpg',
    color: ''
  },
  {
    name: 'Chad Lorance',
    src: '/images/partypeople/chad.jpg'
  },
  {
    name: 'Douglas Steimle',
    src: '/images/partypeople/doug.jpg'
  },
  {
    name: 'Greg Smith',
    src: '/images/partypeople/greg.jpg'
  },
  {
    name: 'Stephen Infanger',
    src: '/images/partypeople/stephen.jpg'
  },
  {
    name: 'Trey Bothe',
    src: '/images/partypeople/trey.jpg'
  }
];


function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      {avatarData.map(person => {
        return (
          <Avatar
            alt={person.name}
            src={person.src}
            className={classNames(classes.avatar, classes.bigAvatar)}
          />
        );
      })}
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);