import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import configPath from "../../../config";
import axios from "axios";
import { connect } from "react-redux";
import { search1 } from "../../../action/listingAction";

class AddHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: "",
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
      Error: "",
      AvailableAs: 1,
    };
  }

  componentDidMount() {
    var data = this.props.get_listing[0];
    if (data !== undefined)
      this.setState({
        ZIP: data.ZIP,
        StreetAddress: data.StreetAddress,
        State: data.State,
        Country: data.Country,
        Price: data.Price,
        Area: data.Area,
        NoOfBedrooms: data.NoOfBedrooms,
        NoOfBathrooms: data.NoOfBathrooms,
        FlooringType: data.FlooringType,
        HomeType: data.HomeType,
        Parking: data.Parking,
        Amenities: data.Amenities,
        LeaseTerms: data.LeaseTerms,
        AvailabiltyDate: data.AvailabiltyDate,
        SecurityDeposit: data.SecurityDeposit,
        YearBuilt: data.YearBuilt,
        AvailableAs: data.AvailableAs,
        OpenHouse: data.OpenHouse,
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.get_listing != this.props.get_listing) {
      var data = this.props.get_listing[0];
      if (data !== undefined)
        this.setState({
          ZIP: data.ZIP,
          StreetAddress: data.StreetAddress,
          State: data.State,
          Country: data.Country,
          Price: data.Price,
          Area: data.Area,
          NoOfBedrooms: data.NoOfBedrooms,
          NoOfBathrooms: data.NoOfBathrooms,
          FlooringType: data.FlooringType,
          HomeType: data.HomeType,
          Parking: data.Parking,
          Amenities: data.Amenities,
          LeaseTerms: data.LeaseTerms,
          AvailabiltyDate: data.AvailabiltyDate,
          SecurityDeposit: data.SecurityDeposit,
          YearBuilt: data.YearBuilt,
          AvailableAs: data.AvailableAs,
          OpenHouse: data.OpenHouse,
        });
    }
  }

  editProfileHandlerSubmit = () => {
    //console.log(this.state);
    let error = 0;
    console.log(this.state.ZIP);
    if (this.state.ZIP === "") {
      this.setState({
        Error: "ZIP is mandatory",
      });
      error = 1;
    }
    if (this.state.StreetAddress === "") {
      this.setState({
        Error: "Street Address is mandatory",
      });
      error = 1;
    }
    if (this.state.State === "") {
      this.setState({
        Error: "State is mandatory",
      });
      error = 1;
    }
    if (this.state.Country === "") {
      this.setState({
        Error: "Country is mandatory",
      });
      error = 1;
    }
    if (this.state.Price === "") {
      this.setState({
        Error: "Price is mandatory",
      });
      error = 1;
    }
    if (this.state.Area === "") {
      this.setState({
        Error: "Area is mandatory",
      });
      error = 1;
    }
    // if (this.state.file === null || this.state.file.length < 1) {
    //   this.setState({
    //     Error: "File is mandatory",
    //   });
    //   error = 1;
    // }
    if (error === 0) {
      //const fd = new FormData();
      var ZIP = Number(this.state.ZIP, 10);
      var Price = Number(this.state.Price, 10);
      var Area = Number(this.state.Area, 10);
      var NoOfBedrooms = Number(this.state.NoOfBedrooms, 10);
      var NoOfBathrooms = Number(this.state.NoOfBathrooms, 10);
      var YearBuilt = Number(this.state.YearBuilt, 10);
      var payload = {
        ListingID: this.props.get_listing[0]._id,
      };
      let data = {
        OwnerID: localStorage.getItem("_id"),
        _id: this.props.get_listing[0]._id,
        ZIP,
        StreetAddress: this.state.StreetAddress,
        State: this.state.State,
        Country: this.state.Country,
        OwnerEmail: localStorage.getItem("emailID"),
        Price,
        Area,
        NoOfBedrooms,
        NoOfBathrooms,
        FlooringType: this.state.FlooringType,
        HomeType: this.state.HomeType,
        Parking: this.state.Parking,
        Amenities: this.state.Amenities,
        LeaseTerms: this.state.LeaseTerms,
        AvailabiltyDate: this.state.AvailabiltyDate,
        SecurityDeposit: this.state.SecurityDeposit,
        YearBuilt,
        AvailableAs: this.state.AvailableAs,
        OpenHouse: this.state.OpenHouse,
      };
      // for (let i = 0; i <= this.state.file.length; i++) {
      //   fd.append("file" + i, this.state.file[i]);
      // }
      var link;
      if (localStorage.getItem("role") == "Realtor") {
        data["RealtorID"] = localStorage.getItem("_id");
        data["RealtorName"] = localStorage.getItem("name");
        link = "/realtor/updateListing";
      } else {
        data["OwnerEmail"] = localStorage.getItem("emailID");
        data["OwnerID"] = localStorage.getItem("_id");
        data["OwnerName"] = localStorage.getItem("name");
        if (localStorage.getItem("role") == "Seller") {
          link = "/seller/updateListing";
          data["AvailableAs"] = 1;
        } else {
          link = "/landlord/updateListing";
          data["AvailableAs"] = 2;
        }
      }
      axios.defaults.headers.common.authorization = localStorage.getItem(
        "IDToken"
      );

      axios
        .post(configPath.api_host + `/seller/updateListing`, data)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.props.handleClose();
            //this.dispatchAction();

            this.props.dispatch(search1(payload));
            alert("Successfully added");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    let error = "";
    if (this.state.Error != "") {
      error = <Alert variant="danger">{this.state.Error}</Alert>;
    }
    var rent, realtor;
    if (
      localStorage.getItem("role") == "Landlord" ||
      localStorage.getItem("role") == "Realtor"
    ) {
      rent = (
        <div>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Lease Terms</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={this.state.LeaseTerms}
              onChange={(e) => {
                this.setState({ LeaseTerms: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Security Deposit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Amount"
              value={this.state.SecurityDeposit}
              onChange={(e) => {
                this.setState({ SecurityDeposit: e.target.value });
              }}
            />
          </Form.Group>
        </div>
      );
    }
    if (localStorage.getItem("role") == "Realtor") {
      realtor = (
        <Form.Group controlId="formGridBed">
          <Form.Label>AvailableAs</Form.Label>
          <Form.Control
            as="select"
            defaultValue="2"
            value={this.state.AvailableAs}
            onChange={(e) => {
              this.setState({ AvailableAs: e.target.value });
            }}
          >
            <option value={1}>Sell</option>
            <option value={2}>Rent</option>
          </Form.Control>
        </Form.Group>
      );
    }
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Home</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            {error}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>ZIP</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ZIP"
                value={this.state.ZIP}
                onChange={(e) => {
                  this.setState({ ZIP: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Street Address"
                value={this.state.StreetAddress}
                onChange={(e) => {
                  this.setState({ StreetAddress: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                value={this.state.State}
                onChange={(e) => {
                  this.setState({ State: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={this.state.Country}
                onChange={(e) => {
                  this.setState({ Country: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={this.state.Price}
                onChange={(e) => {
                  this.setState({ Price: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Area"
                value={this.state.Area}
                onChange={(e) => {
                  this.setState({ Area: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formGridBed">
              <Form.Label>Bedroom</Form.Label>
              <Form.Control
                as="select"
                defaultValue="2"
                value={this.state.NoOfBedrooms}
                onChange={(e) => {
                  this.setState({ NoOfBedrooms: e.target.value });
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
                defaultValue="2"
                value={this.state.NoOfBathrooms}
                onChange={(e) => {
                  this.setState({ NoOfBathrooms: e.target.value });
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
                defaultValue="2"
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
                defaultValue="2"
                value={this.state.Parking}
                onChange={(e) => {
                  this.setState({ Parking: e.target.value });
                }}
              >
                <option>Closed</option>
                <option>Open</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Flooring Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Flooring Type"
                value={this.state.FlooringType}
                onChange={(e) => {
                  this.setState({ FlooringType: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Amenities</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={this.state.Amenities}
                onChange={(e) => {
                  this.setState({ Amenities: e.target.value });
                }}
              />
            </Form.Group>

            {rent}

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Availabilty Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Date"
                value={this.state.AvailabiltyDate}
                onChange={(e) => {
                  this.setState({ AvailabiltyDate: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Year Built</Form.Label>
              <Form.Control
                type="Year"
                placeholder="Enter Year"
                value={this.state.YearBuilt}
                onChange={(e) => {
                  this.setState({ YearBuilt: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Open House</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Date"
                value={this.state.OpenHouse}
                onChange={(e) => {
                  this.setState({ OpenHouse: e.target.value });
                }}
              />
            </Form.Group>
            {realtor}
            <Form.Group>
              <Form.File id="exampleFormControlFile1" label="Insert Image" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.editProfileHandlerSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  get_listing: state.search.listing,
});

export default connect(mapStateToProps)(AddHome);
