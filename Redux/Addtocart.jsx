

 function Addtocart({ id, description, image, title, price, username }) {
    const action = {
        type: "Add_Item_To_Cart",
        item: {
            id,
            title,
            description,
            price,
            image,
            username
        }
    };

    // Save to local storage
    const currentCart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
    const updatedCart = [...currentCart, action.item];
    localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));

    return action;
}

export default Addtocart;