import React from 'react'
import Title from './components/Title';
import {Link} from 'react-router-dom';
import InputField from './components/InputField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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


export default function Calculator() {

    const classes = useStyles();

    return (
        <div className = "background max-w-full h-screen">
            <Title />
            <InputField />
            <div className = "text-center absolute inset-x-0 bottom-0 mb-8">
                <Link to = '/currencies'>
                    <Button className={classes.root}>Currencies</Button>
                </Link>
            </div>
        </div>
    )
}
