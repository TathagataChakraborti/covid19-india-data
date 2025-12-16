import React from 'react';
import { Grid, Column, ActionableNotification } from '@carbon/react';
import { HighlightsElement } from '../../components/HighlightsElement';
import { QUERIES } from './query.js';

let config = require('../../config.json');

class AnomaliesPage extends React.Component {
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
                Find out for yourself! Any time we find inconsistencies in the
                state bulletins, we will log it in this page. If you find new
                ones please get in touch.
              </span>
            }
            title="Is the data reliable, you ask?"
          />

          <HighlightsElement props={QUERIES} />
        </Column>
      </Grid>
    );
  }
}

export default AnomaliesPage;
