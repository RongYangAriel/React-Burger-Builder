import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},

];
const buildControls =(props) => (
    <div className ={classes.BuildControls}>
        <p>Current Price: <strong>{props.price}</strong></p>
        {controls.map( ele => {
            return <BuildControl 
                        key ={ele.label} 
                        label ={ele.type} 
                        added = {()=> props.ingredientAdded(ele.type)}
                        removed = {() => props.ingredientRemoved(ele.type)}
                        disabled= {props.disabledInfo[ele.type]}/>
        })}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable}
            onClick={props.purchasing}>ORDER NOW</button>
    </div>
);

export default buildControls;