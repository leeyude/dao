import React from 'react';
import ReactDOM from 'react-dom';
import "./homepage.less";

import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
        <div>
          <div id="homepage">
            <div className="landing">
              <div className="container">
                <div className="contentHolder clearfix">
                  <div className="landingContent col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
                    <div className="contentTitle">
                      <h1>
                        我獨一無二的好咖啡
                      </h1>
                    </div>
                    <div className="contentText">
                      <h1>
                        品質嚴選、量身訂做
                      </h1>
                      <div className="col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
                      <ul>
                        <li>貼合個人口感喜好</li>
                        <li>新鮮烘培立即包裝</li>
                        <li>每次都更好喝</li>
                      </ul>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </div>


    );
  }
}
