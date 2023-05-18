<script>
  import { Link, useNavigate } from "svelte-navigator";
  import { Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import TokenList from "../components/TokenList.svelte";
  import axios from "axios";

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  //Account states
  let firstName = userInfo.data.firstName;
  let lastName = userInfo.data.lastName;
  let userName = userInfo.data.userName;
  let emailAddress = userInfo.data.emailAddress;
  let isMember = userInfo.data.isMember ? "Yes" : "No";
  let isBeneficiary = userInfo.data.isBeneficiary ? "Yes" : "No";
  let vouchers = userInfo.data.vouchers;

  const deleteUser = () => {
    axios
      .delete("http://localhost:5001/user/deleteUser/", {
        data: {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          emailAddress: emailAddress,
        },
      })
      .then(() => {
        localStorage.removeItem("userInfo");
        const refreshPage = () => {
          window.location.href = "/";
        };
        setTimeout(refreshPage, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>

<form>
  <div class="form-group">
    <FormGroup>
      <label for="firstName">First Name</label>
      <input
        readOnly
        type="text"
        class="form-control"
        id="firstName"
        name="First Name"
        bind:value={firstName}
      />
    </FormGroup>
  </div>
  <div class="form-group">
    <FormGroup>
      <label for="lastName">Last Name</label>
      <input
        readOnly
        type="text"
        class="form-control"
        id="lastName"
        placeholder="Enter Last Name"
        name="Last Name"
        bind:value={lastName}
      />
    </FormGroup>
  </div>
  <div class="form-group">
    <FormGroup>
      <label for="userName">User Name</label>
      <input
        readOnly
        type="text"
        class="form-control"
        id="userName"
        placeholder="Enter User Name"
        name="User Name"
        bind:value={userName}
      />
    </FormGroup>
  </div>
  <div class="form-group">
    <FormGroup>
      <label for="emailAddress">Email Address</label>
      <input
        readOnly
        type="email"
        class="form-control"
        id="emailAddress"
        placeholder="Enter Email Address"
        name="Email Address"
        bind:value={emailAddress}
      />
    </FormGroup>
  </div>
  {#if userInfo.data.isMember}
    <div class="form-group">
      <FormGroup>
        <label for="isMember">Member Account</label>
        <input
          readOnly
          type="text"
          class="form-control"
          id="isMember"
          placeholder="Enter Member Account"
          name="Member Account"
          bind:value={isMember}
        />
      </FormGroup>
    </div>
  {:else}
    <div class="form-group">
      <FormGroup>
        <label for="isBeneficiary">Beneficiary Account</label>
        <input
          readOnly
          type="text"
          class="form-control"
          id="isBeneficiary"
          placeholder="Enter Beneficiary Account"
          name="Beneficiary Account"
          bind:value={isBeneficiary}
        />
      </FormGroup>
    </div>
    <div class="form-group">
      <FormGroup>
        <label for="isBeneficiary">Number of Vouchers</label>
        <input
          readOnly
          type="text"
          class="form-control"
          id="vouchers"
          placeholder="vouchers"
          name="Vouchers"
          bind:value={vouchers}
        />
      </FormGroup>
    </div>
  {/if}
</form>
<button
  type="button"
  class="btn btn-primary"
  on:click={() => {
    navigate("/AccountEdit");
  }}>Edit</button
>
<button
  type="button"
  class="btn btn-primary"
  on:click={() => {
    deleteUser();
  }}>Delete</button
>
{#if userInfo.data.isMember}
<div></div>
{:else}
  <TokenList />
{/if}
