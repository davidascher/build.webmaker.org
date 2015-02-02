var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

// polyfill
if(!Object.assign)
	Object.assign = React.__spread;

var {App, Add, Now, Next, Upcoming, Design, Homepage} = require("./components/app");

// export routes
module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="add" handler={Add}/>
    <Route name="now" handler={Now}/>
    <Route name="next" handler={Next} path="next" title="Next Heartbeat"/>
    <Route name="upcoming" handler={Upcoming}/>
    <Route name="design" handler={Design}/>
   <DefaultRoute name="home" handler={Homepage}/>
  </Route>
);
