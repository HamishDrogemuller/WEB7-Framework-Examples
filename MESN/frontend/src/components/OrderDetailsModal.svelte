<script>
  import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "sveltestrap";
  import axios from "axios";
  import OrderDetailsBodyModal from './OrderDetailsBodyModal.svelte';

  let show = false;
  const handleShow = () => {
    show = !show;
  };
  export let token;

  let OrderInfo = [];
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const orderInfo = JSON.parse(localStorage.getItem('orderInfo'));

  // get list of orders from database relating to current user
  const ViewOrder = (token) => {
    axios
      .post("http://localhost:5001/order/view/", {
        emailAddress: userInfo.data.emailAddress,
        tokenId: token,
      })
      //store response data to localStorage as set response data to state OrderInfo
      .then((res) => {
        localStorage.setItem("orderInfo", JSON.stringify(res.data));
        OrderInfo = res.data;
        console.log(OrderInfo);
        // pass in orderInfo to OrderDetailsBodyModal upon return
        handleShow();
      })
      .catch((err) => {
        console.log(err);
      });
  };

    //update order status
    const updateOrderStatus = () => {
    if (orderInfo.data.statusCompleted === false) {
      orderInfo.data.statusCompleted = true;
      localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
      OrderInfo = orderInfo;
      console.log(OrderInfo);
      //TODO:push info to database for update
    } else {
      orderInfo.data.statusCompleted = false;
      localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
      OrderInfo = orderInfo;
    }
  }
</script>

<div>
  <Button variant="primary" on:click={ViewOrder(token)}>Order Details</Button>
  <Modal isOpen={show} onHide={handleShow} backdrop="static">
    <ModalHeader {handleShow}>Order Details</ModalHeader>
    <ModalBody>
      <OrderDetailsBodyModal orderInfo={OrderInfo} />
    </ModalBody>
    <ModalFooter>
      <Button variant="secondary" on:click={handleShow}>Close</Button>
      <Button variant="primary" on:click={updateOrderStatus}>
        Update order status
      </Button>
    </ModalFooter>
  </Modal>
</div>
