import React from 'react';
import Magnify from 'react-image-magnify';
import { MainImageStyle, Wish, TooltipStyle } from './styles/MainImageStyle.jsx'

export const MainImage = ({ handleClick, image, w, h })=> {
  return (
    <div>
      <Wish data-tip='Add to Idea Board'>♡</Wish>
      <TooltipStyle style='font-size:24px' place="bottom" type="dark" effect="solid"/>
      <MainImageStyle onClick={handleClick}>

        <Magnify {...{
          smallImage: {
            isFluidWidth: true,
            src: image
          },
          largeImage: {
            src: image,
            width: w,
            height: h
          },

          enlargedImagePosition: 'over'
      }}
      />
      </MainImageStyle>
    </div>
  )

};
