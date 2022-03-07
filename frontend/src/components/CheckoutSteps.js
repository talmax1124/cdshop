import React from "react";
// import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4, step5, step6 }) => {
  return (
    <>
      {/* <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-check-circle"></i> Sign In
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <i className="far fa-times-circle"></i> Sign In
            </Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step2 ? (
            <LinkContainer to="/shipping">
              <Nav.Link>
                <i className="fas fa-check-circle"></i> Shipping
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <i className="far fa-times-circle"></i> Shipping
            </Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step3 ? (
            <LinkContainer to="/ordernotes">
              <Nav.Link>
                <i className="fas fa-check-circle"></i> Order Notes
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <i className="far fa-times-circle"></i> Order Notes
            </Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step4 ? (
            <LinkContainer to="/fileupload">
              <Nav.Link>
                <i className="fas fa-check-circle"></i> File Uploads
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <i className="far fa-times-circle"></i> File Uploads
            </Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step5 ? (
            <LinkContainer to="/paymentmethod">
              <Nav.Link>
                <i className="fas fa-check-circle"></i> Payment Method
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <i className="far fa-times-circle"></i> Payment Method
            </Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step6 ? (
            <LinkContainer to="/placeorder">
              <Nav.Link>
                <i className="fas fa-check-circle"></i> Place Order
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>
              <i className="far fa-times-circle"></i> Place Order
            </Nav.Link>
          )}
        </Nav.Item>
      </Nav> */}

      <div>
        <ol class="grid grid-cols-1 overflow-hidden text-sm text-gray-500 border border-gray-100 divide-x divide-gray-100 rounded-lg sm:grid-cols-3">
          {step1 ? (
            <a href="/login">
              <li class="flex items-center justify-center p-4">
                <svg
                  class="flex-shrink-0 mr-2 w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>

                <p class="leading-none">
                  <strong class="block font-medium"> Sign In </strong>
                  <small class="mt-1"> Your User Account </small>
                </p>
              </li>
            </a>
          ) : (
            <li class="flex items-center justify-center p-4 bg-gray-50">
              <svg
                class="flex-shrink-0 mr-2 w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>

              <p class="leading-none">
                <strong class="block font-medium"> Sign In </strong>
                <small class="mt-1"> Your User Account </small>
              </p>
            </li>
          )}

          {step2 ? (
            <a href="/shipping">
              <li class="flex items-center justify-center p-4 ">
                <svg
                  class="flex-shrink-0 mr-2 w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>

                <p class="leading-none">
                  <strong class="block font-medium"> Sign In </strong>
                  <small class="mt-1"> Your User Account </small>
                </p>
              </li>
            </a>
          ) : (
            <li class="flex items-center justify-center p-4 bg-slate-50">
              <svg
                class="flex-shrink-0 mr-2 w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>

              <p class="leading-none">
                <strong class="block font-medium"> Sign In </strong>
                <small class="mt-1"> Your User Account </small>
              </p>
            </li>
          )}

          {step3 ? (
            <a href="/ordernotes">
              <li class="flex items-center justify-center p-4">
                <svg
                  class="flex-shrink-0 mr-2 w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>

                <p class="leading-none">
                  <strong class="block font-medium"> Sign In </strong>
                  <small class="mt-1"> Your User Account </small>
                </p>
              </li>
            </a>
          ) : (
            <li class="flex items-center justify-center p-4 bg-gray-50">
              <svg
                class="flex-shrink-0 mr-2 w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>

              <p class="leading-none">
                <strong class="block font-medium"> Sign In </strong>
                <small class="mt-1"> Your User Account </small>
              </p>
            </li>
          )}

          {step4 ? (
            <a href="/fileupload">
              <li class="relative flex items-center justify-center p-4">
                <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 bg-white border border-b-0 border-l-0 border-gray-100 sm:block -left-2 top-1/2"></span>

                <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 border border-b-0 border-l-0 border-gray-100 sm:block bg-gray-50 -right-2 top-1/2"></span>

                <svg
                  class="flex-shrink-0 mr-2 w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <p class="leading-none">
                  <strong class="block font-medium"> Address </strong>
                  <small class="mt-1"> Where we sending it? </small>
                </p>
              </li>
            </a>
          ) : (
            <li class="relative flex items-center justify-center p-4 bg-gray-50">
              <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 bg-white border border-b-0 border-l-0 border-gray-100 sm:block -left-2 top-1/2"></span>

              <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 border border-b-0 border-l-0 border-gray-100 sm:block bg-gray-50 -right-2 top-1/2"></span>

              <svg
                class="flex-shrink-0 mr-2 w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <p class="leading-none">
                <strong class="block font-medium"> Address </strong>
                <small class="mt-1"> Where we sending it? </small>
              </p>
            </li>
          )}

          {step5 ? (
            <a href="/paymentmethod">
              <li class="relative flex items-center justify-center p-4">
                <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 bg-white border border-b-0 border-l-0 border-gray-100 sm:block -left-2 top-1/2"></span>

                <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 border border-b-0 border-l-0 border-gray-100 sm:block bg-gray-50 -right-2 top-1/2"></span>

                <svg
                  class="flex-shrink-0 mr-2 w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <p class="leading-none">
                  <strong class="block font-medium"> Address </strong>
                  <small class="mt-1"> Where we sending it? </small>
                </p>
              </li>
            </a>
          ) : (
            <li class="relative flex items-center justify-center p-4 bg-gray-50">
              <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 bg-white border border-b-0 border-l-0 border-gray-100 sm:block -left-2 top-1/2"></span>

              <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 border border-b-0 border-l-0 border-gray-100 sm:block bg-gray-50 -right-2 top-1/2"></span>

              <svg
                class="flex-shrink-0 mr-2 w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <p class="leading-none">
                <strong class="block font-medium"> Address </strong>
                <small class="mt-1"> Where we sending it? </small>
              </p>
            </li>
          )}

          {step6 ? (
            <a href="/placeorder">
              <li class="relative flex items-center justify-center p-4">
                <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 bg-white border border-b-0 border-l-0 border-gray-100 sm:block -left-2 top-1/2"></span>

                <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 border border-b-0 border-l-0 border-gray-100 sm:block bg-gray-50 -right-2 top-1/2"></span>

                <svg
                  class="flex-shrink-0 mr-2 w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <p class="leading-none">
                  <strong class="block font-medium"> Address </strong>
                  <small class="mt-1"> Where we sending it? </small>
                </p>
              </li>
            </a>
          ) : (
            <li class="relative flex items-center justify-center p-4 bg-gray-50">
              <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 bg-white border border-b-0 border-l-0 border-gray-100 sm:block -left-2 top-1/2"></span>

              <span class="absolute hidden w-4 h-4 rotate-45 -translate-y-1/2 border border-b-0 border-l-0 border-gray-100 sm:block bg-gray-50 -right-2 top-1/2"></span>

              <svg
                class="flex-shrink-0 mr-2 w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <p class="leading-none">
                <strong class="block font-medium"> Address </strong>
                <small class="mt-1"> Where we sending it? </small>
              </p>
            </li>
          )}
        </ol>
      </div>
    </>
  );
};

export default CheckoutSteps;
