<script>
  /* -------------------------------------------------------------------------- */
  /*                               Import Section                               */
  /* -------------------------------------------------------------------------- */
  import { useNavigate } from "svelte-navigator";
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    CardImg,
  } from "sveltestrap";

  /* -------------------------------------------------------------------------- */
  /*                               Layout Section                               */
  /* -------------------------------------------------------------------------- */
  // product cards component and navigation, on click to product specifics

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/ProductDetail/${product._id}`);
  };

  export let product;
  let {name, voucherPrice, description, imageUrl} = product;

</script>

<Card class="product-card" on:click={handleClick}>
  <CardImg variant="top" src={imageUrl} />
  <CardBody>
    <CardTitle>{name}</CardTitle>
    <CardText>{description}</CardText>
    <CardText>
      <strong>Price:</strong>
      {voucherPrice}
    </CardText>
  </CardBody>
</Card>
