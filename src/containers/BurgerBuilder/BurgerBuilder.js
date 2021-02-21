import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components//OrderSummary/orderSummary';


const INGREDIENT_PRICES = {
    salad: 1,
    bacon: 2,
    cheese: 1.5,
    meat: 2.5
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         ingredients: {
    //             salad: 1,
    //             bacon: 1,
    //             cheese: 2,
    //             meat: 2
    //         }
    //     }
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
                    .map (igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum, ele) => {
                        return sum += ele;
                    }, 0);
        this.setState({purchasable: sum > 0});
        
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients: updatedIngredients, purchasable: this.updatePurchaseState});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0 ){
            const updatedCount = oldCount - 1;
            const updatedIngredients ={...this.state.ingredients};
            updatedIngredients[type] = updatedCount;

            const priceDeducion = INGREDIENT_PRICES[type];
            const newPrice = this.state.totalPrice + priceDeducion;
            this.setState({totalPrice:newPrice, ingredients: updatedIngredients, urchasable: this.updatePurchaseState});
            this.updatePurchaseState(updatedIngredients);
        } else {
                return;
        }
        
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        alert("Checking Out");
    };
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0
        }
        // disabledInfo = {salad: true, bacon: false ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinue ={this.purchaseContinueHandler}
                        price ={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo= {disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing = {this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;