import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BasePage from './base';
import MassGridContainer from '../components/mass_grid_container';

const styles = (theme) => ({
  root: {},
});

class MassPage extends BasePage {
  render() {
    return (
      <div className={this.props.classes.root}>
        <MassGridContainer />
      </div>
    );
  }
}

MassPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MassPage);
