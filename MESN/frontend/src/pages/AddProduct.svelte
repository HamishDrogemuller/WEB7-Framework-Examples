<script>
  import { Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import MemberProduct from '../components/MemberProduct.svelte';
  import axios from "axios";

  let name = "";
  let description = "";
  let voucherPrice = "";
  let imageUrl = "";
  let category = "";
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));


  const handleAddProductSubmit = () => {
    if (
      name === "" ||
      description === "" ||
      voucherPrice === "" ||
      imageUrl === "" ||
      category === ""
    ) {
      setError("Please fill in all the fields");
      setLoading(false);
    } else {
      axios
        .post("http://localhost:5001/product/addProduct", {
          name,
          description,
          voucherPrice,
          imageUrl,
          category,
          memberId: userInfo.data._id,
          claimedStatus: false,
        })
        .then((res) => {
          setTimeout(() => {
            window.location.href = "/Product";
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data.message);
        });
    }
  };
</script>

<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1 class="text-center">Add Product</h1>
      <hr />
      <form on:submit|preventDefault={handleAddProductSubmit}>
        <div class="form-group">
          <FormGroup>
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              bind:value={name}
            />
          </FormGroup>
        </div>
        <div class="form-group">
          <FormGroup>
            <label for="description">Description</label>
            <input
              type="text"
              class="form-control"
              id="description"
              placeholder="Enter description"
              name="description"
              bind:value={description}
            />
          </FormGroup>
        </div>
        <div class="form-group">
          <FormGroup>
            <label for="voucherPrice">Voucher Price</label>
            <input
              type="text"
              class="form-control"
              id="voucherPrice"
              placeholder="Enter voucher price"
              name="voucherPrice"
              bind:value={voucherPrice}
            />
          </FormGroup>
        </div>
        <div class="form-group">
          <FormGroup>
            <label for="imageUrl">Image Url</label>
            <input
              type="text"
              class="form-control"
              id="imageUrl"
              placeholder="Enter image url"
              name="imageUrl"
              bind:value={imageUrl}
            />
          </FormGroup>
        </div>
        <div class="form-group">
          <FormGroup>
            <label for="category">Category</label>
            <input
              type="text"
              class="form-control"
              id="category"
              placeholder="Enter category"
              name="category"
              bind:value={category}
            />
          </FormGroup>
        </div>
        <button type="submit" class="btn btn-primary btn-block"
          >Add Product</button
        >
      </form>
    </div>
  </div>
</div>
<MemberProduct />
