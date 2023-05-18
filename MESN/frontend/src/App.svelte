<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Landing from "./pages/Landing.svelte";
	import Login from "./pages/Login.svelte";
	import Signup from "./pages/Signup.svelte";
	import Account from "./pages/Account.svelte";
	import AccountEdit from "./pages/AccountEdit.svelte";
	import Product from "./pages/Product.svelte";
	import ProductDetail from "./pages/ProductDetail.svelte";
	import AddProduct from "./pages/AddProduct.svelte";
	import { Router, Route } from "svelte-navigator";
</script>

<Router>
	<Header />
	<main>
		<Route path="/" component={Landing} />
		<Route path="/Login" component={Login} primary={false} />
		<Route path="/Signup" component={Signup} primary={false} />
		<Route path="/Account" component={Account} primary={false} />
		<Route path="/AccountEdit" component={AccountEdit} primary={false} />
		<Route path="/Product" component={Product} primary={false} />
		<Route path="/ProductDetail/:id" component={ProductDetail} primary={false} />
		<Route path="/addProduct" component={AddProduct} primary={false} />
	</main>
	<Footer />
</Router>

<style>
</style>
