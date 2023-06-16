'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSpring, animated } from '@react-spring/web';
import Modal from 'react-modal';

type ImageCardProps = {
  src: string;
  alt: string;
};
type Product = {
  id: string;
  mainImage: string;
  name: string;
  extraImages: string[];
};

const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  const [springProps, setSpringProps] = useSpring(() => ({
    opacity: 0.7,
    config: { duration: 250 },
  }));

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <animated.div
      className="relative h-[33vh] md:h-[50vh] lg:h-[33vh] rounded-lg overflow-hidden"
      onMouseEnter={() => setSpringProps({ opacity: 1.0 })}
      onMouseLeave={() => setSpringProps({ opacity: 0.7 })}
      onClick={() => setModalIsOpen(true)}
      style={{
        opacity: springProps.opacity,
      }}
    >
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          content: {
            position: 'relative',
            inset: 'auto',
            width: '80%',
            height: '80%',
            overflow: 'hidden', // prevent scrolling
          },
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            color: '#000',
            cursor: 'pointer',
            zIndex: 10,
          }}
          onClick={(event) => {
            event.stopPropagation();
            closeModal();
          }}
        >
          ×
        </button>
        <Image src={src} alt={alt} layout="fill" objectFit="contain" />
      </Modal>
    </animated.div>
  );
};

export default function ImgView() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://composterasur.cl/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product: Product) => (
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