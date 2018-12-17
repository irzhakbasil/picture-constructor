import React, { Component } from "react";
import "./App.css";
import PictureNav from "./components/PictureNav/PictureNav";
import PictureBuilderPreview from "./containers/PictureBuilderPreview/PictureBuilderPreview";
import IllustrationList from "./containers/IllustrationList/IllustrationList";
import PictureFramesList from "./containers/PictureFramesList/PictureFramesList";
import OrderPreviewPage from "./containers/OrderPreviewPage/OrderPreviewPage";
import FingerprintList from "./containers/FingerprintList/FingerprintList";
import TextInput from "./containers/TextInput/TextInput";
import Price from "./containers/Price/Price";

import { withRouter, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
//import anime from "animejs";

const PageFade = props => {
  return (
    <CSSTransition
      {...props}
      classNames="fadeTranslate"
      timeout={300}
      mountOnEnter={true}
      unmountOnExit={true}
    />
  );
};

class App extends Component {
  state = {
    activeRoute: 0 //local UI
  };

  componentDidMount() {
    this.props.history.push("/picture");
  }

  switchComponent = index => {
    this.setState({
      activeRoute: index
    });
  };
  render() {
    const locationKey = this.props.location.pathname;

    return (
      <div className="app-wraper">
        <div className="grid-container">
          <PictureNav
            switchComponent={this.switchComponent}
            activeLink={this.state.activeRoute}
          />
          <div className="empty" />{" "}
          {/* this place can be used for some component in the future */}
          <Price />
          <div className="sliding-components">
            {/*<TransitionGroup>
              <PageFade key={locationKey}>*/}
            <Switch location={this.props.location}>
              <Route exact path="/picture" component={IllustrationList} />
              <Route path="/frames" component={PictureFramesList} />
              <Route path="/text" component={TextInput} />
              <Route path="/preview" component={OrderPreviewPage} />
              <Route path="/fingerprints" component={FingerprintList} />
            </Switch>
            {/*</PageFade>
            </TransitionGroup>*/}
          </div>
          <div className="result-title">
            <p>Ваша картина</p>
          </div>
          <PictureBuilderPreview />
          <div className="submit-picture">
            <button
              onClick={() => {
                this.props.history.push("/preview");
                this.setState({
                  activeRoute: null
                });
              }}
              className="submit-button"
            >
              ОФОРМИТЬ ЗАКАЗ
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
