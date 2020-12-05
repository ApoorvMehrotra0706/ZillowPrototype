import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import List from "./listing";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    var add;
    return (
      <Container fluid style={{ marginTop: "30px" }}>
        <Row>
          <List />
        </Row>
      </Container>
    );
  }
}

export default Home;
