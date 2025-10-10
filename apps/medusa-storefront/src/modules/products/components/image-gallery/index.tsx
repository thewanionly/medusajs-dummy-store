import Image from 'next/image';

import { ProductImage } from '@lib/gql/generated-types/graphql';
import { Container } from '@medusajs/ui';

type ImageGalleryProps = {
  images: ProductImage[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="relative flex items-start">
      <div className="flex flex-1 flex-col gap-y-4 small:mx-16">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 rounded-rounded"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              )}
            </Container>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
