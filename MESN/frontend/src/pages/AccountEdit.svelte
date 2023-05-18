<script>
  import { Link, useNavigate } from "svelte-navigator";
  import { Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import axios from "axios";

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

 //AccountEdit states
  let firstName = userInfo.data.firstName;
  let lastName = userInfo.data.lastName;
  let userName = userInfo.data.userName;
  let emailAddress = userInfo.data.emailAddress;
  let password = userInfo.data.password;

  function handleSubmit () {
    const data = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      emailAddress: emailAddress,
      password: password,
    }
    axios
      .put('http://localhost:5001/user/editUser/', data)
      .then(res => {
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        setTimeout(() => {
          window.location.href='/Account';
        }, 2000)
      })
      .catch(err => {
        console.log(err);
      })
  }
</script>

<form>
  <div class="form-group">
    <FormGroup>
      <label for="firstName">First Name</label>
      <input
        type="text"
        class="form-control"
        id="firstName"
        placeholder="Enter First Name"
        name="firstName"
        bind:value={firstName}
      />
    </FormGroup>
  </div>
  <div class="form-group">
    <FormGroup>
      <label for="lastName">Last Name</label>
      <input
        type="text"
        class="form-control"
        id="lastName"
        placeholder="Enter Last Name"
        name="lastName"
        bind:value={lastName}
      />
    </FormGroup>
  </div>
  <div class="form-group">
    <FormGroup>
      <label for="userName">User Name</label>
      <input
        type="text"
        class="form-control"
        id="userName"
        placeholder="Enter User Name"
        name="userName"
        bind:value={userName}
      />
    </FormGroup>
  </div>
  <div class="form-group">
    <FormGroup>
      <label for="emailAddress">Email Address</label>
      <input
        type="email"
        class="form-control"
        id="emailAddress"
        placeholder="Enter Email Address"
        name="Email Address"
        bind:value={emailAddress}
      />
    </FormGroup>
  </div>
  <div class="form-group">
    <FormGroup>
      <label for="emailAddress">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Enter password"
        name="password"
        bind:value={password}
      />
    </FormGroup>
  </div>
</form>
<button class="btn btn-primary" type="submit" on:click={handleSubmit}
  >Submit</button
>
<button
  class="btn btn-primary"
  type="submit"
  on:click={() => {
    navigate("/Account");
  }}>Cancel</button
>
