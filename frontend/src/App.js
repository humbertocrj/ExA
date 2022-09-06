import logo from './logo.svg';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <Container>
      <Row>
      <Col>Header</Col>
      </Row>
      <Row>
        <Col>Sidebar</Col>
        <Col>Main</Col>
      </Row>
      <Row>
      <Col>Footer</Col>
      </Row>
    </Container>
  );
}

export default App;
