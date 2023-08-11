import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import React, { useState } from "react";


export default function Catalog() {
    const [products, setProducts] = React.useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(er => console.log(er))
        .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message="Loading products..."/>

    return (
        <>
            <ProductList products={products} />
        </>
    )
}