import React from "react";
import { CardDeck, Card, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { search1 } from "../../../action/favSearchAction";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: 0,
      payload: {},
    };
  }
  componentDidMount() {
    var payload = {
      UserID: localStorage.getItem("_id"),
    };
    this.props.dispatch(search1(payload));
  }

  applyFilter = (i) => {
    console.log(i);
    var data = this.props.listings[i - 1];
    var payload = {
      MinPrice: data.PriceStartRange,
      MaxPrice: data.PriceEndRange,
      MinArea: data.MinArea,
      MaxArea: data.MaxArea,
      ZIP: data.ZIP,
      StreetAddress: data.StreetAddress,
      NoOfBedrooms: data.NoOfBedroom,
      NoOfBathrooms: data.NoOfBathrooms,
      State: data.State,
      FlooringType: data.FlooringType,
      HomeType: data.HomeType,
      Parking: data.Parking,
      YearBuilt: data.YearBuilt,
      Country: data.Country,
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
    //this.props.dispatch(search(payload));
    this.setState({ redirect: 1, payload: payload });
  };

  render() {
    console.log(this.props.listings);
    var i = 0,
      y;
    let x = this.props.listings.map(
      ({
        _id,
        SearchName,
        ZIP,
        StreetAddress,
        State,
        NoOfBedrooms,
        NoOfBathrooms,
        PriceStartRange,
        PriceEndRange,
        HomeType,
        Parking,
        Amenities,
        YearBuilt,
        MinArea,
        MaxArea,
      }) => {
        i++;
        console.log("y" + i);
        return (
          <Col xl={3}>
            <Card
              key={_id}
              className="card-style-1"
              onClick={() => {
                this.applyFilter(i);
              }}
            >
              <Card.Body>
                <Card.Title>Search Name: {SearchName}</Card.Title>
                <Card.Text>
                  Address: {StreetAddress}
                  <br />
                  State: {State}
                  <br />
                  ZIP: {ZIP}
                  <br />
                  Min Price: {PriceStartRange}
                  <br />
                  Max Price: {PriceEndRange}
                  <br />
                  HomeType: {HomeType}
                  <br />
                  Parking: {Parking}
                  <br />
                  {NoOfBedrooms} bds | {NoOfBathrooms} ba
                  <br />
                  Amenities: {Amenities}
                  <br />
                  Year Built: {YearBuilt}
                  <br />
                  Min Area: {MinArea}
                  <br />
                  Max Area: {MaxArea}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      }
    );
    if (this.state.redirect == 1)
      return (
        <Redirect
          to={{
            pathname: "/houseListing",
            state: {
              payload: this.state.payload,
            },
          }}
        />
      );
    return (
      <div>
        <CardDeck>{x}</CardDeck>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listings: state.favSearch.allListing,
});

export default connect(mapStateToProps)(List);
