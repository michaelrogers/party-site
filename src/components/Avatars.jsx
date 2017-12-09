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

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Adelle Charles"
        src="https://material-ui-next.com/static/images/uxceo-128.jpg"
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
      <Avatar
      alt="Adelle Charles"
      src="https://material-ui-next.com/static/images/uxceo-128.jpg"
      className={classNames(classes.avatar, classes.bigAvatar)}
    />
    <Avatar
    alt="Adelle Charles"
    src="https://material-ui-next.com/static/images/uxceo-128.jpg"
    className={classNames(classes.avatar, classes.bigAvatar)}
  />
  <Avatar
  alt="Adelle Charles"
  src="https://material-ui-next.com/static/images/uxceo-128.jpg"
  className={classNames(classes.avatar, classes.bigAvatar)}
/>
<Avatar
alt="Adelle Charles"
src="https://material-ui-next.com/static/images/uxceo-128.jpg"
className={classNames(classes.avatar, classes.bigAvatar)}
/>
<Avatar
alt="Adelle Charles"
src="https://material-ui-next.com/static/images/uxceo-128.jpg"
className={classNames(classes.avatar, classes.bigAvatar)}
/>
<Avatar
alt="Adelle Charles"
src="https://material-ui-next.com/static/images/uxceo-128.jpg"
className={classNames(classes.avatar, classes.bigAvatar)}
/>
<Avatar
alt="Adelle Charles"
src="https://material-ui-next.com/static/images/uxceo-128.jpg"
className={classNames(classes.avatar, classes.bigAvatar)}
/>


    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);