import React from 'react';
import { styled } from '@material-ui/core/styles';
import boxIconImg from '../../../src/img/icon_gift.png';

const BoxIconGift = ({ onClick }) => {
  return (
    <BoxIcon onClick={onClick}>
      <img src={boxIconImg} alt="Box Icon Img" />
    </BoxIcon>
  );
};

const BoxIcon = styled('div')({
  position: 'absolute',
  bottom: '1.5rem',
  right: '10rem',

  width: 'auto',
  height: 'auto',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '50%',
  zIndex: 100,
  cursor: 'pointer',
});

export default BoxIconGift;
