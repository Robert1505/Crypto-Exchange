import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axiosInstance from '../axios';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    background: 'linear-gradient(45deg, #7500FF 30%, #CB00FF 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgb(83, 2, 175)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}));

export default function DialogSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rates, setRates] = useState([]);
  const [crypto, setCrypto] = useState({});

  
  const getCurrencies = async () => {
    const response = await axiosInstance.get(`/exchange_rates`);
    setRates(Object.entries(response.data.rates));
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    getCurrencies();
  }, [])

  useEffect(() => {
    props.conversion();
  }, [crypto])

  const renderRates = () => {
    const array = rates;
    return array.map((x, idx) => (
        <MenuItem onClick = {() => {handleOpen();setCrypto(x[1])}} key={`crypto-${idx}`} value = {x[1].name}>{x[1].name}</MenuItem>
        )
    )
  }

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>Choose a crypto</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}>
        <DialogTitle>Choose a crypto</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="demo-controlled-open-select-label">Crypto</InputLabel>
              <Select labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                onClose={handleClose}
                onOpen={handleOpen}
                onChange={(e) => {props.handleClick(e.target.value);
                props.conversion()
                }}
                >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {renderRates()}
                
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
       
          <Button onClick={handleClose} crypto = {crypto} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
