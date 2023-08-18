import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import { currenncyFormat } from "../../app/util/util";
import OrderDetailed from "./OrderDetailed";

export default function Order() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

    useEffect(() => {
        setLoading(true);
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(er => console.log(er))
            .finally(() => setLoading(false))
    })

    if (loading) return <LoadingComponent message="Loading orders..." />

    if (selectedOrderNumber > 0) return;
    <OrderDetailed
        order={orders?.find(o => o.id == selectedOrderNumber)!}
        setSelectedOrder={setSelectedOrderNumber}
    />

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Number</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Order Status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{currenncyFormat(row.total)}</TableCell>
                            <TableCell align="right">{row.orderDate.split('T')[0]}</TableCell>
                            <TableCell align="right">{row.orderStatus}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => setSelectedOrderNumber(row.id)}>View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}