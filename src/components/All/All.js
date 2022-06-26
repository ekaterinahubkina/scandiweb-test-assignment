import { Component } from "react";
import ProductCard from "../ProductListingPage/ProductCard/ProductCard";
import ProductListingPage from "../ProductListingPage/ProductListingPage";

class All extends Component {
    render () {
        return (
            
            <ProductListingPage categoryName="All">
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

export default All;