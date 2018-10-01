import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MassGridContainer from '../components/mass_grid_container';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class MassPage extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <MassGridContainer />
      </div>
    );
  }
}

MassPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MassPage);
