import React from 'react';
import { BasicElement } from '../../components/BasicElement';
import { HighlightsElement } from '../../components/HighlightsElement';
import { QUERIES } from './query.js';
import { Grid, Column } from '@carbon/react';

let config = require('../../config.json');
let state_config = config['states']['MH'];

class Maharashtra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...state_config,
    };
  }

  render() {
    return (
      <Grid className="offset">
        <Column lg={{ start: 4, end: 16 }} md={{ start: 2, end: 9 }} sm={4}>
          <BasicElement props={this.state} />
          <HighlightsElement props={QUERIES} />
        </Column>
      </Grid>
    );
  }
}

export default Maharashtra;
