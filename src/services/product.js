import { products } from "../mocks/ProductData";
import { toast } from "react-toastify";

export function saveDataLocalStorage() {
  localStorage.setItem("data", JSON.stringify(products));
}

export function fetchProducts() {
  try {
    const productData = localStorage.getItem("data");
    return productData;
  } catch (e) {
    console.error(e);
  }
}

export function setBookingPrice(data) {
  try {
    let products = JSON.parse(localStorage.getItem("data"));

    // eslint-disable-next-line array-callback-return
    products.filter((product) => {
      if (product.code === data.code) {
        product.availability = true;
        product.mileage = product.mileage
          ? product.mileage + 10 * data.dateNumber
          : 0 + 10 * data.dateNumber;
        product.durability =
          product.type === "plain"
            ? product.durability - data.dateNumber > 0
              ? product.durability - data.dateNumber
              : 0
            : product.durability -
                (2 * data.dateNumber + (2 * product.mileage) / 10) >
              0
            ? product.durability -
              (2 * data.dateNumber + (2 * product.mileage) / 10)
            : 0;
        product.fee = product.price * data.dateNumber;
      }
    });

    localStorage.setItem("data", JSON.stringify(products));
    let productData = localStorage.getItem("data");
    toast.success("Book product successfully!");
    return productData;
  } catch (error) {
    toast.error("Error! Please try again");
    console.error(error);
  }
}

export function setReturningPrice(data) {
  try {
    let products = JSON.parse(localStorage.getItem("data"));
    // eslint-disable-next-line array-callback-return
    products.filter((p) => {
      if (p.code === data.code) {
        p.availability = false;
      }
    });

    localStorage.setItem("data", JSON.stringify(products));
    let productData = localStorage.getItem("data");
    toast.success("Return product successfully!");
    return productData;
  } catch (error) {
    toast.error("Error! Please try again");
    console.error(error);
  }
}
