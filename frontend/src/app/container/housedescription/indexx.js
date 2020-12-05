import React from "react";
import { Container, Row, Col, Image, Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { search1 } from "../../../action/listingAction";
import { search } from "../../../action/searchAction";
import UpdateHome from "./updateHome";
import ApplyBuyer from "./applyBuyer";
import ApplyRenter from "./applyRenter";
import configPath from "../../../config";
import axios from "axios";
import { Link } from "react-router-dom";

class HomeDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showApplyBuyer: false,
      showApplyRenter: false,
      ZIP: "",
      StreetAddress: "",
      State: "",
      Country: "",
      Price: "",
      Area: "",
      NoOfBedrooms: "",
      NoOfBathrooms: "",
      FlooringType: "",
      HomeType: "",
      Parking: "",
      Amenities: "",
      LeaseTerms: "",
      AvailabiltyDate: "",
      SecurityDeposit: "",
      YearBuilt: "",
      AvailableAs: "",
      OpenHouse: "",
    };
  }

  componentDidMount() {
    var payload = {
      ListingID: this.props.match.params.id,
    };
    console.log(payload);
    this.props.dispatch(search1(payload));
  }

  handleCloseApplyBuyer = () => {
    this.setState({
      showApplyBuyer: false,
    });
  };

  handleShowApplyRenter = () => {
    this.setState({
      showApplyRenter: true,
    });
  };

  handleCloseApplyRenter = () => {
    this.setState({
      showApplyRenter: false,
    });
  };

  handleShowApplyBuyer = () => {
    this.setState({
      showApplyBuyer: true,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  deleteHome = () => {
    let data = {
      OwnerID: localStorage.getItem("_id"),
      ListingID: this.props.get_listing[0]._id,
    };
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    console.log(data);
    axios
      .post(configPath.api_host + `/seller/deleteListing`, data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          var payload = {
            MinPrice: "",
            MaxPrice: "",
            MinArea: "",
            MaxArea: "",
            ZIP: "",
            StreetAddress: "",
            NoOfBedrooms: "",
            NoOfBathrooms: "",
            State: "",
            FlooringType: "",
            HomeType: "",
            Parking: "",
            YearBuilt: "",
          };
          this.props.dispatch(search(payload));
          alert("Successfully Deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addHome = () => {
    let x = this.props.get_listing[0];
    let data = {
      UserID: localStorage.getItem("_id"),
      FavouriteHomes: {
        ListingID: x._id,
        StreetAddress: x.StreetAddress,
        ZIP: x.ZIP,
        Price: x.Price,
        NoOfBedrooms: x.NoOfBedrooms,
        NoOfBathrooms: x.NoOfBathrooms,
        State: x.State,
        Area: x.Area,
      },
    };
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );

    axios
      .post(configPath.api_host + `/housing/addFavoriteHome`, data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.props.handleClose();
          //this.dispatchAction();
          alert("Successfully added to favorites");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    console.log(this.props.match.params.id);
    var data;
    if (this.props.get_listing[0]) {
      data = this.props.get_listing[0];
    } else {
      data = this.state;
    }
    console.log(data);
    var add, del;
    if (localStorage.getItem("_id") === data.OwnerID) {
      add = (
        <Button
          style={{
            float: "right",
            borderRadius: "50%",
            height: "80px",
            width: "80px",
            right: 40,
            bottom: 30,
            position: "fixed",
            fontSize: "40px",
          }}
          onClick={this.handleShow}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      );
      del = (
        <Button
          style={{
            float: "right",
            borderRadius: "50%",
            height: "80px",
            width: "80px",
            right: 140,
            bottom: 30,
            position: "fixed",
            fontSize: "40px",
          }}
          onClick={this.deleteHome}
        >
          <Link to="/houseListing">
            <FontAwesomeIcon icon={faTrash} style={{ color: "#FFF" }} />
          </Link>
        </Button>
      );
    }
    let x = <div>loading....</div>;
    console.log(data);
    let y;
    if (localStorage.getItem("role") == "Buyer") {
      y = (
        <Button variant="primary" onClick={this.handleShowApplyBuyer}>
          Apply
        </Button>
      );
    } else if (localStorage.getItem("role") == "Renter") {
      y = (
        <Button variant="primary" onClick={this.handleShowApplyRenter}>
          Apply
        </Button>
      );
    }

    if (data != {}) {
      x = (
        <Container fluid style={{ marginTop: "20px" }}>
          <Row>
            <Col md="6">
              <Image src="/home.jpg" />
              <div style={{ margin: "0 auto" }}>
                <Button variant="primary" onClick={this.addHome}>
                  Add to Favorite
                </Button>
                {y}
              </div>
            </Col>
            <Col md="6">
              <h2>
                ${data.Price}
                <span className="housecard-right">
                  {data.NoOfBedrooms} bds | {data.NoOfBathrooms} ba |{" "}
                  {data.Area} sqft
                </span>
              </h2>
              <h5>{data.StreetAddress + " " + data.State + " " + data.ZIP}</h5>
              <h4 style={{ borderBottom: "1px solid #CCC", marginTop: "30px" }}>
                Fact and features
              </h4>
              <Table responsive borderless>
                <tbody>
                  <tr>
                    <td>
                      <b>Type</b>: {data.HomeType}
                    </td>
                    <td>
                      <b>Year Built</b>: {data.YearBuilt}
                    </td>
                  </tr>
                  <tr style={{ padding: "3px" }}>
                    <td>
                      <b>Parking</b>: {data.Parking}
                    </td>
                    <td>
                      <b>Security Deposit</b>: ${data.SecurityDeposit}
                    </td>
                  </tr>
                  <tr style={{ padding: "3px" }}>
                    <td>
                      <b>Available Date</b>: {data.AvailabilityDate}
                    </td>
                    <td>
                      <b>Open House Date</b>: {data.OpenHouse}
                    </td>
                  </tr>
                  <tr style={{ padding: "3px" }}>
                    <td>
                      <b>Amenities</b>: {data.Amenities}
                    </td>
                    <td>
                      <b>Flooring Type</b>: {data.FlooringType}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <p>
                Take a look at this beautifully maintained 1990, home with
                approx. 1,013 Sq. Ft., 3 bedrooms, and 2 bathrooms. As you enter
                you will be greeted by a lovely living room area with vaulted
                ceilings and a dining room with a pretty light fixture. Then the
                kitchen features an illuminating skylight and is well equipped
                with a stove, oven, and refrigerator. This home is perfect for a
                family or for entertaining guests as it features 2 full
                bathrooms with a shower and tub combo. The master bedroom is
                spacious and includes a window air-conditioning{" "}
              </p>
              {add}
              {del}
              <UpdateHome
                show={this.state.show}
                handleClose={this.handleClose}
                homeID={this.props.match.params.id}
              />
              <ApplyBuyer
                show={this.state.showApplyBuyer}
                handleClose={this.handleCloseApplyBuyer}
                homeID={this.props.match.params.id}
              />
              <ApplyRenter
                show={this.state.showApplyRenter}
                handleClose={this.handleCloseApplyRenter}
                homeID={this.props.match.params.id}
              />
            </Col>
          </Row>
        </Container>
      );
    }
    return <div>{x}</div>;
  }
}

const mapStateToProps = (state) => ({
  listings: state.search.allListing,
  get_listing: state.search.listing,
});

export default connect(mapStateToProps)(HomeDescription);
