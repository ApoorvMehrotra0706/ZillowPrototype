import React from "react";
import { CardDeck, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { search } from "../../../action/favHomesAction";

class List extends React.Component {
  componentDidMount() {
    var payload = {
      UserID: localStorage.getItem("_id"),
    };
    this.props.dispatch(search(payload));
  }

  render() {
    console.log(this.props.listings);
    var i = 0;
    let x = this.props.listings.map(
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
      }) => {
        var lk = "/housedescription/" + ListingID;
        return (
          <Col xl={3}>
            <Card key={_id} className="card-style-1">
              <Card.Img variant="top" src="/home.jpg" />
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
  listings: state.favHomes.allListing,
});

export default connect(mapStateToProps)(List);
