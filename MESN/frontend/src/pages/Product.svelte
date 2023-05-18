<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import ProductComponent from "../components/ProductComponent.svelte";

  let products = [];

  const fetchData = async () => {
    try {
      const config = {
        headers: { "Access-Control-Allow-Origin": "*" },
      };
      const res = await axios.get(
        "http://localhost:5001/product/products",
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

<div class="product-container" id="prod-contain">
  <div class="product-list">
    {#each products as product (product._id)}
      <ProductComponent {product} />
    {/each}
  </div>
</div>

<style>
  .product-container {
    display: flex;
    cursor: pointer;
    padding: 1rem;
  }

  .product-list {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: max-content;
    height: auto;
  }

  @media screen and (max-width: 991px) {
    .product-list {
      flex-direction: column;
    }
  }
</style>
