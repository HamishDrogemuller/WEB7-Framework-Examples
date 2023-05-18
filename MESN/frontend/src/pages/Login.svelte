<script>
  import { Link, useNavigate } from "svelte-navigator";
  import { Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import axios from "axios";

  // login states
  let emailAddress = "";
  let password = "";
  let error = "";
  const navigate = useNavigate();

  function handleSubmit() {
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    axios
      .post(
        "http://localhost:5001/user/login/",
        { emailAddress, password },
        config
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        setTimeout(() => {
          window.location.href = "/Product";
        }, 2000);
      })
      .catch((err) => {
        error = err.response.data;
      });
  }
</script>

<!----------------------------- Layout Section ----------------------------->
<form on:submit|preventDefault={handleSubmit} class="form-signin">
  <h1 class="h3 mb-3 fw-normal" id="login-title">Login</h1>
  <div class="form-floating">
    <FormGroup>
      <input
        type="email"
        class="form-control"
        id="floatingInput"
        placeholder="email address"
        name="emailAddress"
        bind:value={emailAddress}
      />
    </FormGroup>
    <div class="form-floating">
      <FormGroup>
        <input
          type="password"
          class="form-control"
          id="floatingPassword-login"
          placeholder="password"
          name="password"
          bind:value={password}
        />
      </FormGroup>
    </div>
    <button
      class="w-100 btn btn-lg btn-primary"
      id="submit-button-login"
      type="submit">Login</button
    >
    <Link className="signup-link" to="/Signup"
      >Don't have an account? Signup</Link
    >
  </div>
</form>
