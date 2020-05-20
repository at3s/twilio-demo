import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import axios from 'axios';

import './Responsive.css';
import socket from './socket';
import ic_close from '../../../src/img/ic-close.png';
import img_gift_pc from '../../../src/img/img_gift_pc.png';
import bg_product from '../../../src/img/bg_product.png';
import img_product01 from '../../../src/img/img_product01.png';

import useParticipants from '../../hooks/useParticipants/useParticipants';
// import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
// require('dotenv').config();

const listData = [
  {
    title: 'Champage N’hnm',
    img: img_product01,
    price: '100ポイント',
  },
  {
    title: 'Champage N’hnm',
    img: img_product01,
    price: '200ポイント',
  },
  {
    title: 'Champage N’hnm',
    img: img_product01,
    price: '300ポイント',
  },
  {
    title: 'Champage N’hnm',
    img: img_product01,
    price: '400ポイント',
  },
  {
    title: 'Champage N’hnm',
    img: img_product01,
    price: '500ポイント',
  },
  {
    title: 'Champage N’hnm',
    img: img_product01,
    price: '600ポイント',
  },
  {
    title: 'Champage N’hnm',
    img: img_product01,
    price: '700ポイント',
  },
  {
    title: 'Champage N’hnm',
    img: img_product01,
    price: '800ポイント',
  },
];

const BoxListGift = ({ onClickBoxClose }) => {
  let [listParticipants, setListParticipants] = useState([{ identity: 'loading...', sid: 'null' }]);
  let [hideOptions, setHideOptions] = useState(false);
  let [userSelected, setUserSelected] = useState('Select an user');
  let [giftSelected, setGiftSelected] = useState(null);
  const participants = useParticipants();

  const handleClickGift = (title, price) => {
    alert(`${title}, ${price}  was selected,select user to send gift!`);
    setGiftSelected({ name: title, price });
  };

  const handleSendGift = identity => {
    // set item username to localStorage in /src/state/index.tsx (line 63)
    if (identity === localStorage.getItem('username')) {
      alert('Please select another username!');
      return;
    }
    setUserSelected(identity);

    if (!giftSelected) {
      alert('Please select a gift to send!');
      return;
    }
    alert('Success!');
    socket.emit('send-gift', { from: localStorage.getItem('username'), to: identity, gift: giftSelected });
  };

  useEffect(() => {
    let url = window.location.href.split('/');
    let roomName = url[url.length - 1];
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/participants?roomName=${roomName}`,
    }).then(response => {
      setListParticipants(response.data.participants);
    });
  }, [participants]);

  return (
    <Container id="box-list-gift">
      <div style={wrapStyle}>
        <BoxClose id="btn-close-list-gift" onClick={onClickBoxClose}>
          <img src={ic_close} alt="button close" />
        </BoxClose>
        <Title id="box-list-gift-img">
          <img src={img_gift_pc} alt="img_gift_pc" />
        </Title>
        <div
          id="select-user"
          style={{
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: '100px',
          }}
        >
          <DropDown onClick={() => setHideOptions(!hideOptions)}>
            {userSelected}
            {hideOptions && (
              <ul style={{ margin: 0, padding: 0, height: 'auto', position: 'absolute' }}>
                {listParticipants.map(participant => (
                  <ParticipantItem
                    name={participant.identity}
                    onClick={() => handleSendGift(participant.identity)}
                    key={participant.sid}
                  />
                ))}
              </ul>
            )}
          </DropDown>
        </div>
        <ListGift id="list-gift">
          <ul
            style={{
              padding: '0 32px 32px 32px',
              marginTop: 50,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {listData.map(({ title, img, price }, index) => (
              <Item title={title} img={img} price={price} key={index} onClick={() => handleClickGift(title, price)} />
            ))}
          </ul>
        </ListGift>
      </div>
    </Container>
  );
};

const Item = ({ title, img, price, onClick }) => {
  return (
    <ItemStyle onClick={onClick}>
      <h4 style={{ color: '#000', margin: 0 }}>{title}</h4>
      <span>
        <img style={{ width: '80px', height: '100px' }} src={img} alt="gift" />
      </span>
      <span>{price}</span>
    </ItemStyle>
  );
};

const ParticipantItem = ({ name, onClick }) => {
  return (
    <OPTION value={name} onClick={onClick}>
      {name}
    </OPTION>
  );
};

const DropDown = styled('div')({
  position: 'relative',
  zIndex: 123,
  textAlign: 'center',
  height: 'auto',
  minHeight: '35px',
  width: '300px',
  borderColor: '#ccc',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderRadius: '8px',
  color: '#000',
  lineHeight: '35px',
  userSelect: 'none',
  cursor: 'pointer',
  fontSize: '20px',
});

const OPTION = styled('li')({
  top: '35px',
  width: '300px',
  left: 0,
  listStyleType: 'none',
  backgroundColor: '#e0e0e0',
  cursor: 'pointer',
  color: '#000',
  height: '30px',
  lineHeight: '30px',
  margin: '5px 0',
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

const Container = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',

  backgroundColor: '#fff',

  zIndex: 110,

  width: '880px',
  height: '580px',
  transform: `translate(-50%,-50%)`,
  borderRadius: '10px',
});

const Title = styled('span')({
  position: 'absolute',
  top: '-100px',
  width: '100%',
  textAlign: 'center',
  zIndex: 111,
});

const BoxClose = styled('span')({
  position: 'absolute',
  right: '-10px',
  top: '-10px',
  zIndex: 112,
  cursor: 'pointer',
});

const ListGift = styled('div')({
  position: 'absolute',
  top: '100px',
  left: 0,
  width: '100%',
  height: '100%',
});

const ItemStyle = styled('li')({
  width: '183px',
  height: '183px',

  textAlign: 'center',

  padding: '10px',
  marginBottom: '35px',
  borderRadius: '20px',

  background: `url(${bg_product}) no-repeat center bottom #F2F2F2`,
  backgroundSize: '100% auto',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer',
  zIndex: 113,
});

// const Action = styled('div')({

// })

export default BoxListGift;
