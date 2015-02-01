var React = require("react");
var Router = require("react-router");
var { Link } = Router;
var getJSON = require("./getJSON.jsx");
var APIServer = ""

var AuthBlock = React.createClass({
  getInitialState: function() {
    var loggedIn = localStorage.token ? true : false;
    return {
      loggedIn: loggedIn
    };
  },

  login: function(event) {
    console.log(this.state);
    event.preventDefault();

    getJSON(APIServer + "/auth/github",
      function(data) {
        if (self.isMounted()) {
          localStorage.token = data.token;
          this.setState({loggedIn:true, handle:data.handle, token:data.token});
        }
      },
      function(err) {
      }
    );
  },

  logout: function(event) {
    // alert('logging out');
    console.log("state", this.state);
    event.preventDefault();
    localStorage.token = null;
    this.setState({loggedIn:false});
    console.log("state", this.state);
  },

  render: function() {
    var loginOrOut = this.state.loggedIn ?
      <a className="button btn-white auth" onClick={this.logout}>Sign out</a> :
      <a className="button btn-white auth" href="/auth/github">Sign in</a>;
    return (
      <div>
          {loginOrOut}
      </div>
    );
  }
});

module.exports.AuthBlock = AuthBlock;
