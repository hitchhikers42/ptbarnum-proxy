import React from 'react';
import { Carousell } from './Carousell.jsx';
import { ImageStyle, ModalStyle } from './styles/ModalStyle.jsx';

export const ImageModal = ({ image, images, visible, handleClick, hideModal }) => (
  <ModalStyle
    onClick={hideModal}
    style={visible ? {display:''} : { display: 'none'}}>

    <ImageStyle
      src={image} />

    <Carousell
      images={images}
      handleClick={handleClick}
      showModal={true}/>

  </ModalStyle>

)