import React, { Component, PropTypes } from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./NavBar";
import Snackbar from "@material-ui/core/Snackbar";

import Cities from "./Cities";
import ErrorBoundary from "./ErrorBoundary";
import MySnackbarContentWrapper from "../helpers/snackbar.helper";

const theme = createMuiTheme({});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //cities: [],
      unit: "F",
      zip: "",
      exists: false,
      messagetype: "",
      message: "",
      open: false
    };
  }

  // Input event for add city
  handleInputChange = e => {
    this.setState({
      zip: e.target.value
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      open: false
    });

    // console.log(this.state);
  };

  componentDidUpdate(prevProps, prevState) {
    // this.props.receiveCities();
    // const cities = JSON.stringify(this.props);
    // this.props.getDefaultTempUnit();

    // console.log(JSON.stringify(this.props));
    let isError = false;
    let isSuccess = false;
    if (prevProps.error !== this.props.error) {
      isError = true;
    }

    if(isError) {
      this.setState({
        messagetype: "error",
        message: this.props.error,
        open: true
      });
    }

    if (prevProps.message !== this.props.message) {
      isSuccess = true;
    }

    if(isSuccess) {
      this.setState({
        messagetype: "success",
        message: this.props.message,
        open: true
      });
    }

    // console.log("s: " + JSON.stringify(this.props.items));
    //console.warn("previous", prevProps.items, "current", this.props.items);
  }

  render() {
    // const { cities, unit, zip } = this.state;
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar />
          <ErrorBoundary>
            <Switch>
              <Route exact path='/' component={Cities} />
            </Switch>
          </ErrorBoundary>
          {/* Snackbar */}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={this.state.open}
            autoHideDuration={5000}
            onClose={this.handleClose}
          >
            <MySnackbarContentWrapper
              variant={this.state.messagetype}
              message={this.state.message}
            />
          </Snackbar>
        </ThemeProvider>
      </Router>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired
// };
const mapStateToProps = state => {
  return {
    error: state.cities.error,
    message: state.cities.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);