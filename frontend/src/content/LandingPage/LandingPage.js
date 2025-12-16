import React from 'react';
import DWChart from 'react-datawrapper-chart';
import { Csv, Json, Sql, Collaborate, Document } from '@carbon/icons-react';
import { fetchData, generateStateID } from '../../components/Info';
import {
  Grid,
  Column,
  Link,
  Button,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Loading,
  ButtonSet,
  ActionableNotification,
  InlineNotification,
} from '@carbon/react';

// const axis_plot_options = {
//   title: null,
//   axes: {
//     bottom: {
//       title: 'Date',
//       mapsTo: 'date',
//       scaleType: 'time',
//     },
//     left: {
//       mapsTo: 'value',
//       title: null,
//       scaleType: 'linear',
//     },
//   },
//   curve: 'curveMonotoneX',
//   points: {
//     radius: 1,
//   },
//   height: '300px',
//   width: '100%',
// };

// function prepareOptions(title, axis) {
//   var new_options = {
//     ...axis_plot_options,
//     title: title,
//     axes: {
//       ...axis_plot_options.axes,
//       left: {
//         ...axis_plot_options.axes.left,
//         title: axis,
//       },
//     },
//   };

//   return new_options;
// }

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last_updated: null,
      dashboard_table_data: {},
      dashboard_graph_data: [],
    };
  }

  componentDidMount(props) {
    fetchData({ URL: 'fetch_dashboard_data' }).then(data => {
      this.setState({
        ...this.state,
        dashboard_table_data: this.prepareTableData(data),
        dashboard_graph_data: this.prepareGraphData(data),
      });
    });

    fetchData({ URL: 'last_updated' }).then(data => {
      this.setState({
        ...this.state,
        last_updated: data['last_updated'],
      });
    });
  }

  prepareGraphData = e => {
    var total_response = [];

    e.columns.forEach(function(item, idx) {
      if (['State', 'Last updated', 'Bulletin'].indexOf(item) < 0) {
        var response = [];

        e.data.forEach(function(state_item, state_idx) {
          state_item.graph_data.forEach(function(
            state_date_item,
            state_date_idx
          ) {
            var new_plot_item = {
              group: state_item.state_fullname,
              date: state_date_item[0],
              value: state_date_item[idx - 1],
            };

            response.push(new_plot_item);
          });
        });

        total_response.push({
          data: response,
          title: item,
        });
      }
    });

    return total_response;
  };

  prepareTableData = e => {
    const rowData = [];
    const headerData = e.columns.map((elem, i) => {
      return {
        header: elem,
        key: elem,
      };
    });

    e.data.forEach(function(item, idx) {
      var new_row_data = { id: idx.toString() };
      item.table_data.forEach(function(data_item, data_idx) {
        var key = e.columns[data_idx];

        if (key === 'State')
          data_item = (
            <Link href={'/#/' + generateStateID(data_item)}>
              {generateStateID(data_item)}
            </Link>
          );

        if (key === 'Bulletin')
          data_item = (
            <Link href={data_item} target="_blank">
              Link
            </Link>
          );

        new_row_data[key] = data_item;
      });

      rowData.push(new_row_data);
    });

    return {
      headerData: headerData,
      rowData: rowData,
    };
  };

  render() {
    return (
      <Grid className="offset">
        <Column lg={{ start: 4, end: 16 }} md={{ start: 2, end: 9 }} sm={4}>
          <Grid>
            <Column lg={2} md={4} sm={4}>
              <h1>COVID-19 India Dataset</h1>
              <br />
              <h3 className="text-blue">
                Mined automatically from public health bulletins daily for
                comprehensive COVID data from major Indian states
              </h3>
              <br />
              <br />

              <p>
                Detailed COVID-19 data from India is currently inaccessible to
                researchers, policymakers, and people interested in
                understanding and modeling the progression of the pandemic in
                the country. While crowd-sourced efforts [
                <Link href="https://www.covid19india.org/" target="_blank">
                  1
                </Link>
                ,
                <Link href="https://www.covid19bharat.org/" target="_blank">
                  2
                </Link>
                ] have done an exceptional job filling this gap, they provide
                limited data about daily cases, testing, and vaccination.
                <br />
                <br />
                However, Indian states have been releasing a daily health
                bulletin containing detailed information about the pandemic in
                the respective state [
                <Link
                  href="https://dhs.kerala.gov.in/wp-content/uploads/2021/12/Bulletin-HFWD-English-December-20.pdf"
                  target="_blank">
                  1
                </Link>
                ,
                <Link
                  href="http://stopcorona.tn.gov.in/wp-content/uploads/2020/03/Media-Bulletin-20-12-21-COVID-19.pdf"
                  target="_blank">
                  2
                </Link>
                ,
                <Link
                  href="http://health.delhigovt.nic.in/wps/wcm/connect/31f0d680452be162aac5ee6876edb3cf/DHB09D.pdf?MOD=AJPERES&lmod=-1285421395&CACHEID=31f0d680452be162aac5ee6876edb3cf"
                  target="_blank">
                  3
                </Link>
                ]. These bulletins include hospitalization data, age, and gender
                distribution, and some states report a summary of each fatality
                due to COVID-19. However, these{' '}
                <em>
                  bulletins are provided in an unstructured format, such as PDF
                  or images, thus making it very difficult to extract and
                  aggregate data over time.
                </em>
                <br />
                <br />
                In this project, we automate the extraction of data provided in
                these bulletins to create a comprehensive, structured dataset.
                This allows easy extraction and transformation of data. This
                dataset is freely available for further research and analysis,
                and we welcome code contributions in any form! &#129303;
                <br />
                <br />
              </p>
            </Column>
            <Column lg={1} md={4} sm={4}>
              <DWChart
                title="Map"
                src="https://datawrapper.dwcdn.net/wfgr2/1/"
              />
              <br />
              <br />

              <h5>Download data</h5>
              <hr />

              <ButtonSet stacked>
                <Button
                  href="https://github.com/IBM/covid19-india-data/tree/main/data/csv"
                  renderIcon={Csv}
                  iconDescription="Download"
                  kind="ghost">
                  CSV data
                </Button>

                <Button
                  href="https://github.com/IBM/covid19-india-data/tree/main/data/json"
                  renderIcon={Json}
                  iconDescription="Download"
                  kind="ghost">
                  JSON data
                </Button>

                <Button
                  href="https://ibm.biz/covid19-india-db"
                  renderIcon={Sql}
                  iconDescription="Download"
                  kind="ghost">
                  SQLite data
                </Button>
              </ButtonSet>

              <br />
              <br />

              <h5>Contribute to the project</h5>
              <hr />

              <Button
                href="/#/contributing"
                renderIcon={Collaborate}
                iconDescription="Contribute"
                size="sm"
                kind="primary">
                Contribute
              </Button>

              <br />
              <br />

              <h5>Read about our methodology</h5>
              <hr />

              <Button
                href="https://arxiv.org/abs/2110.02311"
                target="_blank"
                renderIcon={Document}
                iconDescription="Paper"
                size="sm"
                kind="primary">
                Read paper
              </Button>
            </Column>

            <Column lg={1} md={4} sm={4}>
              {!this.state.last_updated && (
                <>
                  <InlineNotification
                    aria-label="closes notification"
                    kind="error"
                    closeOnEscape
                    hideCloseButton
                    lowContrast
                    statusIconDescription="notification"
                    subtitle="Hold on! It might take up to 50 seconds to load data. Refresh if it's taking longer."
                    title="Loading"
                  />

                  <br />
                  <br />
                </>
              )}

              <ActionableNotification
                actionButtonLabel="View"
                aria-label="close notification"
                kind="info"
                closeOnEscape
                hideCloseButton
                lowContrast
                onActionButtonClick={() => {
                  window.open('https://covid19bharat.org/analysis', '_blank');
                }}
                statusIconDescription="notification"
                subtitle={
                  <span>
                    We are delighted to collaborate with DataKind Bengaluru on
                    the continued effort to keep detailed COVID-19 data from
                    India accessible.
                  </span>
                }
                title="Integration with covid19bharat"
              />

              <br />
              <br />

              <ActionableNotification
                actionButtonLabel="Compete"
                aria-label="close notification"
                kind="success"
                closeOnEscape
                hideCloseButton
                lowContrast
                onActionButtonClick={() => {
                  window.open('/#/tasks');
                }}
                statusIconDescription="notification"
                subtitle={
                  <span>
                    Join as at the virtual hackathon at IndoML 2021 and win cash
                    prizes for your contributions. The competition concludes
                    soon on Jan 31, 2022.
                  </span>
                }
                title="Hackathon @ IndoML 2021"
              />
            </Column>

            <Column lg={4} md={4} sm={4}>
              <br />
              <br />

              <div>
                <h3>Dataset characteristics</h3>
                <hr />
              </div>

              <p>
                Currently, we index health bulletins provided by 11 states. Some
                states provide very detailed health bulletins -- some including
                a brief summary of all individual fatalities due to COVID-19,
                and hospitalization statistics. The information available for
                the currently indexed states is shown in the following table:
              </p>

              <DWChart
                title="data-comparison"
                src="https://datawrapper.dwcdn.net/dHVe5/1/"
              />
            </Column>

            <Column lg={4} md={4} sm={4}>
              <br />
              <br />

              <div>
                <h3>Dashboard</h3>
                <hr />
              </div>

              <span>
                &nbsp;&nbsp;Last Updated:{' '}
                <span className="text-blue">{this.state.last_updated}</span>
              </span>
              <br />
              {Object.keys(this.state.dashboard_table_data).length > 0 && (
                <>
                  <DataTable
                    rows={this.state.dashboard_table_data.rowData}
                    headers={this.state.dashboard_table_data.headerData}
                    isSortable>
                    {({ rows, headers, getHeaderProps, getTableProps }) => (
                      <Table
                        {...getTableProps()}
                        size="short"
                        style={{ marginTop: '35px' }}>
                        <TableHead>
                          <TableRow>
                            {headers.map(header => (
                              <TableHeader
                                key={header.key}
                                {...getHeaderProps({ header })}>
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(row => (
                            <TableRow key={row.id}>
                              {row.cells.map(cell => (
                                <TableCell key={cell.id}>
                                  {cell.value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </DataTable>
                  <br />
                  <span style={{ color: 'gray' }}>
                    Scroll right to see more data. &#x1f449;
                  </span>
                </>
              )}
            </Column>
          </Grid>

          <br />
          <br />

          {this.state.dashboard_graph_data.length === 0 && (
            <Loading description="Loading highlights" withOverlay />
          )}
        </Column>
      </Grid>
    );
  }
}

export default LandingPage;
