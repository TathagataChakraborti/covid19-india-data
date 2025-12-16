import React from 'react';
import { TASKS } from './tasks.js';
import { generateURL } from '../../components/Info';
import { Grid, Column, Link, Button, Tile, Tag } from '@carbon/react';
import { TrophyFilled } from '@carbon/icons-react';

const Task = props => (
  <Tile className="task-tile">
    <img
      alt="Task"
      src={generateURL(props.props.imageURL, 'png', '/tasks')}
      width="100%"
    />

    <div style={{ padding: '20px' }}>
      <div className="topic-tags">
        <div />
        {props.props.topics.map((item, index) => (
          <Tag key={index} type="purple" className="flattened-tag">
            {item}
          </Tag>
        ))}

        <Tag type={props.props.difficulty.color} className="flattened-tag">
          {props.props.difficulty.level}
        </Tag>

        {props.props.states.map((item, index) => (
          <Tag key={index} type="gray" className="flattened-tag">
            {item}
          </Tag>
        ))}
      </div>
      <br />

      <h5>{props.props.title}</h5>
      <br />

      <p style={{ fontSize: 'inherit' }}> {props.props.description}</p>
    </div>
    {props.props.url && (
      <Link className="button-generic" href={props.props.url} target="_blank">
        <Button size="sm">Learn more</Button>
      </Link>
    )}
  </Tile>
);

class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid className="offset">
        <Column lg={{ start: 4, end: 16 }} md={{ start: 2, end: 9 }} sm={4}>
          <Grid>
            {Array.from(Array(4).keys()).map(e => {
              return (
                <Column key={e} lg={1} md={4} sm={4}>
                  {TASKS.map((item, index) => {
                    if (item.column === e) {
                      return <Task key={index} props={item} />;
                    } else {
                      return <></>;
                    }
                  })}
                </Column>
              );
            })}
          </Grid>

          <br />
          <br />
          <Grid>
            <Column lg={2} md={4} sm={4}>
              <h3>Datathon @ IndoML 2021</h3>
              <hr />

              <h6>Dec 01, 2021 - Jan 31, 2022</h6>
              <br />

              <div style={{ marginBottom: '5px' }}>
                <TrophyFilled style={{ fill: 'gold' }} />
                <TrophyFilled style={{ fill: 'silver' }} />
                <TrophyFilled style={{ fill: 'brown' }} />
              </div>
              <div>
                <h6 style={{ fontWeight: 'normal' }}>
                  Top 3 submissions win cash awards!
                </h6>
              </div>
              <br />

              <p>
                IndoML is a pan-India symposium aimed at undergraduate and
                graduate students in Indian universities to participate in
                structured artificial intelligence, machine learning, and data
                science tasks.
              </p>

              <br />
              <Link
                href="https://www.kaggle.com/dataset/cb06e66c26c46ed9e701be6750e08f956d63c91d1be2bc633d19e201c7704c5b"
                target="_blank"
                className="no-decoration">
                <Button kind="secondary" size="sm">
                  Participate
                </Button>
              </Link>
            </Column>
            <Column lg={2} md={4} sm={4}>
              <h3>Fridays at PROTO</h3>
              <hr />

              <h6>Dec 17 -18, 2021</h6>
              <br />

              <p>
                PROTO is a learning community of journalists, developers,
                designers and researchers who come together every Friday to get
                to the heart of the challenges facing civic media.
              </p>

              <br />
              <Link
                href="https://www.pro.to/"
                target="_blank"
                className="no-decoration">
                <Button kind="secondary" size="sm">
                  Learn More
                </Button>
              </Link>
            </Column>
          </Grid>
        </Column>
      </Grid>
    );
  }
}

export default TasksPage;
