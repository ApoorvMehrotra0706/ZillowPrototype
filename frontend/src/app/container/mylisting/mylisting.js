import React from "react";
import { CardDeck, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { search } from "../../../action/myListingAction";

class List extends React.Component {
  componentDidMount() {
    console.log("Hi");
    var payload;
    if (localStorage.getItem("role") == "Realtor")
      payload = {
        RealtorID: localStorage.getItem("_id"),
      };
    else
      payload = {
        OwnerID: localStorage.getItem("_id"),
      };
    this.props.dispatch(search(payload));
  }

  render() {
    console.log(this.props.listings);
    var i = 0;
    let x;
    if (this.props.listings != undefined)
      x = this.props.listings.map(
        ({
          _id,
          ListingID,
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

    return (
      <div>
        <CardDeck>{x}</CardDeck>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listings: state.myHomes.allListing,
});

export default connect(mapStateToProps)(List);
