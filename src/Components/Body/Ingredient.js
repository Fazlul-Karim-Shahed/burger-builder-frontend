import React from 'react'

export default function Ingredient(props) {

    let ingredient;

    if (props.type === "top") ingredient = <div><img height="120px" className="w-75" src="assets/images/top.png" alt="" srcset="" /></div>
    if (props.type === "bottom") ingredient = <div><img height="60px" className="w-75" src="assets/images/bottom.png" alt="" srcset="" /></div>
    if (props.type === "cheese") ingredient = <div><img height="30px" className="w-75" src="assets/images/cheese.png" alt="" srcset="" /></div>
    if (props.type === "salad") ingredient = <div><img height="30px" className="w-75" src="assets/images/salad.png" alt="" srcset="" /></div>
    if (props.type === "meat") ingredient = <div><img height="30px" className="w-75" src="assets/images/meat.png" alt="" srcset="" /></div>


    return (
        <div className="text-center">
            {ingredient}
        </div>
    )
}
