import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import axios from 'axios';

import './Responsive.css';
import socket from './socket';
import ic_close from '../../../src/img/ic-close.png';
import img_gift_pc from '../../../src/img/img_gift_pc.png';
import bg_product from '../../../src/img/bg_product.png';
import img_product01 from '../../../src/img/img_product01.png';
import arrow_down from '../../../src/img/arrow-down.png';

import useParticipants from '../../hooks/useParticipants/useParticipants';
// import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
// require('dotenv').config();

const listData = [
  {
    title: 'ドン・ペリニヨン',
    img: img_product01,
    price: '100ポイント',
  },
  {
    title: 'ヴーヴ ・クリコ -イエローラベル-',
    img: img_product01,
    price: '200ポイント',
  },
  {
    title: 'カフェ・ド・パリ',
    img: img_product01,
    price: '300ポイント',
  },
  {
    title: 'ドン・ペリニヨン (白)',
    img: img_product01,
    price: '400ポイント',
  },
];

const BoxListGift = ({ onClickBoxClose }) => {
  let [listParticipants, setListParticipants] = useState([{ identity: 'loading...', sid: 'null' }]);
  let [hideOptions, setHideOptions] = useState(false);
  let [userSelected, setUserSelected] = useState('Select an username');
  const participants = useParticipants();

  const handleClickGift = (title, price) => {
    if (userSelected !== 'Select an username') {
      socket.emit('send-gift', {
        from: sessionStorage.getItem('username'),
        to: userSelected,
        gift: {
          name: title,
          price,
        },
      });
      alert('Success!');
    }
  };

  useEffect(() => {
    let roomName = sessionStorage.getItem('roomName');
    // set item username to sessionStorage in /src/state/index.tsx (line 63)
    let username = sessionStorage.getItem('username');
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/participants?roomName=${roomName}`,
    }).then(response => {
      // eslint-disable-next-line no-shadow
      let participants = [];
      for (let i of response.data.participants) {
        if (i.identity !== username) {
          participants.push(i);
        }
      }
      setUserSelected('Select an username');
      setListParticipants(participants);
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
            top: '80px',
          }}
        >
          <DropDown onClick={() => setHideOptions(!hideOptions)}>
            {userSelected}
            <img
              src={arrow_down}
              alt="arrow down"
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translate(-50%,-50%)' }}
            />
            {hideOptions && (
              <ul style={{ margin: 0, padding: 0, height: 'auto', position: 'absolute', left: '-1px' }}>
                {listParticipants.map(participant => (
                  <ParticipantItem
                    name={participant.identity}
                    onClick={() => setUserSelected(participant.identity)}
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
  borderColor: '#000',
  borderStyle: 'solid',
  borderWidth: '2px',
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
  backgroundColor: '#fff',
  cursor: 'pointer',
  color: '#000',
  height: '30px',
  lineHeight: '30px',
  margin: '5px 0',
  border: '1px solid #000',
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
  height: '380px',
  transform: `translate(-50%,-50%)`,
  borderRadius: '10px',
});

const Title = styled('span')({
  position: 'absolute',
  top: '-165px',
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
