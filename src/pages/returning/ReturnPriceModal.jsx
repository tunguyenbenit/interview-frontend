import React from "react";
//material-ui core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Dialog, DialogTitle } from "@material-ui/core";
//icons & style
import { styles } from "../../assets/common/dialogStyle";
//redux
import { cancelProduct, setConfirmReturnPrice } from "../../actions/product";
import { connect } from "react-redux";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyle = makeStyles(styles);

function ReturnPriceModal(props) {
  const classes = useStyle();
  const {
    openReturnPrice,
    cancelProduct,
    setConfirmReturnPrice,
    bookProductData,
  } = props;
  const handleCancel = () => {
    cancelProduct();
  };
  const handleConfirm = () => {
    setConfirmReturnPrice(bookProductData);
  };

  return (
    <Dialog
      onClose={handleCancel}
      aria-labelledby="simple-dialog-title"
      open={openReturnPrice}
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ width: 500, textAlign: "center" }}
      >
        Return a product
      </DialogTitle>
      <DialogContentText style={{ textAlign: "center" }}>
        <p>
          Your estimated price is{" "}
          {bookProductData && bookProductData.fee
            ? bookProductData.fee
            : "none"}
        </p>

        <p>Do you want to procedure?</p>
        <div style={{ marginRight: 16, float: "right" }}>
          <Button className={classes.button} onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContentText>
    </Dialog>
  );
}

const mapStateToProps = ({ product }) => {
  return {
    openReturnPrice: product.openReturnPrice,
    bookProductData: product.bookProductData,
  };
};

const mapDispatchToProps = {
  cancelProduct,
  setConfirmReturnPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReturnPriceModal);
