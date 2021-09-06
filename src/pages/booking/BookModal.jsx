import React from "react";
import DateFnsUtils from "@date-io/date-fns";
//material-ui core
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
//icons & style
import { styles } from "../../assets/common/dialogStyle";
//redux
import {
  setOpenBookProduct,
  setOpenBookPrice,
  getProducts,
} from "../../actions/product";
import { connect } from "react-redux";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(styles);

function BookModal(props) {
  const classes = useStyles();
  const { openBookProduct, setOpenBookProduct, setOpenBookPrice, products } =
    props;
  let [selectedStartDate, setSelectedStartDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  let [selectedEndDate, setSelectedEndDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  let [product, setProduct] = React.useState("select");
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };
  const handleEndDateChange = (data) => {
    setSelectedEndDate(data);
  };
  const handleClose = () => {
    setOpenBookProduct();
  };
  const handlePrice = () => {
    var startDate = new Date(selectedStartDate);
    var endDate = new Date(selectedEndDate);

    if (product !== "select" && endDate.getTime() > startDate.getTime()) {
      const dateNumber = Math.round(
        (endDate.getTime() - startDate.getTime()) / 86400000
      );
      const targetProductData = JSON.parse(products).filter(
        (p) => p.code === product
      );
      if (
        dateNumber >= targetProductData[0].minimum_rent_period &&
        targetProductData[0].durability > 0
      ) {
        const data = {
          price: targetProductData[0].price * dateNumber,
          code: targetProductData[0].code,
          dateNumber: dateNumber,
        };

        setOpenBookPrice(data);

        setProduct("select");
      } else {
        console.log("error");
      }
    } else {
      console.log("error");
    }
  };

  const handleChangeProduct = (e) => {
    setProduct(e.target.value);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={openBookProduct}
    >
      <DialogTitle id="simple-dialog-title">
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
                if (!p.availability) {
                  return (
                    <MenuItem value={p.code}>
                      {p.name} / {p.minimum_rent_period} / {p.mileage} /{" "}
                      {p.needing_repair}
                    </MenuItem>
                  );
                }
              })}
          </Select>
        </div>
        <div>
          <span>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Form"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </span>
          <span>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="To"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </span>
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
    openBookProduct: product.openBookProduct,
    products: product.products,
  };
};

const mapDispatchToProps = {
  getProducts,
  setOpenBookProduct,
  setOpenBookPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookModal);
