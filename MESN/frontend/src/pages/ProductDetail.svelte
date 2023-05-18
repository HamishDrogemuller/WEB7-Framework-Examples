<script>
  import { Button } from "sveltestrap";
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import axios from "axios";

  let products = {};

  let params = useParams();

  const handleClaim = () => {
    const product = products;
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      if (cart.find((item) => item._id === product._id)) {
        alert("Already in cart");
        return;
      }
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify([product]));
    }
    alert("Product added to cart");
    window.location.reload();
  };

  const fetchData = async () => {
    try {
      const config = {
        headers: { "Access-Control-Allow-Origin": "*" },
      };
      console.log("hi");
      const res = await axios.get(
        `http://localhost:5001/product/viewProduct/${$params.id}`,
        config
      );
      products = res.data.data;
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };

  onMount(async () => {
    fetchData();
  });
</script>

<div class="product-container">
  <div class="product-detail">
    <div class="product-detail-image">
      <img class="product-image" src={products.imageUrl} alt="product" />
    </div>
    <div class="product-detail-info">
      <h1>{products.name}</h1>
      <p>{products.description}</p>
      <p>
        <strong>Price:</strong>
        {products.voucherPrice}
      </p>
      <Button variant="primary" href="/Product">Back</Button>
      <Button variant="primary" on:click={handleClaim}>Claim</Button>
    </div>
  </div>
</div>

<style>
.product-image {
  width: 100%;
  max-width: 400px;
  height: auto;
}
</style>
