import React from 'react';
import { ThumbnailStyle } from './styles/ThumbnailStyle.jsx';

export const Thumbnail = ({ image, handleClick, id, selected, showModal }) => (
  <ThumbnailStyle
  src={image}
  onClick={() => handleClick(id, showModal)}
  style={ selected ? { boxShadow: '0 0 5px black'} : {}} />
)

