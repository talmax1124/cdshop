import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Badge,
  Modal,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import moment from "moment";
import ProductDescription from "../components/ProductDescription";
import ProductInformation from "../components/ProductInformation";

import ProductImageCarousel from "../components/ProductImageCarousel";

import {
  listProductDetails,
  createProductReview,
  deleteProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { deleteProduct } from "../actions/productActions";

// import LightGallery from "lightgallery/react";

// import styles
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-thumbnail.css";

// import lgThumbnail from "lightgallery/plugins/thumbnail";
// import lgZoom from "lightgallery/plugins/zoom";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  // const productId = match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const productReviewDelete = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReviewDelete,
    loading: loadingProductReviewDelete,
    error: errorProductReviewDelete,
  } = productReviewDelete;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }

    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview, product]);

  useEffect(() => {
    if (successProductReviewDelete) {
      setRating(0);
      setComment("");
    }
  }, [successProductReviewDelete]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
    LoadOnce();
  };

  const deleteReviewHandler = (reviewId) => (e) => {
    e.preventDefault();
    dispatch(
      deleteProductReview(match.params.id, {
        rating,
        comment,
        reviewId,
      })
    );
    LoadOnce();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      dispatch(deleteProduct(id));
      goBackToHomeAfterDelete();
    }
  };

  // This is a function that makes the deletehandler reload the page once on the homescreen
  function goBackToHomeAfterDelete() {
    history.push("/");
    LoadOnce();
    alert("Product Has Been Deleted.");
  }

  // Line Below Reloads Page
  function LoadOnce() {
    window.location.reload();
  }

  // state that holds dynamic data from backend (optionsState)
  // function optionsChangeHandler

  // // const options = ["all", "users", "managers", "administrators"];
  // // const selectOptions = options.map((option) => option);

  // // <select onChange={optionChangeHandler}>
  // //     {selectOptions.map((address, key) => (
  // //       <option key={key} value={address}>
  // //         {address}
  // //       </option>
  // //     ))}
  // //   </select>


  // const productOptions = productOptions.map((state) => state)
  /*

  for (productOptions) {
    {mainOptions => options.option (
      
    )}
    {}
  }

  */

  // What fragments do: A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.

  return (
    <React.Fragment>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              {product.additionalimageone ||
              product.additionalimagetwo ||
              product.additionalimagethree ? (
                <ProductImageCarousel match={match} variant="dark" />
              ) : (
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  style={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Col>
            {/* <Col md={6}>
              <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
                <a href={product.image}>
                  <img
                    alt={product.name}
                    src={product.image}
                    fluid
                    width="100%"
                  />
                </a>
              </LightGallery>
              <Image src={product.image} alt={product.name} fluid />
            </Col> */}
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={
                      product.numReviews > 1
                        ? `${product.numReviews} review(s)`
                        : `${product.numReviews} review`
                    }
                  />
                </ListGroup.Item>

                {product.price > 0 && (
                  <ListGroup.Item>
                    Price: <br></br>
                    <br></br> <h5>$ {product.price}</h5>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  Date Created: <br></br>
                  <br></br> <h5> {moment(product.createdAt).format("L")}</h5>
                </ListGroup.Item>

                <ListGroup.Item>
                  Brand: <br></br>
                  <br></br> <h5>{product.brand}</h5>
                </ListGroup.Item>

                <ListGroup.Item>
                  Category: <br></br>
                  <br></br> <h5>{product.category}</h5>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  {product.price > 0 && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>${product.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )}

                  {product.specialPrice > 0 && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            {product.lastPrice && (
                              <span className="lastPrice">
                                ${product.lastPrice}
                              </span>
                            )}
                            <span className="specialPrice">
                              ${product.specialPrice}
                            </span>
                          </Col>
                        </Row>
                        {product.specialPriceDiscountText && (
                          <>
                            <Row>
                              <br></br>
                              <Col style={{ marginTop: "6px" }}>
                                <h6>
                                  {product.specialPriceDiscountText}% Discount
                                </h6>
                              </Col>
                            </Row>
                          </>
                        )}
                      </ListGroup.Item>
                    </>
                  )}

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge
                            className="badge"
                            bg="success"
                            variant="success"
                          >
                            In Stock
                          </Badge>
                        ) : (
                          <Badge className="badge" bg="danger" variant="danger">
                            Out Of Stock
                          </Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>

                  {userInfo && userInfo.isAdmin && (
                    <ListGroup.Item>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <Button className="btn-block">
                          Edit Product: {product.name}
                        </Button>
                      </Link>
                    </ListGroup.Item>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <ListGroup.Item>
                      <Button
                        variant="danger"
                        className="btn btn-block"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i> Delete Product:{" "}
                        {product.name}
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <ListGroup
            style={{
              marginTop: "10px",
              marginBottom: "10px",

              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <ListGroup.Item style={{ minWidth: "100%" }}>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <h3>Description</h3>
              </Row>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <Col md={6}>
                  <ProductDescription Product={product} />
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          <Row>
            <Col>
              <h1>More on product: {product.name}</h1>

              {product.productImportantInformation && (
                <>
                  <h6>Product Important Information:</h6>
                  <ProductInformation Product={product} />
                </>
              )}
              {product.productVideo && (
                <>
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className="btn btn-block"
                  >
                    Open Product Video
                  </Button>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    keyboard={false}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Product Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <iframe
                        width="100%"
                        height="250px"
                        src={product.productVideo}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}

              {product.productTutorial && (
                <>
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    className="btn btn-block"
                  >
                    Open Product Tutorial
                  </Button>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    keyboard={false}
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Product Tutorial</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <iframe
                        width="100%"
                        height="250px"
                        src={product.productTutorial}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="primary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col md={6}>
              <h2>({product.reviews.length}) Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <>
                    <div style={{ marginBottom: "1em" }}>
                      <div className="bs-example">
                        <div className="card" style={{ maxWidth: "500px" }}>
                          <div className="row no-gutters">
                            {review.profileImage && (
                              <div
                                className="col-sm-5"
                                style={{ backgroundColor: "#868e96" }}
                              >
                                <img
                                  src={review.profileImage}
                                  className="card-img-top"
                                  alt="..."
                                />
                              </div>
                            )}
                            <div className="col-sm-7">
                              <div className="card-body">
                                <h5 className="card-title">{review.name}</h5>
                                <Rating value={review.rating} />
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p className="card-text">{review.comment}</p>
                                {userInfo.isAdmin && (
                                  <Button
                                    className="btn btn-danger btn-block"
                                    onClick={deleteReviewHandler(review._id)}
                                  >
                                    <i className="fas fa-trash"></i> Delete
                                    Comment
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}

                  {loadingProductReview && <Loader />}
                  {loadingProductReviewDelete && <Loader />}
                  {errorProductReview && (
                    <>
                      <Message variant="danger">{errorProductReview}</Message>
                      <Message variant="danger">
                        {errorProductReviewDelete}
                      </Message>
                    </>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          {/* eslint-disable-next-line */}
                          <option value="1">⭐️ - Poor</option>
                          {/* eslint-disable-next-line */}
                          <option value="2">⭐️⭐️ - Fair</option>
                          {/* eslint-disable-next-line */}
                          <option value="3">⭐️⭐️⭐️ - Good</option>
                          {/* eslint-disable-next-line */}
                          <option value="4">⭐️⭐️⭐️⭐️ - Very Good</option>
                          {/* eslint-disable-next-line */}
                          <option value="5">⭐️⭐️⭐️⭐️⭐️ - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        className="btn-block"
                        variant="primary"
                      >
                        Submit Your Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
