import React from "react";
import { Container, Row } from "react-bootstrap";
import List from "./mylisting";

class Home extends React.Component {
  render() {
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
