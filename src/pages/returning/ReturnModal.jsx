import React from "react";
//material-ui core
import { Dialog, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
//icons & style
import { styles } from "../../assets/common/dialogStyle";
//redux
import {
  setOpenReturnProduct,
  setOpenReturnPrice,
  getProducts,
} from "../../actions/product";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(styles);

function ReturnModal(props) {
  const classes = useStyles();
  let [product, setProduct] = React.useState("select");
  let [productData, setProductData] = React.useState(null);
  const {
    openReturnProduct,
    setOpenReturnProduct,
    setOpenReturnPrice,
    products,
  } = props;
  const handleClose = () => {
    setOpenReturnProduct();
  };
  const handlePrice = () => {
    if (productData) {
      const data = {
        price: productData[0].price,
        code: productData[0].code,
        fee: productData[0] && productData[0].fee ? productData[0].fee : null,
      };
      setOpenReturnPrice(data);
      setProduct("select");
    } else {
      console.log("error");
    }
  };

  const handleChangeProduct = (e) => {
    setProduct(e.target.value);
    const product = JSON.parse(products).filter(
      (p) => p.code === e.target.value
    );
    setProductData(product);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={openReturnProduct}
    >
      <DialogTitle id="simple-dialog-title" style={{ width: 500 }}>
        <div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ width: "100%", marginBottom: 16 }}
            value={product}
            onChange={handleChangeProduct}
          >
            <MenuItem value="select">Select Product</MenuItem>
            {products.length > 0 &&
              JSON.parse(products).length > 0 &&
              JSON.parse(products).map((p) => {
                if (p.availability) {
                  return (
                    <MenuItem value={p.code}>
                      {p.name} / {p.minimum_rent_period} / {p.mileage} /{" "}
                      {p.needing_repair}
                    </MenuItem>
                  );
                }
              })}
          </Select>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={productData ? productData[0].mileage : "no mileage"}
            style={{ width: "100%", marginBottom: 16 }}
            disabled="true"
          />
        </div>
        <div style={{ marginTop: 16, float: "right" }}>
          <span>
            <Button
              className={classes.button}
              style={{ marginRight: 16 }}
              onClick={handleClose}
            >
              No
            </Button>
          </span>
          <span>
            <Button className={classes.button} onClick={handlePrice}>
              Yes
            </Button>
          </span>
        </div>
      </DialogTitle>
    </Dialog>
  );
}

const mapStateToProps = ({ product }) => {
  return {
    openReturnProduct: product.openReturnProduct,
    products: product.products,
  };
};

const mapDispatchToProps = {
  setOpenReturnProduct,
  setOpenReturnPrice,
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnModal);
