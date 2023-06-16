import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image';
import Modal from 'react-modal';

type ImageCardProps = {
  src: string;
  alt: string;
  onOpen: () => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onOpen }) => {
  const [springProps, setSpringProps] = useSpring(() => ({
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <animated.div
      className="relative h-[33vh] md:h-[50vh] lg:h-[33vh] rounded-lg overflow-hidden"
      onMouseEnter={() => setSpringProps({ scale: 1.05 })}
      onMouseLeave={() => setSpringProps({ scale: 1 })}
      onClick={onOpen}
      style={{
        transform: springProps.scale.to((scale) => `scale(${scale})`),
      }}
    >
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    </animated.div>
  );
};

export default ImageCard;