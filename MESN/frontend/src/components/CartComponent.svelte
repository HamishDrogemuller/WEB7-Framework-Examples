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
  import axios from 'axios';

  let show = false;
  const handleShow = () => {
    show = !show;
  };
  let cart = [];

  const ProductInfo = JSON.parse(localStorage.getItem('cart'));
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const createOrder = () => {
    if (ProductInfo === null || ProductInfo === undefined) {
      setError('Please add products to cart');
      setTimeout(() => {
      window.location.reload();
      }, 2000);
    } else {

      // get voucherPrice and reduce array into one number for subtotal
      const findVoucherPrice = ProductInfo.map(item => {
        return item.voucherPrice;
      })
      const findTotalPrice = findVoucherPrice.reduce((a, b) => a + b, 0);

      //get product
      const findProduct = ProductInfo.map(item => {
        return item;
      })
      console.log(userInfo.data.emailAddress)
      console.log(findProduct)
      console.log(findTotalPrice)
      // post to database
      axios
        .post( 'http://localhost:5001/order/newOrder', {
          emailAddress: userInfo.data.emailAddress,
          product: findProduct,
          subtotal: findTotalPrice,
        })
        .then(res => {
          setTimeout(() => {
            show = false;
            localStorage.removeItem('cart');
          }, 2000);
        })
        .catch(err => {
          console.log(err);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        // get user email address from database to update user and send to localStorage
      axios
        .post('http://localhost:5001/user/', { emailAddress: userInfo.data.emailAddress })
        .then(res => {
          localStorage.setItem('userInfo', JSON.stringify(res.data));
        }
        )
        .catch(err => {
          console.log(err);
        }
          )
    }
  }

</script>

<NavLink id="nav-cart" on:click={handleShow}>Cart</NavLink>
<Modal isOpen={show} backdrop="static" {handleShow}>
  <ModalHeader {handleShow}>Cart</ModalHeader>
  <ModalBody>
    {#if ProductInfo}
      <div>
        {#each ProductInfo as product (product._id)}
          <div key={product._id}>
            <div class="cart-product">
              <div class="cart-product-id">ID: {product._id}</div>
            </div>
            <div class="cart-product-info">
              <div class="cart-product-name">Name:{product.name}</div>
              <div class="cart-product-price">
                Price: {product.voucherPrice}
              </div>
            </div>
          </div>
        {/each}
      </div>
      {#each ProductInfo as product (product._id)}
        <div key={product._id}>
          <Button
            variant="danger"
            on:click={() => {
              const cart = JSON.parse(localStorage.getItem("cart"));
              const newCart = cart.filter(item => item._id !== product._id);
              localStorage.setItem("cart", JSON.stringify(newCart));
              window.location.reload();
            }}
            >Delete
          </Button>
        </div>
      {/each}
      <div class="cart-item-count">
        <div class="cart-item-count-label">Item Count:</div>
        <div class="cart-item-count-value">
          {ProductInfo.length}
        </div>
      </div>
      <div class="cart-total-price">
        <div class="cart-total-price-label">Total Vouchers Cost:</div>
        <div class="cart-total-price-value">
          {ProductInfo.reduce((total, product) => {
            return total + product.voucherPrice;
          }, 0)}
        </div>
      </div>
    {:else}
      <div>
        <h1>No products in cart</h1>
      </div>
    {/if}
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" on:click={handleShow}>Close</Button>
    <Button
      variant="primary"
      on:click={() => {
        localStorage.removeItem("cart");
        window.location.reload();
      }}
    >
      Clear Cart
    </Button>
    <Button variant="primary" on:click={createOrder}>Checkout</Button>
  </ModalFooter>
</Modal>
