import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AddIcon from "@material-ui/icons/Add";
import MoreIcon from "@material-ui/icons/MoreVert";

import { toggleTempUnit, addCity, addCityComplete } from "../actions";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  addInput: {
    position: "relative",
    marginRight: theme.spacing(1.5),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  addButton: {
    width: theme.spacing(7),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: "white",
      backgroundColor: "#87ceeb",
      label: {
        color: "white"
      }
    }
  },
  button: {
    color: "white",
    borderColor: "#6593F5",
    borderWidth: 2,
    "&:hover": {
      color: "white",
      backgroundColor: "#6593F5 !important",
      label: {
        color: "white"
      }
    }
  },
  active: {
    color: "white",
    borderColor: "#6593F5",
    borderWidth: 2,
    backgroundColor: "#6593F5 !important",
    label: {
      color: "white"
    }
  },
  buttonA: {
    color: "white",
    width: "auto",
    backgroundColor: "#6593F5",
    "&:hover": {
      color: "white",
      backgroundColor: "#6593F5 !important",
      label: {
        color: "white"
      }
    }
  },
  leftIcon: {
    marginRight: theme.spacing(0.5)
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.15)
    },
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

const NavBar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [zip, setZip] = React.useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const activeClassF = props.unit === "F" ? classes.active : classes.button;
  const activeClassC = props.unit === "C" ? classes.active : classes.button;

  //   function handleProfileMenuOpen(event) {
  //     setAnchorEl(event.currentTarget);
  //   }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const handleToggleTemp = unit => {
    props.toggleTempUnit(unit);
    // console.log("|-> " + JSON.stringify(props));
    //console.log("action fired: " + JSON.stringify(props.toggleTempUnit(unit)));
  };

  const handleInputChange = e => {
    setZip(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.add(zip);
    // console.log(props.add(zip));
  };

  const menuId = "primary-search-account-menu";

  const tempButton = (
    <ButtonGroup size='small' aria-label='small outlined button group'>
      <Button
        onClick={() => handleToggleTemp("F")}
        classes={{ root: activeClassF, label: classes.button }}
      >
        &deg;F
      </Button>
      <Button
        onClick={() => handleToggleTemp("C")}
        classes={{
          root: activeClassC,
          label: classes.button
        }}
      >
        &deg;C
      </Button>
    </ButtonGroup>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {tempButton}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <form className={classes.addInput} onSubmit={handleSubmit}>
          <FormControl error>
            <InputBase
              placeholder='Enter Zip Code'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              value={zip}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.buttonA}
          >
            <AddIcon />
          </Button>
        </form>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            Weather App
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {tempButton}
            <form className={classes.addInput} onSubmit={handleSubmit}>
              <FormControl error>
                <InputBase
                  placeholder='Enter Zip Code'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                  value={zip}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.buttonA}
              >
                <AddIcon />
              </Button>
            </form>
          </div>

          <div className={classes.sectionMobile}>
            {tempButton}
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    unit: state.temp.unit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        toggleTempUnit,
        add: zip => addCity(zip)
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
