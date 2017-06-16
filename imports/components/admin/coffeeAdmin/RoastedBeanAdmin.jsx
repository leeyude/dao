import React from 'react';
import ReactDOM from 'react-dom';

export default class RoastedBeanAdmin extends React.Component {
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
              <th>Raw ID#</th>
              <th>Raw Batch#</th>
              <th>Roasted Batch#</th>


              <th>Active</th>
              <th>Major Flavor</th>
              <th>Secondary Flavor</th>
              <th>Additional Details</th>
              <th>Roasted on</th>
              <th>Filed on</th>


            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    );
  }
}
