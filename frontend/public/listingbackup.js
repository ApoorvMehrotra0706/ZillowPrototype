import React from "react";
import { CardDeck, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
//import search  from "../../../action/searchAction";

class List extends React.Component {
  
componentDidMount(){
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
    }
    //this.props.dispatch(search(payload))
  }

  render() {
    const x = this.props.listings.map(
      ({
        _id,
        ZIP,
        StreetAddress,
        State,
        NoOfBedrooms,
        NoOfBathrooms,
        Area,
        Price
      }) => {
        return(
          <Card key={_id}>
          <Card.Img variant="top" src="/home.jpg" />
          <Link to="/housedescription">
            <Card.Body>
              <Card.Title>
                {Price}
                <span className="housecard">{NoOfBedrooms} bds | {NoOfBathrooms} ba | {Area} sqft</span>
              </Card.Title>
        <Card.Text>{StreetAddress + " " + State + " " + ZIP}</Card.Text>
            </Card.Body>
          </Link>
          <Card.Footer>
            <small className="text-muted">10 days ago</small>
          </Card.Footer>
        </Card>
        );
      }
    )
    return (
      <div>
        <CardDeck>
          {x}
        </CardDeck>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listings: state.search.allListing,
});

export default connect(mapStateToProps)(List);

