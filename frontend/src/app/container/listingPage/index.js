import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Filters from "./filter";
import List from "./listing";
import AddHome from "./addHome";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

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

  render() {
    var add, list;
    if (
      localStorage.getItem("role") == "Seller" ||
      localStorage.getItem("role") == "Landlord" ||
      localStorage.getItem("role") == "Realtor"
    ) {
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
          +
        </Button>
      );
    }
    if (this.props.location.state && this.props.location.state.payload) {
      list = <List payload={this.props.location.state.payload} />;
    } else {
      list = <List />;
    }
    return (
      <Container fluid style={{ marginTop: "30px" }}>
        <Row>
          <Col
            lg={2}
            md={2}
            sm={2}
            xs={12}
            style={{ borderRight: "1px solid #CCC" }}
          >
            <Filters />
          </Col>
          <Col lg={10} md={10} sm={10} xs={12}>
            {list}
          </Col>
        </Row>
        {add}
        <AddHome show={this.state.show} handleClose={this.handleClose} />
      </Container>
    );
  }
}

export default Home;
