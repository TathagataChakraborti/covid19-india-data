import React from 'react';
import { Grid, Column, ActionableNotification } from '@carbon/react';
import { HighlightsElement } from '../../components/HighlightsElement';
import { QUERIES } from './query.js';

let config = require('../../config.json');

class AnalysisPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...config,
    };
  }

  render() {
    return (
      <Grid className="offset">
        <Column lg={{ start: 4, end: 16 }} md={{ start: 2, end: 9 }} sm={4}>
          <ActionableNotification
            actionButtonLabel="GitHub"
            aria-label="close notification"
            kind="info"
            closeOnEscape
            hideCloseButton
            lowContrast
            onActionButtonClick={() => {
              window.open(config['metadata']['link_to_code'], '_blank');
            }}
            statusIconDescription="notification"
            subtitle={
              <span>
                If you would like to add your own analysis, please open an issue
                with the description and we will help you get added.
              </span>
            }
            title="Adding your own insights"
          />

          <br />
          <br />
          <HighlightsElement props={QUERIES} />
        </Column>
      </Grid>
    );
  }
}

export default AnalysisPage;
