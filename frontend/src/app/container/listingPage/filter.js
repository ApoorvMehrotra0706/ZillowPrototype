import React from "react";
import { Form, Button } from "react-bootstrap";
import "rc-slider/assets/index.css";
//import  { RangeSlider } from 'rsuite';
//import 'rsuite/dist/styles/rsuite-default.css';
import { search } from "../../../action/searchAction";
import { connect } from "react-redux";
import configPath from "../../../config";
import axios from "axios";

class ListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Price: 50000,
      Area: 1000,
      ZIP: "",
      StreetAddress: "",
      NoOfBedroom: 1,
      NoOfBathrooms: 1,
      State: "",
      Country: "",
      FlooringType: "",
      HomeType: "Apartment",
      Parking: "Closed",
      YearBuilt: "",
      AvailableAs: "",
      SearchName: "",
    };
  }

  saveFilter = () => {
    var data = {
      UserID: localStorage.getItem("_id"),
      FavouriteSearches: {
        PriceStartRange: 0,
        PriceEndRange: this.state.Price,
        MinArea: 0,
        MaxArea: this.state.Area,
        ZIP: this.state.ZIP,
        StreetAddress: this.state.StreetAddress,
        NoOfBedrooms: this.state.NoOfBedroom,
        NoOfBathrooms: this.state.NoOfBathrooms,
        State: this.state.State,
        FlooringType: this.state.FlooringType,
        HomeType: this.state.HomeType,
        Parking: this.state.Parking,
        YearBuilt: this.state.YearBuilt,
        SearchName: this.state.SearchName,
      },
    };
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );

    axios
      .post(configPath.api_host + `/housing/addFavoriteSearch`, data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          alert("Successfully added to search");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  applyFilter = () => {
    var payload = {
      MinPrice: 0,
      MaxPrice: this.state.Price,
      MinArea: 0,
      MaxArea: this.state.Area,
      ZIP: this.state.ZIP,
      StreetAddress: this.state.StreetAddress,
      NoOfBedrooms: this.state.NoOfBedroom,
      NoOfBathrooms: this.state.NoOfBathrooms,
      State: this.state.State,
      FlooringType: this.state.FlooringType,
      HomeType: this.state.HomeType,
      Parking: this.state.Parking,
      YearBuilt: this.state.YearBuilt,
    };
    if (
      localStorage.getItem("role") == "Seller" ||
      localStorage.getItem("role") == "Buyer"
    )
      payload["AvailableAs"] = 1;
    else if (
      localStorage.getItem("role") == "Landload" ||
      localStorage.getItem("role") == "Renter"
    )
      payload["AvailableAs"] = 2;

    this.props.dispatch(search(payload));
  };

  render() {
    return (
      <div>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>ZipCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Zip Code"
            value={this.state.ZIP}
            onChange={(e) => {
              this.setState({ ZIP: Number(e.target.value) });
            }}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street"
            value={this.state.StreetAddress}
            onChange={(e) => {
              this.setState({ StreetAddress: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="State"
            value={this.state.State}
            onChange={(e) => {
              this.setState({ State: e.target.value });
            }}
          />
        </Form.Group>
        <Form>
          <Form.Group controlId="formBasicRange">
            <Form.Label>Price - 0 to {this.state.Price}</Form.Label>
            <Form.Control
              type="range"
              value={this.state.Price}
              onChange={(e) => {
                this.setState({ Price: e.target.value });
              }}
              max={5000000}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group controlId="formBasicRange">
            <Form.Label>Area - 0 to {this.state.Area}</Form.Label>
            <Form.Control
              type="range"
              value={this.state.Area}
              onChange={(e) => {
                this.setState({ Area: e.target.value });
              }}
              max={10000}
            />
          </Form.Group>
        </Form>
        <Form.Group controlId="formGridBed">
          <Form.Label>Bedroom</Form.Label>
          <Form.Control
            as="select"
            defaultValue="2"
            value={this.state.NoOfBedroom}
            onChange={(e) => {
              this.setState({ NoOfBedroom: Number(e.target.value) });
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGridBath">
          <Form.Label>Bathroom</Form.Label>
          <Form.Control
            as="select"
            value={this.state.NoOfBathrooms}
            onChange={(e) => {
              this.setState({ NoOfBathrooms: Number(e.target.value) });
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGridBath">
          <Form.Label>Home Type</Form.Label>
          <Form.Control
            as="select"
            value={this.state.HomeType}
            onChange={(e) => {
              this.setState({ HomeType: e.target.value });
            }}
          >
            <option>Apartment</option>
            <option>House</option>
            <option>Attached Single Family Home</option>
            <option>Detatched Single</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGridBath">
          <Form.Label>Parking</Form.Label>
          <Form.Control
            as="select"
            value={this.state.Parking}
            onChange={(e) => {
              this.setState({ Parking: e.target.value });
            }}
          >
            <option>Closed</option>
            <option>Open</option>
          </Form.Control>
          <Form.Group controlId="exampleForm.ControlInput7">
            <Form.Label>Year Built</Form.Label>
            <Form.Control
              type="text"
              placeholder="Year"
              value={this.state.YearBuilt}
              onChange={(e) => {
                this.setState({ YearBuilt: Number(e.target.value) });
              }}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput7">
            <Form.Label>Search Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter search name"
              value={this.state.SearchName}
              onChange={(e) => {
                this.setState({ SearchName: e.target.value });
              }}
            />
          </Form.Group>
          <Button variant="primary" onClick={this.applyFilter}>
            Search
          </Button>
          <Button
            variant="primary"
            onClick={this.saveFilter}
            style={{ marginLeft: "10px" }}
          >
            Save Filter
          </Button>
        </Form.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listings: state.search.allListing,
});

export default connect(mapStateToProps)(ListingPage);
