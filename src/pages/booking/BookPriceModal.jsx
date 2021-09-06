import React from "react";
//material-ui core
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
//icons & style
import { styles } from "../../assets/common/dialogStyle";
//redux
import {
  cancelProduct,
  setConfirmBookPrice,
  setCancelBookPrice,
} from "../../actions/product";
import { connect } from "react-redux";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyle = makeStyles(styles);

function BookPriceModal(props) {
  const classes = useStyle();
  const {
    openBookPrice,
    setCancelBookPrice,
    setConfirmBookPrice,
    cancelProduct,
    bookProductData,
  } = props;
  const handleCancel = () => {
    cancelProduct();
  };
  const handleYes = () => {
    setConfirmBookPrice(bookProductData);
  };
  const handleNo = () => {
    setCancelBookPrice();
  };

  return (
    <Dialog
      onClose={handleCancel}
      aria-labelledby="simple-dialog-title"
      open={openBookPrice}
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ width: 500, textAlign: "center" }}
      >
        Book a product
      </DialogTitle>
      <DialogContentText style={{ textAlign: "center" }}>
        <p>
          Your estimated price is {bookProductData && bookProductData.price}
        </p>
        <p>Do you want to procedure?</p>
        <div style={{ float: "right", marginRight: 16 }}>
          <span>
            <Button
              className={classes.button}
              style={{ marginRight: 16 }}
              onClick={handleNo}
            >
              No
            </Button>
          </span>
          <span>
            <Button className={classes.button} onClick={handleYes}>
              Yes
            </Button>
          </span>
        </div>
      </DialogContentText>
    </Dialog>
  );
}

const mapStateToProps = ({ product }) => {
  return {
    openBookPrice: product.openBookPrice,
    bookProductData: product.bookProductData,
  };
};

const mapDispatchToProps = {
  cancelProduct,
  setConfirmBookPrice,
  setCancelBookPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPriceModal);
