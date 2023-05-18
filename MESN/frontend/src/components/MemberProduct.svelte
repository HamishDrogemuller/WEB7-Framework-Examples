<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { Button } from "sveltestrap";

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let memberId = userInfo.data._id;
  const memberProducts = JSON.parse(localStorage.getItem("memberProducts"));
  let products = [];

  const getProducts = () => {
    axios
      .post("http://localhost:5001/product/products/memberId", { memberId })
      .then((res) => {
        products = res.data.data;
        localStorage.setItem("memberProducts", JSON.stringify(res.data.data));
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onMount(() => {
    getProducts();
  });

  //update claimed status of product
  //TODO:push info to database for update to be pulled again (conceptual at the moment)
  const updateClaimedStatus = () => {
    memberProducts.map((product) => {
      if (product.claimedStatus === false) {
        product.claimedStatus = true;
        localStorage.setItem("memberProducts", JSON.stringify(memberProducts));
      } else {
        product.claimedStatus = false;
        localStorage.setItem("memberProducts", JSON.stringify(memberProducts));
      }
    });
  };
</script>

<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1 class="text-center">Products listed</h1>
      <hr />
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ProductID</th>
            <th scope="col">Name</th>
            <th scope="col">Voucher Price</th>
            <th scope="col">Product Claimed?</th>
          </tr>
        </thead>
        <tbody>
          {#if products}
            {#each products as product (product._id)}
              <tr>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.voucherPrice}</td>
                <td>{product.claimedStatus ? "Yes" : "No"}</td>
                <td>
                  <Button variant="primary" on:click={updateClaimedStatus}
                    >Update Claim</Button
                  >
                </td>
              </tr>
              {/each}
          {:else}
            <tr>
              <td>No Products</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
