import React from 'react'

const ProductTable = ({ products, onQuantityChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table mt-10 w-full">
        <thead>
          <tr>
            <th>PRODUCTS</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price ? product.price.toFixed(2) : '0.00'}</td>
              <td>
                <div className="btn-group flex gap-2">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => onQuantityChange(product.id, (product.quantity || 0) - 1)}
                  >
                    -
                  </button>
                  <button className="btn btn-sm">{product.quantity || 0}</button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => onQuantityChange(product.id, (product.quantity || 0) + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${((product.price || 0) * (product.quantity || 0)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ProductTable
