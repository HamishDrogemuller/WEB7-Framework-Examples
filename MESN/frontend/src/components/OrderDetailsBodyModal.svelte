<script>


  export let orderInfo;
console.log(orderInfo)

</script>
  <div>
    <h5>Order ID: {orderInfo.data._id}</h5>
    <h5>Token: {orderInfo.data.tokenId}</h5>
    <h5>Order Products:</h5>
    {#each orderInfo.data.products as product (product._id)}
          <div>
            <h6>Product ID: {product._id}</h6>
            <h6>Product Name:{product.name}</h6>
          </div>
    {/each}
    <h5>Order Status: {orderInfo.data.statusCompleted ? 'Completed' : 'Pending'}</h5>
    <h5>Order Total: {orderInfo.data.subtotal}</h5>
  </div>