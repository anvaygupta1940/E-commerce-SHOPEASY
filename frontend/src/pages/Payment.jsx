// import React, { useEffect, useState } from 'react'
// import styled from "styled-components";
// import Navbar from '../components/Navbar';
// import CurrencyFormat from "react-currency-format";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import axios from "../axios.js";
// import { emptyCart } from '../redux/cartRedux';
// import Footer from '../components/Footer';


// const Container = styled.div`
// width: 100%;
// /* max-width: 1400px; */
// /* margin: auto; */
// height: fit-content;
// background-color: rgb(234,237,237);
// `
// const Main = styled.div`
// width: 100%;
// padding: 15px;
// display: flex;

// @media only screen and (max-width:1200px){
//     flex-direction: column;
// }
// `
// const ShipmentContainer = styled.div`
// background-color: #fff;
// padding: 15px;
// flex: 0.7;

// h2{
//     font-size: 25px;
//     padding-bottom: 15px;
//     border-bottom: 2px solid lightgray;
// }

// @media only screen and (max-width:1200px){
//     flex:none;
// }
// `
// const ShippingAddressContainer = styled.div`

// h5{
//     margin:10px 0px;
//     font-size: 15px;
// }
// div{
//     margin-left: 15px;

//     p{
//         font-size: 14px;
//         margin: 3px 0px;
//     }
// }
// `
// const PaymentContainer = styled.div`

// h5{
//     margin:10px 0px;
//     font-size: 15px;
// }
// div{
//     margin-left: 15px;

//     p{
//         font-size: 14px;
//         margin: 10px 0px;
//     }
// }
// `
// const OrderContainer = styled.div`
// h5{
//     margin:10px 0px;
//     font-size: 15px;
// }
// div{
//     margin-left: 15px;
// }
// `
// const Product = styled.div`
// width: 100%;
// display: flex;
// align-items: center;
// /* margin: 10px 0px; */
// `
// const Image = styled.div`
// flex: 0.3;

// img{
//     width: 100%;
//     height: 220px;
// }
// `
// const Description = styled.div`
// margin-left: 10px;
// flex: 0.7;

// h3{
//     margin-bottom: 10px;
// }
// p{
//     font-weight: bold;
//     margin-bottom: 10px;
// }
// button{
//     border: none;
//     outline: none;
//     background-color: transparent;
//     color: teal;
//     font-size: 15px;
//     cursor: pointer;
// }
// `
// const SubTotalContainer = styled.div`
// flex: 0.3;
// background-color:#fff;
// height: 200px;
// margin-left: 20px;
// display: flex;
// align-items: center;
// justify-content: center;
// flex-direction: column;
// gap: 10px;

// p{
//     font-size: 18px;
// }
// small{
//     display: flex;
//     align-items: center;
//     gap: 5px;
// }
// button{
//     width: 50%;
//     height:35px;
//     border: none;
//     outline: none;
//     background-color: #febd69;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
// }

// @media only screen and (max-width:1200px){
//     flex:none;
//     margin-left: 0px;
//     margin-top: 10px;
// }
// `

// const Payment = () => {
//     const CartProducts = useSelector(state => state.cart);
//     const deliveryDetails = useSelector(state => state.address);
//     const [clientSecret, setClientSecret] = useState("");
//     const navigate = useNavigate();
//     const elements = useElements();
//     const stripe = useStripe();
//     const dispatch = useDispatch();
//     const userEmail = useSelector((state) => state.user.currentUser.email);


//     /* before we navigate to payment page we have to get client secret */
//     useEffect(() => {
//         // we have made a request to create a payment
//         // and while creating this payment we have to make a client secret using stripe(in backend)
//         const fetchClientSecret = async () => {
//             /* this api is used to fetch client secret */
//             /* client secret is a key which confirms a payment , means if that key is incorrect payment will be terminated */
//             const data = await axios.post("payment/create", {
//                 amount: CartProducts.total,
//             });

//             // console.log("Client secret key ", data);
//             setClientSecret(data.data);
//             // console.log("Client Secret is >>>", clientSecret);
//         };
//         fetchClientSecret();
//     }, []);

//     const confirmPayment = async (e) => {
//         e.preventDefault();

//         await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//             },
//         }).then((result) => {
//             alert("Payment Successfull");
//             axios.post("orders/add", {
//                 price: CartProducts.total,
//                 products: CartProducts.products,
//                 address: deliveryDetails,
//                 email: userEmail,
//             })
//             dispatch(emptyCart());
//             navigate("/");
//         }).catch((err) => {
//             console.warn(err);
//         })
//     }

//     return (
//         <Container>
//             <Navbar></Navbar>
//             <Main>
//                 <ShipmentContainer>
//                     <h2>Review Your Order</h2>
//                     <ShippingAddressContainer>
//                         <h5>Shipping Address</h5>
//                         <div>
//                             <p>{deliveryDetails.fullName}</p>
//                             <p>{deliveryDetails.flat}</p>
//                             <p>{deliveryDetails.area}</p>
//                             <p>{deliveryDetails.landmark}</p>
//                             <p>{deliveryDetails.town} , {deliveryDetails.state}</p>
//                             <p><b>Phone: </b>{deliveryDetails.number}</p>
//                         </div>
//                     </ShippingAddressContainer>
//                     <PaymentContainer>
//                         <h5>Payment Method</h5>
//                         <div>
//                             <p>Card Details</p>

//                             {/* credit card element */}
//                             <CardElement></CardElement>
//                         </div>
//                     </PaymentContainer>
//                     <OrderContainer>
//                         <h5>Your Order</h5>
//                         <div>
//                             {CartProducts.products.map((item) => {
//                                 return (
//                                     <Product>
//                                         <Image>
//                                             <img src={item.imageURL} alt='product_image'></img>
//                                         </Image>
//                                         <Description>
//                                             <h3>{item.title}</h3>
//                                             <p>₹ {item.price}</p>
//                                             <button>Remove</button>
//                                         </Description>
//                                     </Product>
//                                 )
//                             })}
//                         </div>
//                     </OrderContainer>
//                 </ShipmentContainer>
//                 <SubTotalContainer>
//                     <CurrencyFormat renderText={(value) => (
//                         <>
//                             <p>
//                                 Subtotal({CartProducts.quantity} items ):<strong>{value}</strong>
//                             </p>
//                             <small>
//                                 <input type='checkbox'></input>
//                                 <span>This order contains a gift.</span>
//                             </small>
//                         </>
//                     )}
//                         decimalScale={2}
//                         value={CartProducts.total}
//                         displayType='text'
//                         thousandSeparator={true}
//                         prefix={"₹ "}>
//                     </CurrencyFormat>
//                     <button onClick={confirmPayment}>Place Order</button>
//                 </SubTotalContainer>
//             </Main>
//             <Footer></Footer>
//         </Container>
//     )
// }

// export default Payment
