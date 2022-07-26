export const state = () => ({
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
    qty: 0
})

export const mutations = {
    changeQty(state, n){
        if (n===-1 && state.qty===0){
            return false
        }
        state.qty += n;
    },
    changeCartState(state){
        state.showCart = !state.showCart;
    },
    onAdd(state, [product, quantity]){
        if (quantity !== 0){
            const checkProductInCart = state.cartItems.find((item) => (item._id === product._id))
            state.totalPrice += product.price * quantity;
            state.totalQuantities += quantity;

            if (checkProductInCart){
                const updatedCartItems = state.cartItems.map((cartProduct) => {
                    if (cartProduct._id === product._id) return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity 
                    }
                    return cartProduct
                })
                state.cartItems = updatedCartItems;
            } else {
                product.quantity = quantity;
                state.cartItems = [...state.cartItems, {...product}]; 
            }
        }
    },
    upgradeProductQty(state,[id,n]){
        const product = state.cartItems.find((item) => (item._id === id));
        if (n===-1 && product.quantity === 0){
            return false
        } 
        product.quantity += n;
        state.totalQuantities += n;
        state.totalPrice += product.price * n;
    },
    onRemove(state, id){
        const product = state.cartItems.find((item) => item._id === id);
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
        state.totalQuantities -= product.quantity;
        state.totalPrice -= product.quantity * product.price;
    }
}