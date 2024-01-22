import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import ImgsViewer from "react-images-viewer";

function ImageCarousel() {
  const [isCarouselOpen, setCarousel] = useState(false);
  const [currImgIndex, setCurrImgIndex] = useState(0);
  const parentThumbnailRef = useRef(null);
  const [parentThumbnailWidth, setParentThumbnailWidth] = useState(0);

  useEffect(() => {
    const updateParentWidth = () => {
      if (parentThumbnailRef.current) {
        const width = parentThumbnailRef.current.offsetWidth;
        setParentThumbnailWidth(width);
      }
    };

    updateParentWidth();
    window.addEventListener("resize", updateParentWidth);
    return () => {
      window.removeEventListener("resize", updateParentWidth);
    };
  }, []);

  const images = [
    {
      src: "https://dam.thdstatic.com/content/production/QYgI-ORJqCQwTZLsCbAaDg/C1U7R9B38mcWM1cxCyLBdw/Original%20file/types-of-flooring-2023-section-1.jpg",
    },
    {
      src: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tfGVufDB8fDB8fHww",
    },
    {
      src: "https://media.istockphoto.com/id/666476790/photo/bananas-on-blue-background.jpg?s=612x612&w=0&k=20&c=_34S-FIpPYgvmgVKu3wv3d3bpp_iyw3iUMAZnlb94AM=",
    },
    {
      src: "https://media.istockphoto.com/id/1295274245/photo/random-multicolored-spheres-computer-generated-abstract-form-of-large-and-small-balls-3d.jpg?s=612x612&w=0&k=20&c=q7NOl28YxIIOqKu6em50VlKrg6ISFyVww_nLOCr5W_A=",
    },
  ];

  const onClickNextArrow = (e) => {
    setCurrImgIndex((currImgIndex + 1) % images.length);
  };

  const onClickPrevArrow = (e) => {
    setCurrImgIndex((currImgIndex - 1 + images.length) % images.length);
  };

  const onClickFromMiniThumbnail = (imgIndex) => {
    setCurrImgIndex(imgIndex);
  };

  const onOpen = (e) => {
    setCarousel(true);
  };

  const onClose = (e) => {
    setCarousel(false);
  };

  return (
    <>
      <ThumbnailWrapper>
        <Thumbnail
          src={images[currImgIndex].src}
          alt={"flooring iamge"}
          onClick={onOpen}
          ref={parentThumbnailRef}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MiniThumbnailCarousel
            style={{ width: `${parentThumbnailWidth * 0.8}px` }}
          >
            {images.map((image, index) => {
              if (index !== currImgIndex) {
                return (
                  <img
                    src={image.src}
                    alt={`flooring-${index}`}
                    key={`image-number${index}`}
                    style={{ width: "4rem", cursor: "pointer" }}
                    onClick={() => {
                      onClickFromMiniThumbnail(index);
                    }}
                  />
                );
              }
            })}
          </MiniThumbnailCarousel>
        </div>
      </ThumbnailWrapper>
      <ImgsViewer
        imgs={images}
        isOpen={isCarouselOpen}
        currImg={currImgIndex}
        onClose={onClose}
        preloadNextImg={true}
        showImgCount={true}
        onClickPrev={onClickPrevArrow}
        onClickNext={onClickNextArrow}
        width={500}
        backdropCloseable={true}
      />
    </>
  );
}

const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1rem;
  width: 300px;
`;

const Thumbnail = styled.img`
  cursor: pointer;
`;

const MiniThumbnailCarousel = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  justify-content: space-betweeen;

  gap: 0.5rem;
`;

export default ImageCarousel;
