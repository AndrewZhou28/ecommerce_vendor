import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";


export default function OrdersPage(){
  const [orders,setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    })
  }, []);
  return(
    <Layout>
      <h1>Orders</h1>
      <table className="basic"> 
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
        {orders.length > 0 && orders.map(order => (
          <tr>
            <td>{(new Date(order.createdAt)).toLocaleString()}</td>
            <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
              {order.paid ? 'Yes' : 'No'}
            </td>
            <td>
              {order.name} {order.email} <br />
              {order.streetAddress} {order.city} {order.zipcode} {order.country}
            </td>
            <td>
              {order.line_items.map(item => (
                <>
                  {item.price_data?.product_data.name} x 
                  {item.quantity} <br/>
                  
                </>
              ))}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </Layout>
  )
}