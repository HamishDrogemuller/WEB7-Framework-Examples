<script>
  import { Link, useNavigate } from "svelte-navigator";
  import { Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import axios from "axios";


  //signup states
  let firstName = "";
  let lastName = "";
  let userName = "";
  let emailAddress = "";
  let password = "";
  let isMember = false;
  let isBeneficiary = false;
  let error = "";

  const navigate = useNavigate();

  function handleSubmit() {
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    if (isMember && isBeneficiary) {
      setError("Please select only one of the checkbox");
    }
    if (!isMember && !isBeneficiary) {
      setError("Please select at least one of the checkbox");
    }
    if (isMember && !isBeneficiary) {
      axios
        .post("http://localhost:5001/user/register", {
          firstName,
          lastName,
          userName,
          emailAddress,
          password,
          isMember: true,
          isBeneficiary: false,
        }, config)
        .then(() => {
          setTimeout(() => {
            navigate("/Login");
          }, 2000);
        })
        .catch((err) => {
          error=err.response.data;
        });
    } else if (!isMember && isBeneficiary) {
      axios
        .post("http://localhost:5001/user/register", {
          firstName,
          lastName,
          userName,
          emailAddress,
          password,
          isMember: false,
          isBeneficiary: true,
        }, config)
        .then((res) => {
          setTimeout(() => {
            navigate("/Login");
          }, 2000);
        })
        .catch((err) => {
          error=err.response.data;
        });
    }
  }
</script>

<main class="form-signin" on:submit|preventDefault={handleSubmit}>
  <form>
    <h1 class="h3 mb-3 fw-normal" id="signup-title">Signup</h1>
    <div class="form-floating">
      <FormGroup>
        <input
          type="first-name"
          class="form-control"
          id="floatingInput"
          placeholder="FirstName"
          name="First Name"
          bind:value={firstName}
        />
      </FormGroup>
    </div>
    <div class="form-floating">
      <FormGroup>
      <input
        type="last-name"
        class="form-control"
        id="floatingInput"
        placeholder="LastName"
        name="Last Name"
        bind:value={lastName}
      />
      </FormGroup>
    </div>
    <div class="form-floating">
      <FormGroup>
      <input
        type="user-name"
        class="form-control"
        id="floatingInput"
        placeholder="UserName"
        name="User Name"
        bind:value={userName}
      />
      </FormGroup>
    </div>
    <div class="form-floating">
      <FormGroup>
      <input
        type="email"
        class="form-control"
        id="floatingPassword"
        placeholder="name@example.com"
        name="Email Address"
        bind:value={emailAddress}
      />
      </FormGroup>
    </div>
    <div class="form-floating">
      <FormGroup>
      <input
        type="password"
        class="form-control"
        id="floatingPassword-signup"
        placeholder="ConfirmPassword"
        name="Password"
        bind:value={password}
      />
      </FormGroup>
      <div>
        <p>Type of user:</p>
      </div>
    </div>
    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" id="member-check" bind:checked={isMember} /> Member
      </label>
      <label>
        <input
          type="checkbox"
          id="beneficiary-check"
          bind:checked={isBeneficiary}
        /> Beneficiary
      </label>
    </div>
    <button
      class="w-100 btn btn-lg btn-primary"
      id="submit-button-signup"
      type="submit">Register</button
    >
    <Link class="signup-link" to="/Login">Already have an account? Login</Link>
  </form>
</main>
