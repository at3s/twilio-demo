import React from 'react';
import { styled } from '@material-ui/core/styles';

import happy from '../../../src/img/happy.png';
import ic_close from '../../../src/img/ic-close.png';

const ReceiveGift = ({ from, to, gift, onClick }) => {
  return (
    <Container id="received-gift">
      <div style={wrapStyle}>
        <BoxClose id="toggle-received-gift" onClick={() => onClick()}>
          <img src={ic_close} alt="button close" />
        </BoxClose>
        <Title id="received-gift-img">
          <img style={{ width: '120%' }} src={happy} alt="happy" />
        </Title>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '32px' }}>
          <Content>
            <Text>You received</Text>
            <span style={{ fontSize: '34px' }}>{`${gift.name} (${gift.price})`}</span>
            <Text>from {`${from}`}</Text>
          </Content>
          <Button onClick={() => onClick()}>OK</Button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',

  backgroundColor: '#fff',

  zIndex: 110,

  width: '370px',
  height: '550px',
  transform: `translate(-50%,-50%)`,
  borderRadius: '10px',
});

const wrapStyle = {
  padding: '32px',
  position: 'relative',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'transparent',
};

const BoxClose = styled('span')({
  position: 'absolute',
  right: '-10px',
  top: '-10px',
  zIndex: 112,
  cursor: 'pointer',
});

const Title = styled('span')({
  position: 'absolute',
  top: '-100px',
  left: '-10%',
  width: '100%',
  textAlign: 'center',
  zIndex: 111,
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  bottom: 0,
  left: 0,
  width: '100%',
  textAlign: 'center',
  color: '#000',
});

const Button = styled('button')({
  border: 'none',
  borderRadius: '3em',
  width: '100%',
  textAlign: 'center',
  background: '#E63946',
  color: '#FFF',
  display: 'block',
  padding: '12px 0',
  textDecoration: 'none',
  fontSize: '139%',
  textTransform: 'uppercase',
  userSelect: 'none',
  outline: 'none',
  cursor: 'pointer',
});

const Text = styled('span')({
  fontSize: '24px',
});

export default ReceiveGift;
