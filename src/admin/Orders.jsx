import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [data, setData] = useState([])

  const columns = [
    {
      title: '_id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'address',
      key: 'address',
      dataIndex: 'address',
      render: (address) => (
        <>
          <p>{address.fname} {address.lname}</p>
          <p>{address.address}</p>
          <p>{address.city},{address.state},{address.pincode}</p>
          <p>{address.phone}</p>
        </>
      ),
    },
    {
      title: 'amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'products',
      key: 'products',
      dataIndex: 'products',
      render: (_, { products }) => (
        <>
          {
            products.map((product) => {
              return <div>
                <Link to={`/admin/singleproduct/${product.productId}`}><p>{product.productId}</p></Link>
                <p>Quantity = x{product.quantity}</p>
                <p>Variable = x{product.variable}</p>
                <hr />
              </div>
            })
          }
        </>
      ),
    },
  ];
  
  useEffect(() => {
    const getOrders = async () => {
      const data = await axios.get('http://localhost:8000/api/orders', {
        headers: { token: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      setData(data.data)
      console.log(data.data)
    }
    getOrders()
  }, [])
  return (
    <div>
      {
        data && <Table columns={columns} dataSource={data} />
      }
    </div>

  )
}

export default Orders
