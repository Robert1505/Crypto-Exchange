import React from 'react';
import axiosInstance from './axios';
import {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';



const StyledTableCell = withStyles((theme) => ({
head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
},
body: {
    fontSize: 14,
},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) =>({
    table: {
        minWidth: 700,
    },
    root: {
        background: 'rgb(203,203,203)',
        background: 'radial-gradient(circle, rgba(203,203,203,1) 0%, rgba(121,121,121,1) 50%, rgba(0,0,0,1) 100%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgb(203,203,203)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
}));

export default function CustomizedTables() {

    const classes = useStyles();
    const [rates, setRates] = useState([]);

    useEffect(() => {
        getCurrencies();
    }, []);

    const getCurrencies = async () => {
        const response = await axiosInstance.get(`/exchange_rates`);
        setRates(response.data.rates);
    }

    const renderRates = () => {
        const array = Object.entries(rates);
        return array.map(x => (
            <StyledTableRow key={array.name}>
                    <StyledTableCell align="center" component="th" scope="row">{x[1].unit}</StyledTableCell>
                    <StyledTableCell align="center">{x[1].name}</StyledTableCell>
                    <StyledTableCell align="center">{x[1].value}</StyledTableCell>
            </StyledTableRow>)
        )
    }

    return (
        <div>
            <div className = "text-center mt-2 mb-4">
                <React.Fragment>
                    <Link to = "/">
                        <Button className={classes.root}>Calculator</Button>
                    </Link>
                </React.Fragment>
            </div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell align="center">Unit</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Value(Bitcoin)</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {renderRates()}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}
