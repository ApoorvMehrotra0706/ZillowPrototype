import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Table,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineCursorClick } from "react-icons/hi";
import { BsBuilding } from "react-icons/bs";
import { FaParking, FaMoneyBill } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { GiThermometerCold } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { BiCalendarCheck, BiCalendarStar } from "react-icons/bi";
import { search1 } from "../../../action/listingAction";
import { search } from "../../../action/searchAction";
import UpdateHome from "./updateHome";
import configPath from "../../../config";
import axios from "axios";
import ApplyBuyer from "./applyBuyer";
import ApplyRenter from "./applyRenter";
import AppliedBuyer from "./appliedBuyer";
import { Redirect } from "react-router-dom";

class HomeDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showApplyBuyer: false,
      showApplyRenter: false,
      showApplied: false,
      show: false,
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
      AvailabilityDate: "",
      SecurityDeposit: "",
      YearBuilt: "",
      AvailableAs: "",
      OpenHouse: "",
      success: false,
    };
  }

  componentDidMount() {
    var payload = {
      ListingID: this.props.match.params.id,
    };
    console.log(payload);
    this.props.dispatch(search1(payload));
  }

  handleCloseApplied = () => {
    this.setState({
      showApplied: false,
    });
  };

  handleShowApplied = () => {
    this.setState({
      showApplied: true,
    });
  };

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
      ListingID: this.props.get_listing[0]._id,
    };
    let link;
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    if (localStorage.getItem("role") == "Realtor") {
      data["RealtorID"] = localStorage.getItem("_id");
      link = "/realtor/deleteListing";
    }
    if (localStorage.getItem("role") == "Landlord") {
      data["OwnerID"] = localStorage.getItem("_id");
      link = "/landlord/deleteListing";
    }
    if (localStorage.getItem("role") == "Seller") {
      data["OwnerID"] = localStorage.getItem("_id");
      link = "/seller/deleteListing";
    }
    console.log(data);
    axios
      .post(configPath.api_host + link, data)
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
          this.setState({
            success: true,
          });
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
    if (this.state.success === true) {
      <Redirect to="/houseListing" />;
    }
    if (this.props.get_listing[0]) {
      data = this.props.get_listing[0];
    } else {
      data = this.state;
    }
    console.log(data);
    let y;
    var add, del;
    if (
      localStorage.getItem("_id") === data.OwnerID ||
      localStorage.getItem("_id") === data.RealtorID
    ) {
      add = (
        <NavDropdown title="... More" style={{ float: "right" }}>
          <NavDropdown.Item
            className="adDropdown"
            style={{ color: "#007bff" }}
            onClick={this.handleShow}
          >
            Edit
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            className="adDropdown"
            style={{ color: "red" }}
            onClick={this.deleteHome}
          >
            Delete
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
    let x = <div>loading....</div>;
    console.log(data);
    let lease;
    if (localStorage.getItem("role") == "Buyer") {
      y = (
        <Button onClick={this.handleShowApplyBuyer}>
          <HiOutlineCursorClick /> Apply
        </Button>
      );
    } else if (
      localStorage.getItem("role") == "Renter" ||
      localStorage.getItem("role") == "Landlord"
    ) {
      if (localStorage.getItem("role") == "Renter")
        y = (
          <Button onClick={this.handleShowApplyRenter}>
            <HiOutlineCursorClick /> Apply
          </Button>
        );
      else
        y = (
          <Button onClick={this.handleShowApplied}>
            <HiOutlineCursorClick /> Applied Users
          </Button>
        );
      lease = (
        <div>
          {" "}
          <h4 style={{ borderBottom: "1px solid #CCC", marginTop: "10px" }}>
            Lease Terms
          </h4>
          <p>{data.LeaseTerms}</p>
        </div>
      );
    } else {
      y = (
        <Button onClick={this.handleShowApplied}>
          <HiOutlineCursorClick /> Applied Users
        </Button>
      );
    }

    if (data != {}) {
      x = (
        <Container fluid style={{ marginTop: "20px" }}>
          <Row>
            <Col md="6">
              <Image
                style={{
                  objectFit: "cover",
                  width: "100%",
                  marginBottom: "30px",
                }}
                src={
                  data.ImageURL && data.ImageURL.length > 0
                    ? data.ImageURL[0]
                    : "/home.jpg"
                }
              />
              <Row>
                <Col md="6">
                  <Image
                    style={{
                      objectFit: "cover",
                      width: "100%",
                    }}
                    src={
                      data.ImageURL && data.ImageURL.length > 1
                        ? data.ImageURL[1]
                        : "/home.jpg"
                    }
                  />
                </Col>
                <Col md="6">
                  <Image
                    style={{
                      objectFit: "cover",
                      width: "100%",
                    }}
                    src={
                      data.ImageURL && data.ImageURL.length > 2
                        ? data.ImageURL[2]
                        : "/home.jpg"
                    }
                  />
                </Col>
                {/* <div style={{ margin: "0 auto" }}>
                <Button variant="primary" onClick={this.addHome}>
                  Add to Favorite
                </Button>
                {y}
              </div> */}
              </Row>
            </Col>
            <Col
              md="5"
              style={{
                border: "1px solid rgba(0,0,0,.1)",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  paddingLeft: "0",
                }}
              >
                <Button style={{ marginRight: "5px" }} onClick={this.addHome}>
                  <AiOutlineHeart /> Favorite
                </Button>
                {y}
                {add}
              </div>
              <h2
                style={{
                  display: "inline",
                  marginRight: "10px",
                  fontWeight: "bold",
                  fontSize: "36px",
                }}
              >
                ${data.Price}
              </h2>
              <p
                className="housecard-right"
                style={{ display: "inline", color: "gray" }}
              >
                <span style={{ color: "black", fontWeight: "500" }}>
                  {data.NoOfBedrooms}{" "}
                </span>{" "}
                bds |{" "}
                <span style={{ color: "black", fontWeight: "500" }}>
                  {data.NoOfBathrooms}
                </span>{" "}
                ba |{" "}
                <span style={{ color: "black", fontWeight: "500" }}>
                  {data.Area}
                </span>{" "}
                sqft
              </p>
              <p style={{ fontSize: "16px", color: "gray", marginTop: "8px" }}>
                {data.StreetAddress + " " + data.State + " " + data.ZIP}
              </p>

              <h4 style={{ borderBottom: "1px solid #CCC", marginTop: "30px" }}>
                Overview
              </h4>

              <p>
                Take a look at this beautifully maintained {data.YearBuilt},
                home with approx. {data.Area} Sq. Ft., {data.NoOfBedrooms}{" "}
                bedrooms, and {data.NoOfBathrooms} bathrooms. As you enter you
                will be greeted by a lovely living room area with vaulted
                ceilings and a dining room with a pretty light fixture. Then the
                kitchen features an illuminating skylight and is well equipped
                with {data.Amenities}. This home is perfect for a family or for
                entertaining guests as it features {data.NoOfBathrooms} full
                bathrooms with a shower and tub combo. The master bedroom is
                spacious and includes a window air-conditioning{" "}
              </p>

              <h4 style={{ borderBottom: "1px solid #CCC", marginTop: "30px" }}>
                Fact and features
              </h4>
              <Table responsive borderless>
                <tbody>
                  <tr>
                    <td>
                      <BsBuilding></BsBuilding>
                      <b style={{ marginLeft: "5px" }}>Type</b>: {data.HomeType}
                    </td>
                    <td>
                      <FiCalendar></FiCalendar>
                      <b style={{ marginLeft: "5px" }}>Year Built</b>:{" "}
                      {data.YearBuilt}
                    </td>
                  </tr>
                  <tr style={{ padding: "3px" }}>
                    <td>
                      <FaParking></FaParking>
                      <b style={{ marginLeft: "5px" }}>Parking</b>:{" "}
                      {data.Parking}
                    </td>
                    <td>
                      <FaMoneyBill></FaMoneyBill>
                      <b style={{ marginLeft: "5px" }}>Security Deposit</b>: $
                      {data.SecurityDeposit}
                    </td>
                  </tr>
                  <tr style={{ padding: "3px" }}>
                    <td>
                      <BiCalendarCheck></BiCalendarCheck>
                      <b style={{ marginLeft: "5px" }}>Available Date</b>:{" "}
                      {data.AvailabilityDate}
                    </td>
                    <td>
                      <BiCalendarStar></BiCalendarStar>
                      <b style={{ marginLeft: "5px" }}>Open House Date</b>:{" "}
                      {data.OpenHouse}
                    </td>
                  </tr>
                  <tr style={{ padding: "3px" }}>
                    <td>
                      <GiThermometerCold></GiThermometerCold>
                      <b style={{ marginLeft: "5px" }}>Amenities</b>:{" "}
                      {data.Amenities}
                    </td>
                    <td>
                      <MdDashboard></MdDashboard>
                      <b style={{ marginLeft: "5px" }}>Flooring Type</b>:{" "}
                      {data.FlooringType}
                    </td>
                  </tr>
                </tbody>
              </Table>

              {lease}

              {/* {add}
              {del} */}
              <AppliedBuyer
                show={this.state.showApplied}
                handleClose={this.handleCloseApplied}
                homeID={this.props.match.params.id}
              />
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
