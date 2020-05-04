import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { receiveCities, getDefaultTempUnit, deleteCity } from "../actions";

import { defaultTempFunct } from "../helpers";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  card: {
    maxWidth: 345,
    "&:hover": {
      backgroundColor: "#dfe3ee"
    }
  },
  textColorBlue: {
    color: "#6593F5"
  },
  media: {
    maxHeight: 250,
    paddingTop: "5%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "transparent"
  }
});

class Cities extends Component {
  state = {
    cities: [],
    loading: true,
    unit: null
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.receiveCities();
    });
    //this.props.getDefaultTempUnit();
    // console.log("component 1: " + JSON.stringify(temp));
    // console.log("L->" + JSON.stringify(this.props));
    // console.log("Function: " + defaultTempFunct(this.props.unit, 400));
  }

  componentDidUpdate(prevProps, prevState) {
    // this.props.receiveCities();
    // const cities = JSON.stringify(this.props);
    // this.props.getDefaultTempUnit();
    if (
      prevProps.items !== this.props.items ||
      prevProps.unit !== this.props.unit
    ) {
      this.setState({
        cities: this.props.items,
        unit: this.props.unit,
        loading: this.props.loading
      });
    }

    // console.log("s: " + JSON.stringify(this.props.items));
    //console.warn("previous", prevProps.items, "current", this.props.items);
  }

  render() {
    const { classes, deleteCity } = this.props;
    const { cities, unit, loading } = this.state;

    return (
      <Container style={{ paddingTop: "8rem" }}>
        <Grid container spacing={3}>
          {cities
            ? cities.map((city, index) =>
                !loading ? (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label='cities'
                            className={classes.avatar}
                          >
                            <img
                              className={classes.media}
                              src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
                              alt={city.weather[0].main}
                              title={city.weather[0].main}
                            />
                          </Avatar>
                        }
                        action={
                          <IconButton
                            onClick={() => deleteCity(city.id, city.name)}
                            aria-label='settings'
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        title={city.name}
                        subheader={city.weather[0].main}
                      />
                      <Box textAlign='center'>
                        <img
                          className={classes.media}
                          src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                          alt={city.weather[0].main}
                          title={city.weather[0].main}
                        />
                        <CardContent>
                          <Typography
                            variant='h4'
                            className={classes.textColorBlue}
                            component='p'
                          >
                            {defaultTempFunct(unit, city.main.temp)}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'
                          >
                            {city.weather[0].description}
                          </Typography>
                        </CardContent>
                      </Box>
                      <CardActions>
                        <Grid xs={6} item={true}>
                          <Box ml={2} textAlign='left'>
                            min <br />
                            {defaultTempFunct(unit, city.main.temp_min)}
                          </Box>
                        </Grid>
                        <Grid xs={6} item={true}>
                          <Box mr={2} textAlign='right'>
                            max <br />
                            {defaultTempFunct(unit, city.main.temp_max)}
                          </Box>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                ) : (
                  "Loading..."
                )
              )
            : "No cities available"}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  // console.log("state: " + JSON.stringify(state));
  return {
    items: state.cities.items,
    loading: state.cities.loading,
    error: state.cities.error,
    unit: state.temp.unit
    // getCities: () => dispatch(getCities())
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        receiveCities,
        getDefaultTempUnit,
        deleteCity
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Cities));

// export default withStyles(styles)(Cities);
