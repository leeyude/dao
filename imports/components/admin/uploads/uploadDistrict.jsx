import React from 'react';

export default class UploadDistrict extends React.Component {
  submitFile(e){
    e.preventDefault();
    console.log("submit");

    Papa.parse( e.target.files[0], {
      header: true,
      complete( result ) {
        console.log(result);

        Meteor.call("parseUpload", result.data, function(error, result){
          if(error){

          }
          if(result){

          }
        });
      }
    });
  }

  render(){
    return (
      <div>
      <h4 className="page-header">Upload a CSV for Districts</h4>
      <input onChange={this.submitFile} type="file" name="uploadCSV" />
      </div>

    )
  }
}
