import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
// import { ApplePayButton } from "react-apple-pay-button";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import OrderNotesJoditOrder from '../components/OrderNotesJoditOrder'

import { Widget } from "@uploadcare/react-widget";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  orderPacked,
  orderDispatched,
  orderCancelled,
  // orderStatus,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_STATUS_RESET,
  ORDER_PACKED_RESET,
  ORDER_DISPATCHED_RESET,
  ORDER_CANCEL_RESET,
} from "../constants/orderConstants";

// Download / Print

import moment from "moment";
import Print from "../components/Print";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderPack = useSelector((state) => state.orderPack);
  const { success: successPack, loading: loadingPack } = orderPack;

  const orderDispatch = useSelector((state) => state.orderDispatch);
  const { success: successDispatch, loading: loadingDispatch } = orderDispatch;

  const orderCancel = useSelector((state) => state.orderCancel);
  const { success: successOrderCancel, loading: loadingOrderCancel } =
    orderCancel;

  // const orderStatus = useSelector((state) => state.orderStatus);
  // const { loading: loadingStatus, success: successStatus } = orderStatus;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + (item.price + item.specialPrice) * item.qty,
        // +
        // item.qty1 +
        // item.qty2 +
        // item.qty3 +
        // item.qty4 +
        // item.qty5,
        0
      )
    );
  }

  useEffect(() => {
    //REDIRECTS TO LOGIN PAGE WHEN TRYING TO ACCESS ORDER PAGE WITHOUT LOGGED IN
    if (!userInfo) {
      history.push("/login");
    }

    //REDIRECTS TO HOME PAGE WHEN TRYING TO ACCESS OTHER'S ORDER PAGE IF NOT ADMIN
    if (order && userInfo) {
      if (!userInfo.isAdmin && order.user._id !== userInfo._id) {
        history.push("/");
      }
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      successPay ||
      successDeliver ||
      successPack ||
      successDispatch ||
      successOrderCancel ||
      // successStatus ||
      order._id !== orderId
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_STATUS_RESET });
      dispatch({ type: ORDER_PACKED_RESET });
      dispatch({ type: ORDER_CANCEL_RESET });
      dispatch({ type: ORDER_DISPATCHED_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, successDispatch, successOrderCancel, history, userInfo, successPack]);

  const printAs = (e) => {
    const downloadAs = e.target.value;

    switch (downloadAs) {
      case "pdf":
        var docDefinition = {
          content: [
            //Header
            {
              table: {
                widths: ["auto", "*"],

                body: [
                  [
                    {
                      text: "Creative Duo",
                      style: "mainheader",
                      bold: true,
                      marginTop: 10,
                    },

                    {
                      width: "*",
                      style: "usersOrders",
                      marginBottom: 30,
                      stack: [
                        {
                          style: "h2",
                          text: `Name: ${userInfo.name}`,
                        },
                        {
                          style: "h2",
                          text: `Email: ${userInfo.email}`,
                        },
                        {
                          style: "h2",
                          text: `Phone #: ${userInfo.phone}`,
                        },
                      ],
                    },
                  ],
                ],
              },

              layout: {
                hLineWidth: function (line) {
                  return line === 1;
                },
                vLineWidth: function () {
                  return 0;
                },
                paddingBottom: function () {
                  return 5;
                },
              },
            },

            //Vitals Details
            {
              style: "header",
              table: {
                widths: "*",
                body: [
                  [
                    {
                      border: ["#5bc0de", false, false, false],
                      text: "Your Cart",
                    },
                  ],
                ],
              },
            },

            order.orderItems.length > 0
              ? {
                  layout: {
                    hLineWidth: function () {
                      return 0;
                    },
                    vLineWidth: function () {
                      return 0;
                    },
                    paddingBottom: function () {
                      return 5;
                    },
                  },
                  table: {
                    headerRows: 1,
                    body: [
                      [
                        {
                          text: "S.No",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "ProductID",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "Product Name",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "Price",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "Quantity",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                      ],

                      ...order.orderItems.map((o, i) => [
                        i + 1,
                        o.product,
                        o.name,
                        o.price,
                        o.qty,
                      ]),
                    ],
                  },

                  fontSize: 9,
                  alignment: "center",
                }
              : null,

            { text: "Order Summary", style: "subheader" },
            {
              style: "tableExample",
              table: {
                heights: [20, 50, 70],
                body: [
                  ["Order Id", order._id],
                  ["Name", order.user.name],
                  [
                    "Delivery Address",
                    {
                      type: "none",
                      ol: [
                        order.shippingAddress.address,
                        order.shippingAddress.city,
                        order.shippingAddress.city,
                        order.shippingAddress.state,
                        order.shippingAddress.postalCode,
                        order.shippingAddress.country,
                      ],
                    },
                  ],
                  ["Order Placed At", order.createdAt],
                  ["Payment Method", order.paymentMethod],
                  ["Order Notes", order.orderNotes],
                  ["File Upload", order.fileUpload],
                  ["Fee", order.feePrice],
                  ["Total", order.totalPrice],
                  [
                    "Paid",
                    order.isPaid
                      ? moment(order.paidAt).format("LLL")
                      : "Order is Not Paid Yet",
                  ],
                  [
                    "Delivered",
                    order.isDelivered
                      ? moment(order.deliveredAt).format("LLL")
                      : "Order is Not Delivered Yet",
                  ],
                  [
                    "Packed",
                    order.isPacked
                      ? moment(order.packedAt).format("LLL")
                      : "Order is Not Packed Yet",
                  ],
                  [
                    "Canceled",
                    order.isCancelled
                      ? moment(order.cancelledAt).format("LLL")
                      : "Order is Not Cancelled",
                  ],
                  [
                    "Dispatched",
                    order.isDispatched
                      ? "Order is Dispatched"
                      : "Order is Not Packed Yet",
                  ],
                ],
              },
            },
          ],
          styles: {
            header: {
              fontSize: 12,
              marginBottom: 20,
              marginTop: 20,
              bold: true,
            },
            mainheader: {
              fontSize: 15,
            },

            usersOrders: {
              marginLeft: 315,
            },

            h2: {
              marginTop: 5,
              fontSize: 7,
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5],
            },
            tableExample: {
              margin: [0, 5, 0, 15],
            },
          },
        };
        pdfMake.createPdf(docDefinition).download("Your_Order.pdf");

        break;
      case "excel":
        break;

      default:
        break;
    }
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const paidMark = () => {
    dispatch(payOrder(orderId));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  //MARK AS PACKED HANDLER
  const orderPackedHandler = () => {
    if (window.confirm("Press ok to mark this packed")) {
      dispatch(orderPacked(order));
      LoadOnce();
    }
  };

  //MARK AS DISPATCHED
  const orderDispatchedHandler = () => {
    if (window.confirm("Press ok to mark this dispatched")) {
      dispatch(orderDispatched(order));
      LoadOnce();
    }
  };

  //CANCEL ORDER
  const cancelHandler = () => {
    if (window.confirm("Are You Sure ?")) {
      dispatch(orderCancelled(order));
      LoadOnce();
    }
  };

  function LoadOnce() {
    window.location.reload();
  }

  // const statusHandler = () => {
  //   dispatch(orderStatus(order));
  // };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div className="orderid">
        <span className="float-left">
          <h1 className="orderidleft">Order ID: {order._id} </h1>
        </span>

        <span className="float-right">
          <Print className="printt" printAs={printAs} />
        </span>
      </div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {userInfo && userInfo.ispromember && (
              <ListGroup.Item>
                <h1>Thanks For Being A Pro Member</h1>
              </ListGroup.Item>
            )}

            {userInfo && userInfo.isMilitary && (
              <ListGroup.Item>
                <h1>Thanks You For Your Service!</h1>
              </ListGroup.Item>
            )}

            <h3>Thank You {order.user.name} for ordering with us!</h3>
            <h5>Your Purchase Really Means A Lot To Us! Thanks for supporting our small business.</h5>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} ,{" "}
                {order.shippingAddress.state}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>

              {order.isCancelled && (
                <Message variant="danger">
                  Order is Cancelled
                </Message>
              )}

              {order.isPacked ? (
                <Message variant="success">Packed On {order.packedAt}</Message>
              ) : (
                !order.isCancelled && (
                  <Message variant="danger">Order is Not Packed Yet</Message>
                )
              )}

              {order.isDispatched ? (
                <Message variant="success">Order Has Been Dispatched</Message>
              ) : (
                !order.isCancelled && (
                  <Message variant="danger">
                    Order is Not Dispatched Yet
                  </Message>
                )
              )}

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered/Shipped on {order.deliveredAt}
                </Message>
              ) : (
                !order.isCancelled && (
                  <Message variant="danger">Order is Not Delivered Yet</Message>
                )
                // <Message variant="danger">Not Delivered/Shipped </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Notes:</h2>
              <p>
                <strong>Note/Request: </strong>
                {/* {order.orderNotes} */}
                <OrderNotesJoditOrder  order={order}/>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>File URL</h2>
              <p>
                <strong>URL: </strong>
                {order.fileUpload}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {/*  Small: {item.qty1} Medium: {item.qty2}{" "}
                          Large: {item.qty3} X-Large {item.qty4} XX-Large
                          {item.qty5}
                           */}
                          {item.qty} x {item.price > 0 && <>${item.price}</>}{" "}
                          {""}
                          {item.specialPrice > 0 && <>{item.specialPrice}</>}
                          {""} = ${item.qty * (item.price + item.specialPrice)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    Current Order Status: {order.orderStatus}
                  </ListGroup.Item>
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                  {order.specialPrice > 0 && (
                    <>
                      <Col>${order.specialPrice}</Col>
                    </>
                  )}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total W/ Fee</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && !order.isCancelled && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <>
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                      {/* Planning to add stripe here */}
                    </>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {/* {loadingStatus && <Loader />} */}

              {!userInfo && (
                <ListGroup.Item>
                  <Widget
                    publicKey="ea2d5f102203c327acc8"
                    onChange={(info) => {
                      console.log(info.cdnUrl);
                      alert(
                        "Your File URL is: " +
                          info.cdnUrl +
                          " Screenshot it and send it to the message chat or to sales@creativeduo.net with your Order ID."
                      );
                    }}
                    previewStep="true"
                    // role="uploadcare-uploader"
                    data-multiple="true"
                    data-multiple-min="1"
                    id="file"
                    disabled="true"
                  />
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                {userInfo && userInfo.isAdmin &&  !order.isCancelled && !order.isDelivered  && (
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered/Shipped
                  </Button>
                )}

                {userInfo && userInfo.isAdmin && !order.isCancelled && !order.isPaid && (
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={paidMark}
                  >
                    Mark Order As Paid
                  </Button>
                )}
              </ListGroup.Item>

              {loadingPack && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isCancelled &&
                !order.isPacked && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={orderPackedHandler}
                    >
                      Mark As Packed
                    </Button>
                  </ListGroup.Item>
                )}

              {loadingDispatch && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isCancelled &&
                !order.isDispatched && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={orderDispatchedHandler}
                    >
                      Mark As Dispatched
                    </Button>
                  </ListGroup.Item>
                )}

              {/* 
              {userInfo && userInfo.isAdmin && (
                <Button type="button" onClick={statusHandler}>
                  Submit Order Status
                </Button>
              )} */}

              {loadingOrderCancel && <Loader />}
              {userInfo &&
                (order.user._id === userInfo._id || userInfo.isAdmin) &&
                !order.isCancelled &&
                !order.isDelivered &&
                !order.isDispatched && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={cancelHandler}
                      // disabled
                    >
                      Cancel Order
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
