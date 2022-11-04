import axios from 'axios'

class OrderService{
    baseUrl = "http://localhost:8090/bookstoreapp/order";

    placeOrder(orderItem){
      return  axios.post(`\${this.baseUrl}/placeOrder`,orderItem);
    }

}

export default new OrderService();