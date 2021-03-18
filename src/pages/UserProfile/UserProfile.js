import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import axios from "axios";
import UserDetails from "../../components/UserProfile/UserDetails";
import { Buffer } from "buffer";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      userId: this.props.match.params.id,
    };

    this.updateDataImage = this.updateDataImage.bind(this);
  }

  updateDataImage(location) {
    const currData = this.state.data;

    currData["photo"] = location;
    this.setState({ data: currData });
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    axios.get("/api/users/" + this.state.userId).then((res) => {
      this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <UserDetails
        updateImage={this.updateDataImage}
        data={this.state.data}
      ></UserDetails>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(UserProfile));
