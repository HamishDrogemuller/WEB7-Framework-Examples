<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import OrderDetailsModal from "../components/OrderDetailsModal.svelte";


  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let tokens = [];

  // get user email address from database to update user and send to localStorage
  axios
    .post("http://localhost:5001/user/", { emailAddress: userInfo.data.emailAddress })
    .then((res) => {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });

    onMount(async () => {
      tokens = userInfo.data.tokens;
    })
</script>

<div>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Tokens</th>
              <th scope="col">Order Details</th>
            </tr>
          </thead>
          <tbody>
            {#if tokens}
              {#each tokens as token (token)}
                <tr>
                  <td>{token}</td>
                  <td>
                    <OrderDetailsModal {token} />
                  </td>
                </tr>
              {/each}
            {:else}
              <tr>
                <td>No Tokens</td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
