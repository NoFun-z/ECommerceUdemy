import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4}>
            {products.map((prod) => (
                <Grid item xs={3} key={prod.id}>
                    <ProductCard product={prod} />
                </Grid>
            ))}
        </Grid>
    )
}