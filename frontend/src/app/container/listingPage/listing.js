import React from "react";
import { CardDeck, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { search } from "../../../action/searchAction";

class List extends React.Component {
  componentDidMount() {
    console.log("check payload");
    console.log(this.props.payload);
    if (this.props.payload) {
      //console.log(1);
      this.props.dispatch(search(this.props.payload));
    } else {
      //console.log(2);
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
    }
  }

  render() {
    console.log("x");
    console.log(this.props.listings);
    var i = 0;
    let x;
    if (this.props.listings != "Network error") {
      x = this.props.listings.map(
        ({
          _id,
          ZIP,
          StreetAddress,
          State,
          NoOfBedrooms,
          NoOfBathrooms,
          Area,
          Price,
          ImageURL,
        }) => {
          var lk = "/housedescription/" + _id;
          return (
            <Col xl={3}>
              <Card key={_id} className="card-style-1">
                <Card.Img
                  variant="top"
                  src={
                    ImageURL && ImageURL.length > 0 ? ImageURL[0] : "/home.jpg"
                  }
                  style={{
                    height: 178,
                    width: 268,
                  }}
                />
                <Link to={lk}>
                  <Card.Body>
                    <Card.Title>
                      ${Price}
                      <span className="housecard">
                        {NoOfBedrooms} bds | {NoOfBathrooms} ba | {Area} sqft
                      </span>
                    </Card.Title>
                    <Card.Text>
                      {StreetAddress + " " + State + " " + ZIP}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        }
      );
    }
    return (
      <div>
        <CardDeck>{x}</CardDeck>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listings: state.search.allListing,
});

export default connect(mapStateToProps)(List);
