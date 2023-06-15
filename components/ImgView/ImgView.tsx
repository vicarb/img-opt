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
        <div key={product.id} className="relative h-[33vh]">
          <Image
            src={product.mainImage}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
          {product.extraImages.map((image, index) => (
            <div key={index} className="relative h-[33vh]">
              <Image
                src={image}
                alt={`${product.name} extra image`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
