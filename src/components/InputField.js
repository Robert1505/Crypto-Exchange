import React from 'react';
import axiosInstance from '../axios';
import {useState, useEffect} from 'react';
import DialogSelect from './playgruond';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    textfield: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        },
        border: 1,
    },
    root: {
        background: 'linear-gradient(45deg, #CB00FF 30%, #7500FF 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgb(83, 2, 175)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
}));

export default function InputField(props) {
    const classes = useStyles();
    const [rates, setRates] = useState([]);
    const [initialCrypto, setInitialCrypto] = useState("");
    const [amount, setAmount] = useState(0);
    const [secondCrypto, setSecondCrypto] = useState("");
    const [finalResult, setFinalResult] = useState(0);
    const [show, setShow] = useState(false);


    const getCurrencies = async () => {
        const response = await axiosInstance.get(`/exchange_rates`);
        setRates(Object.entries(response.data.rates));
    }

    const renderRates = () => {
        const array = rates;
        return array.map((x, idx) => (
        <option key={`crypto-${idx}`} value = {x[1].unit}>{x[1].name}</option>
            )
        )
    }

    useEffect(() => {
        getCurrencies();
      }, [])

    const conversion = () => {
        let found = {};
        if(initialCrypto === "" || secondCrypto === "")
            return;
        found = rates.find(element => element[1].name === initialCrypto);
        
        console.log('found', found[1].value);
        let x = 1 / found[1].value; /// BTC Value
        x = x * amount;
        found = rates.find(element => element[1].name === secondCrypto);
        console.log('found2', found[1].value);
        let final = x * found[1].value;
        console.log(final);
        final = final.toFixed(2);
        setShow(true);
        setFinalResult(final);
    }

    useEffect(() => {
        conversion()
    },[amount])

    return (
        <div>
            <div className = "flex">
                <div className = "flex-1 text-center">
                    <div className = "text-lg mt-24 font-bold mb-4">
                        Here you can choose your crypto!
                    </div>
                    <DialogSelect conversion = {conversion} value = {initialCrypto} 
                    handleClick={setInitialCrypto} 
                    myRates={rates}/>
                
                </div>
                <div className = "flex-1 text-center">
                    <div className = "text-lg mt-24 font-bold mb-4">
                        Insert the amount of crypto!
                    </div>
                    <form className={classes.textfield} noValidate autoComplete="off">
                        <TextField onChange={(e) => {
                            setAmount(+e.target.value);
                        }} value = {amount} id="outlined-basic" label="Amount" variant="outlined" />
                    </form>
                </div>
                <div className = "flex-1 text-center">
                    <div className = "text-lg mt-24 font-bold mb-4">
                        Crypto in which you convert!
                    </div>
                    <DialogSelect value = {secondCrypto} conversion = {conversion} handleClick = {setSecondCrypto} myRates={rates}/>
                
                </div>
            </div>
            <div className = "flex-1 text-center">
                <div className = "text-xl mt-24 font-bold mb-4">
                    Final result!
                </div>
                {show ? 
                <div className = "mt-8 text-5xl">
                    {amount}  *  {initialCrypto}  =  {finalResult}  *  {secondCrypto}
                </div>
                : ""}
            </div>
        </div>
    )
}
