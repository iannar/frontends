import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ChevronDownIcon from 'mdi-material-ui/ChevronDown';
import LaunchIcon from 'mdi-material-ui/Launch';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.A700,
    },
  },
  cardHeader: {
    cursor: 'pointer',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  list: {
    width: theme.spacing(30),
  },
  listItem: {
    textAlign: 'center',
  },
}));

const yearMap = {
  A: '甲年',
  B: '乙年',
  C: '丙年',
};

export default function MassCard(props) {
  const { data, expanded: initialExpanded } = props;
  const classes = useStyles();
  const { t } = useTranslation('mass');
  const [expanded, setExpanded] = useState(initialExpanded);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const {
    name,
    liturgicalYear,
    firstReading,
    responsorialPsalm,
    secondReading,
    gospel,
  } = data.solemnity;
  const year = yearMap[liturgicalYear];
  const getLink = (id) => {
    return `/assets/masses/index.html?m=${year}/${name}#/${id || ''}`;
  };
  const handleLaunchClick = (e) => {
    e.stopPropagation();
    window.open(getLink(), '_blank');
  };
  const date = moment(data.date).format('YYYY-MM-DD');
  const avatar = (
    <Avatar className={classes.avatar} onClick={handleLaunchClick}>
      <LaunchIcon />
    </Avatar>
  );
  const action = (
    <IconButton
      className={classNames(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      aria-expanded={expanded}
      aria-label="Show more"
    >
      <ChevronDownIcon />
    </IconButton>
  );
  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          action={action}
          avatar={avatar}
          className={classes.cardHeader}
          title={name}
          titleTypographyProps={{ variant: 'subtitle1' }}
          subheader={`${t(liturgicalYear)} \u2022 ${date}`}
          subheaderTypographyProps={{ variant: 'subtitle1' }}
          onClick={handleExpandClick}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Link href={getLink('first-reading')} target="_blank">
              <Typography variant="body1" color="textPrimary">
                {`${t('First Reading')}:\t${firstReading}`}
              </Typography>
            </Link>
            <Link href={getLink('responsorial-psalm')} target="_blank">
              <Typography variant="body1" color="textPrimary">
                {`${t('Responsorial Psalm')}:\t${responsorialPsalm}`}
              </Typography>
            </Link>
            <Link href={getLink('second-reading')} target="_blank">
              <Typography variant="body1" color="textPrimary">
                {`${t('Second Reading')}:\t${secondReading}`}
              </Typography>
            </Link>
            <Link href={getLink('gospel')} target="_blank">
              <Typography variant="body1" color="textPrimary">
                {`${t('Gospel')}:\t${gospel}`}
              </Typography>
            </Link>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

MassCard.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      solemnity: PropTypes.shape({
        name: PropTypes.string.isRequired,
        liturgicalYear: PropTypes.string.isRequired,
        firstReading: PropTypes.string.isRequired,
        responsorialPsalm: PropTypes.string.isRequired,
        secondReading: PropTypes.string.isRequired,
        gospel: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  expanded: PropTypes.bool,
};

MassCard.defaultProps = {
  expanded: false,
};