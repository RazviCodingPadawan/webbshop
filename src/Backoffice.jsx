import { useStates } from './utilities/states';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import { Link } from "react-router-dom";

import './ProductList.css'
import './Backoffice.css'

export default function Backoffice() {

  scrollRestore();

  return <Container className="productList">
    <Row><Col><h1>PRODUKTER</h1></Col></Row>
    <Row className="mb-4"><Col><CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} /></Col></Row>
    {s.products.filter(product =>
      s.chosenCategoryId === 0 /*alla*/
      || s.chosenCategoryId === product.categoryId
    ).map(({ id, name, description, price }) =>
      <Row className="product" key={id} onClick={() => showDetail(id)}>
        <Card>
          <Col ml="12">
            <h3>{name}</h3>
            <img onError={event => missingImage(event, name)} className="float-end ms-3" style={{ width: 300, height: 300, objectFit: 'contain' }} src={`/images/products/${id}.jpg`} />
            <p>{description}</p>
          </Col>
          <Col ml="12">
            <p><b>Pris:</b> {sweFormat(price)}</p>
          </Col>
        </Card>
      </Row>
    )}
    <h1>Welcome to backoffice</h1>
    <h3>The place where shit happens 💩</h3>
    <Link to="/backoffice/edit">Edit</Link>
    <Link to="/backoffice/create">Create</Link>
    <Link to="/backoffice/delete">Delete</Link>
  </Container>
}