import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

import alex from '../assets/partypeople/alex.jpg';
import amanda from '../assets/partypeople/amanda.jpg';
import chad from '../assets/partypeople/chad.jpg';
import doug from '../assets/partypeople/doug.jpg';
import greg from '../assets/partypeople/greg.jpg';
import mara from '../assets/partypeople/mara.jpg';
import megan from '../assets/partypeople/megan.jpg';
import minhthy from '../assets/partypeople/minhthy.jpg';
import renee from '../assets/partypeople/renee.jpg';
import stephanie from '../assets/partypeople/stephanie.jpg';
import stephen from '../assets/partypeople/stephen.jpg';
import trey from '../assets/partypeople/trey.jpg';

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
    src: amanda
  },
  {
    name: 'Mara Castro',
    src: mara
  },
  {
    name: 'Megan Irvin',
    src: megan
  },
  {
    name: 'Minhthy Vu',
    src: minhthy
  },
  {
    name: 'Renee Fiala',
    src: renee
  },
  {
    name: 'Stephanie Garman',
    src: stephanie
  },
  {
    name: 'Alex Steimle',
    src: alex
  },
  {
    name: 'Chad Lorance',
    src: chad
  },
  {
    name: 'Douglas Steimle',
    src: doug
  },
  {
    name: 'Greg Smith',
    src: greg
  },
  {
    name: 'Stephen Infanger',
    src: stephen
  },
  {
    name: 'Trey Bothe',
    src: trey
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