<script>
  /* -------------------------------------------------------------------------- */
  /*                               Import Section                               */
  /* -------------------------------------------------------------------------- */
  // import CartModal from './CartComponent';
  // import './Header.css';
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // const handleLogout = () => {
  //     localStorage.removeItem('userInfo');
  //     window.location.href = '/';
  // }
  import { useNavigate } from "svelte-navigator";
  import CartModal from './CartComponent.svelte';
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  function handleLogout() {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  }
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "sveltestrap";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">Quill Training Charity</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="/Product">Product</NavLink>
      </NavItem>
      <CartModal/>
      {#if userInfo}
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>{userInfo.data.firstName}</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem
              id="dropdown-item"
              on:click={() => {
                navigate("/Account");
              }}
            >
              <NavLink id="nav-dropdown-item">Profile</NavLink>
            </DropdownItem>
            {#if userInfo.data.isMember}
              <DropdownItem
                id="dropdown-item"
                on:click={() => {
                  navigate("/addProduct");
                }}
              >
                <NavLink id="nav-dropdown-item">Products</NavLink>
              </DropdownItem>
            {/if}
              <DropdownItem divider />
              <DropdownItem id="dropdown-item" on:click={handleLogout}>
                <NavLink id="nav-dropdown-item">Logout</NavLink>
              </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      {:else}
        <NavLink href="/Login" id="nav-login">Login</NavLink>
      {/if}
    </Nav>
  </Collapse>
</Navbar>
