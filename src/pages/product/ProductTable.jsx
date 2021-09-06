import React from "react";
//core components
import MaterialTable from "material-table";
//material-ui core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//icons & style
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import SearchIcon from "@material-ui/icons/Search";
import { styles } from "../../assets/common/buttonStyle";
//redux
import {
  getProducts,
  setOpenBookProduct,
  setOpenReturnProduct,
} from "../../actions/product";
import { connect } from "react-redux";
import BookModal from "../booking/BookModal";
import BookPriceModal from "../booking/BookPriceModal";
import ReturnModal from "../returning/ReturnModal";
import ReturnPriceModal from "../returning/ReturnPriceModal";

const useStyles = makeStyles(styles);

function ProductTable(props) {
  const classes = useStyles();
  let { products, getProducts, setOpenBookProduct, setOpenReturnProduct } =
    props;
  React.useEffect(() => {
    getProducts();
  }, []);

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Code",
      field: "code",
    },
    {
      title: "Availability",
      field: "availability",
    },
    {
      title: "Need to repair",
      field: "needing_repair",
    },
    {
      title: "Durability",
      field: "durability",
    },
    {
      title: "Mileage",
      field: "mileage",
    },
  ];

  return (
    <>
      <Card>
        <CardContent className={classes.card}>
          {products.length > 0 && JSON.parse(products).length > 0 && (
            <MaterialTable
              title={null}
              data={JSON.parse(products)}
              columns={columns}
              options={{
                paging: false,
                search: true,
                sorting: true,
              }}
              icons={{
                SortArrow: React.forwardRef((props, ref) => (
                  <UnfoldMoreIcon className={classes.arrowIcon} />
                )),
                Search: React.forwardRef((props, ref) => (
                  <SearchIcon className={classes.arrowIcon} />
                )),
                ResetSearch: React.forwardRef((props, ref) => <></>),
              }}
            />
          )}
          <div style={{ marginTop: 16, marginBottom: 16, float: "right" }}>
            <Button
              className={classes.button}
              style={{ marginRight: 16 }}
              onClick={setOpenBookProduct}
            >
              Books
            </Button>
            <Button className={classes.button} onClick={setOpenReturnProduct}>
              Return
            </Button>
          </div>
        </CardContent>
      </Card>
      <>
        <BookModal />
        <BookPriceModal />
      </>
      <>
        <ReturnModal />
        <ReturnPriceModal />
      </>
    </>
  );
}

const mapStateToProps = ({ product }) => {
  return {
    products: product.products,
  };
};

const mapDispatchToProps = {
  getProducts,
  setOpenBookProduct,
  setOpenReturnProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
