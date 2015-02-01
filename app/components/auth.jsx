var React = require("react");
var Router = require("react-router");
var { Route, RouteHandler, Link, DefaultRoute } = Router;



// Fake authentication lib

var auth = {
  login: function(email, pass, cb) {
    this.onChange(true);
  },

  getToken: function() {
    return localStorage.token;
  },

  logout: function(cb) {
    this.onChange(false);
  },

  loggedIn: function() {
    return !!localStorage.token;
  },

  onChange: function() {}
};

var AuthBlock = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: auth.loggedIn()
    };
  },

  setStateOnAuth: function(loggedIn) {
    console.log("got setStateOnAuth", loggedIn);
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function() {
    auth.onChange = this.setStateOnAuth;
    auth.login();
  },

  render: function() {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Log out</Link> :
      <Link to="login">Sign in</Link>;
    return (
      <div className="button btn-white auth">
          {loginOrOut}
      </div>
    );
  }
});

var Logout = React.createClass({
  componentDidMount: function() {
    auth.logout();
  },

  render: function() {
    return <p>You are now logged out</p>;
  }
});

var Login;
Login = React.createClass({
  mixins: [ Router.Navigation ],

  statics: {
    attemptedTransition: null
  },

  getInitialState: function() {
    return {
      error: false
    };
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pass = this.refs.pass.getDOMNode().value;
    auth.login(email, pass, function(loggedIn) {
      if (!loggedIn) {
        return this.setState({ error: true });
      }

      if (Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith("/about");
      }
    }.bind(this));
  },

  render: function() {
    var errors = this.state.error ? <p>Bad login information</p> : "";
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" 
                      defaultValue="joe@example.com"/>
        </label>
        <label><input ref="pass" placeholder="password"/>
        </label> (hint: password1)<br/>
        <button type="submit">login</button>
        {errors}
      </form>
    );
  }
});

module.exports.Login = Login;
module.exports.Logout = Logout;
module.exports.AuthBlock = AuthBlock;
