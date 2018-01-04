import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import { LinearProgress } from 'material-ui/Progress';

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    background: 'transparent',
    borderRadius: 2,
    marginBottom: 10,
    
  },
  linearProgress: {
    position: 'absolute',
    width: 'calc(100% - 151px)',
    height: '100%',
    zIndex: -1,
    borderRadius: '2px 0 0 2px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '55%'
    
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
    textAlign: 'right',
    borderRadius: '0 2px 2px 0'
    
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function MediaControlCard(props) {
  const { classes, theme } = props;

  return (
    <div className="song-choice">
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type="headline">{props.song ? props.song.title : ''}</Typography>
            <Typography type="subheading" color="secondary">
              {props.song ? props.song.artist : ''}
            </Typography>
          </CardContent>
        </div>
        <div className={classes.controls}>
        </div>
        <CardMedia
          className={classes.cover}
          image={props.song ? props.song.imagery : ''}
          title={props.song ? props.song.album : ''}
        />
        <LinearProgress className={classes.linearProgress} color="accent" mode="determinate" value={props.song && props.song.votes ? props.song.votes / props.totalVotes * 100 : 0} />
        </Card>
    </div>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);