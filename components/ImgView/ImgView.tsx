'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImgView() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://composterasur.cl/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id}>
          <Image
            src={product.mainImage}
            alt={product.name}
            width={500}
            height={500}
            layout="responsive"
            className="object-cover h-[33vh]"
          />
          {product.extraImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${product.name} extra image`}
              width={500}
              height={500}
              layout="responsive"
              className="object-cover h-[33vh]"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
