import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Dashboard,
  HourglassEmpty,
  Timeline,
  AccountCircle,
  AccountTree,
  RoomService,
  Settings,
} from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import "./style.css";
import { Link } from "react-router-dom";
import Select from "_atoms/input/select";
import { useSelector, useDispatch } from "react-redux";

import actions from "_pages/branch/actions";
import loginActions from "_pages/login/actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

const DefaultTemplate = (props) => {
  const { pageName } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const branches = useSelector(
    (state) =>
      state.auth.user.establishmentOwner?.company.branches || [
        state.auth.user.establishmentStaff?.branch,
      ]
  );

  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  const selectBranch = (id) => {
    dispatch(actions.selectBranch(id));
    dispatch(actions.getBranch(id));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(loginActions.logout())
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={
          clsx(classes.appBar, {
            [classes.appBarShift]: open,
          }) + " appBar"
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className="appBarContent">
            <Typography variant="h6" noWrap>
              {pageName}
            </Typography>
            <div className="appBarBranchSelectorWrapper">
              <Select
                defaultItem={"Selecione a filial..."}
                formName="branchSelector"
                name="branch"
                label="branch"
                items={branches}
                loading={false}
                className="branchSelector"
                onSelect={selectBranch}
              />
              <Link to="/login" className="logoutButton" onClick={handleLogout}>Logout</Link>
            </div>

          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            {
              name: "Dashboard",
              route: "/app/dashboard",
              icon: <Dashboard />,
            },
            {
              name: "Perfil",
              route: "/app/profile",
              icon: <AccountCircle />,
            },
            {
              name: "Tickets",
              route: "/app/tickets",
              icon: <HourglassEmpty />,
            },
            {
              name: "Analytics",
              route: "/app/analytics",
              icon: <Timeline />,
            },
            {
              name: "Filiais",
              route: "/app/branches",
              icon: <AccountTree />,
            },
            {
              name: "Serviços",
              route: "/app/services",
              icon: <RoomService />,
            },
            {
              name: "Horários",
              route: "/app/workingTime",
              icon: <Settings />,
            },
          ].map((item) => (
            <Link key={item.name} to={item.route}>
              <ListItem button key={item.name} style={{ paddingLeft: 24 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

export default DefaultTemplate;
