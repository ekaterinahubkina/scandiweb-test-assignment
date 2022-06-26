import { Component } from "react";
import ProductCard from "../ProductListingPage/ProductCard/ProductCard";
import ProductListingPage from "../ProductListingPage/ProductListingPage";

class Clothes extends Component {
    render () {
        return (
            
            <ProductListingPage categoryName="Clothes">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </ProductListingPage>
        )
    }
}

export default Clothes;