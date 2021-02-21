import React from 'react';
import Aux from '../../hoc/Aux';
import Button from '../../components/UI/Button/Button';

const orderSummary =(props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey + props.ingredients[igKey]}>
                <span style={{textTransform: 'capitalize'}}>{igKey}:</span> 
                {props.ingredients[igKey]}
                </li>
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A deliciou burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <Button 
                btnType='Danger' clicked={props.purchaseCancelled}>
                CANCEL
            </Button>
            <Button
                btnType= 'Success' clicked ={props.purchaseContinue}> 
                CONTINUE
            </Button>
        </Aux>
    )
};

export default orderSummary;