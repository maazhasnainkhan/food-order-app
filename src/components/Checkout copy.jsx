import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { cartTotal } from "../util/functions";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Input from "../components/UI/Input";
import useHttp from "../hooks/useHttp";
import ErrorMessage from "./ErrorMessage";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotalPrice = cartTotal(cartCtx);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let action = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Place Order</Button>
    </>
  );

  if (isSending) {
    action = (
      <span className="loading-text-checkout">
        Please Wait While We Place Your Order...
      </span>
    );
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <div>
          <h2>Confirmed!</h2>
          <p>Your Order Has Been Placed Successfully!</p>
          <p>We will get back to you shortly with more details via email.</p>
          <p className="modal-actions">
            <Button onClick={handleFinish}>Okay</Button>
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotalPrice)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email Address" id="email" type="email" />
        <Input label="Street Address" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        <div className="error">
          {error && (
            <ErrorMessage title="Failed To Place Order" message={error} />
          )}
        </div>
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
