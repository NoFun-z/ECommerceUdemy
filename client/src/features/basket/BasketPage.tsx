import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { addBasketItemAsync, removeBasketItemAsync} from "./BasketSlice";

export default function BasketPage() {

  const { basket } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();


  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((row) => (
              <TableRow
                key={row.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={row.pictureUrl} alt={row.name} style={{ height: 50, marginRight: 20 }} />
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{(row.price / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Button
                    // loading={status === ('pendingRemoveItem' + item.productId + 'rem')}
                    onClick={() => dispatch(removeBasketItemAsync({productId: row.productId, quantity: 1, name: 'rem'}))}
                    color='error'>
                    <Remove />
                  </Button>
                  {row.quantity}
                  <Button
                    // loading={status === ('pendingAddItem' + row.productId)}
                    onClick={() => dispatch(addBasketItemAsync({productId: row.productId}))}
                    color='secondary'>
                    <Add />
                  </Button>
                </TableCell>
                <TableCell align="right">{((row.price / 100) * row.quantity).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Button
                    //loading={status === ('pendingRemoveItem' + row.productId + 'del')}
                    onClick={() => dispatch(removeBasketItemAsync({productId: row.productId, quantity: row.quantity, name: 'del'}))}
                    color='error'>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button component={Link} to='/checkout' variant='contained' size='large' fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}