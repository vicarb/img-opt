'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

const ImageCard = ({ src, alt }) => {
  const [springProps, setSpringProps] = useSpring(() => ({
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <animated.div 
      className="relative h-[33vh] md:h-[50vh] lg:h-[33vh] rounded-lg overflow-hidden" 
      onMouseEnter={() => setSpringProps({ scale: 1.05 })} 
      onMouseLeave={() => setSpringProps({ scale: 1 })}
      style={{
        transform: springProps.scale.to(scale => `scale(${scale})`),
      }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
      />
    </animated.div>
  );
}

export default function ImgView() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://composterasur.cl/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <>
          <ImageCard key={product.id} src={product.mainImage} alt={product.name} />
          {product.extraImages.map((image, index) => (
            <ImageCard key={index} src={image} alt={`${product.name} extra image`} />
          ))}
        </>
      ))}
    </div>
  );
}
