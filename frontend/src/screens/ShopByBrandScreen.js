import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import Sort from "../components/Sort";

import { listProductByBrand } from "../actions/productActions";

/* /api/products/category/${cat} */

const HomeScreen = ({ match }) => {
  const brand = match.params.brand || "";

  const dispatch = useDispatch();

  const productCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productCategory;

  useEffect(() => {
    dispatch(listProductByBrand(brand));
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <Meta />
      <h1>{`Products of ${brand}`}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products && (
            <>
          <Link to="/">
                <Button><i className="fas fa-arrow-left"></i>  Go Back</Button>
                <br/>
              </Link>
              <br/>
              <Row>
                <Col md={3}>
                  <h6>Sort By:</h6>
                  <Sort products={products} />
                </Col>
              </Row>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
