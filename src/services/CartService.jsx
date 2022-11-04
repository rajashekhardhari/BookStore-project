import axios from 'axios'

class CartService{
    baseUrl = "http://localhost:8090/bookstoreapp/mycart";


    authAxios = axios.create({
        baseURL:this.baseUrl,
        headers: {
            // token:`${this.token}`
            token:"test"
        }
      })

    addBookToCart(bookId){
        return this.authAxios.post('/addBookToCart/'+bookId)
    }

    getCartDetails(){
        return axios.get(`${this.baseUrl}/getAll`)
    }

    deleteCartItem(cartId){
        return axios.delete(`${this.baseUrl}/delete/${cartId}`)
    }

    updateCartQuantity(cartId,quantity){
        return axios.put(`${this.baseUrl}/updateQuantity/${cartId}/${quantity}`);
    }
}

export default new CartService();