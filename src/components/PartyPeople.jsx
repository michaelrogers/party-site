import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap'
  },
  avatar: {
    margin: 10,
    display: 'inline-block'
  },
  bigAvatar: {
    width: 105,
    height: 105,
  },
};

const avatarData = [
  {
    name: 'Amanda Penney',
    src: '/images/partypeople/amanda.jpg'
  },
  {
    name: 'Mara Castro',
    src: '/images/partypeople/mara.jpg'
  },
  {
    name: 'Megan Irvin',
    src: '/images/partypeople/megan.jpg'
  },
  {
    name: 'Minhthy Vu',
    src: '/images/partypeople/minhthy.jpg'
  },
  {
    name: 'Renee Fiala',
    src: '/images/partypeople/renee.jpg'
  },
  {
    name: 'Stephanie Garman',
    src: '/images/partypeople/stephanie.jpg'
  },
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
      {avatarData.map((person, i) => {
        return (
          <Avatar
            key={i}
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