import { Component } from "react";
import ProductCard from "../ProductListingPage/ProductCard/ProductCard";
import ProductListingPage from "../ProductListingPage/ProductListingPage";

class Tech extends Component {
    render () {
        return (
            
            <ProductListingPage categoryName="Tech">
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

export default Tech;