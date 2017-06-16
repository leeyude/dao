import React from 'react';
import ReactDOM from 'react-dom';

export default class RawBeanAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


    getAdminData(){
      var adminData = (
        <tr>
          <td>leeyude@umich.edu</td>
          <td>Yu-De</td>
          <td>Lee</td>
          <td>松山區延吉街40號3F</td>
          <td>台北市</td>
          <td>105</td>
          <td>0955239734</td>
          <td>1983-Jan-28</td>
          <td>M</td>
          <td>2017-May-14</td>
        </tr>
      );
      return adminData;
    }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover	">
          <thead>
            <tr>
              <th>ID#</th>
              <th>Raw Batch#</th>
              <th>Name</th>
              <th>Process</th>
              <th>Cultivar</th>

              <th>Area</th>
              <th>Country</th>
              <th>Region</th>
              <th>Estate</th>
              <th>Grade</th>
              <th>Filed Since</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    );
  }
}
