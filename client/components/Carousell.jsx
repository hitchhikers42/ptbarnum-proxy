import React from 'react';
import { CarousellStyle } from './styles/CarousellStyle.jsx';
import { Thumbnail } from './Thumbnail.jsx';

export const Carousell = ({ images, handleClick, selected, showModal }) => (
  <CarousellStyle>
    {images.map((image, i) =>
      <Thumbnail
        id={i}
        image={image}
        selected={selected === image}
        handleClick={handleClick}
        showModal={showModal}
        key={i}
      />)
    }
  </CarousellStyle>
)