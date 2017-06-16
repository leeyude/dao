import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import React from 'react';
import ReactDOM from 'react-dom';
import "./tasting.less";


export default class Tasting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: 0, // 0 = focus on both,  -1 = focus on left, 1 = focus on right
      optionA: false,// 0 = ok,  -1 = unlike, 1 = favorite, false = no choice selected
      optionB: false,// 0 = ok,  -1 = unlike, 1 = favorite, false = no choice selected
    };
  }

  optionMouseOver(input){
    if(input){
      this.setState({highlight: 1});
    }else{
      this.setState({highlight: -1});
    }
    return false;
  }

  optionMouseOut(){
    this.setState({highlight: 0});
  }

  highlightLeft(){
    if(this.state.highlight<=0){// focus on both or left
      return true;
    }else{
      return false;
    }
  }

  highlightRight(){
    if(this.state.highlight>=0){// focus on both or right
      return true;
    }else{
      return false;
    }
  }

  optionSelectorA(input){
    this.setState({optionA: input});
  }

  optionSelectorB(input){
    this.setState({optionB: input});
  }

  render() {
    return (
      <div id="tasting">
        <div className="preferenceSelector col-md-8 col-md-offset-2 col-xs-12">
          <div className= {this.highlightLeft() ?
            'preference preferenceLeft selected' :
            'preference preferenceLeft'} onMouseOver={()=>this.optionMouseOver(false)} onMouseOut={()=>this.optionMouseOut()}>
            <div className="preferenceHeader">
              <h3>
                A
              </h3>
            </div>
            <div className="preferenceContainer">
              <div className="col-xs-4">
                <div className= {this.state.optionA===1 ?
                  'preferenceOption preferenceLike selection':'preferenceOption preferenceLike'}
                  onClick={()=> this.optionSelectorA(1)}>
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                </div>
              </div>
              <div className="col-xs-4">
                <div className= {this.state.optionA===0 ?
                  'preferenceOption preferenceOK selection':'preferenceOption preferenceOK'}
                  onClick={()=> this.optionSelectorA(0)}>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                </div>
              </div>
              <div className="col-xs-4">
                <div className= {this.state.optionA===-1 ?
                  'preferenceOption preferenceNG selection':'preferenceOption preferenceNG'}
                  onClick={()=> this.optionSelectorA(-1)}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            {!!this.state.optionA&&!!this.state.optionB&&this.state.optionA==this.state.optionB?
              (<div className="equalContainer">
                <div className="equalButton">
                  I like A better.
                </div>
              </div>):
              (<div className="equalContainer">
              </div>)
            }
          </div>
          <div className= {this.highlightRight() ?
            'preference preferenceRight selected' :
            'preference preferenceRight'} onMouseOver={()=>this.optionMouseOver(true)} onMouseOut={()=>this.optionMouseOut()}>
            <div className="preferenceHeader">
              <h3>
                B
              </h3>
            </div>
            <div className="preferenceContainer">
              <div className="col-xs-4">
                <div className= {this.state.optionB===1 ?
                  'preferenceOption preferenceLike selection':'preferenceOption preferenceLike'}
                  onClick={()=> this.optionSelectorB(1)}>
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                </div>
              </div>
              <div className="col-xs-4">
                <div className= {this.state.optionB===0 ?
                  'preferenceOption preferenceOK selection':'preferenceOption preferenceOK'}
                  onClick={()=> this.optionSelectorB(0)}>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                </div>
              </div>
              <div className="col-xs-4">
                <div className= {this.state.optionB===-1 ?
                  'preferenceOption preferenceNG selection':'preferenceOption preferenceNG'}
                  onClick={()=> this.optionSelectorB(-1)}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            {!!this.state.optionA&&!!this.state.optionB&&this.state.optionA==this.state.optionB ?
              (<div className="equalContainer">
                <div className="equalButton">
                  I like B better.
                </div>
              </div>):
              (<div className="equalContainer">
              </div>)}


          </div>
          <div className="submitPreference">
            <div className="submitPreferenceButton">
              送出
            </div>
          </div>
        </div>
      </div>
    );
  }
}
