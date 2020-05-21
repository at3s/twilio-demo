import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';

import ParticipantStrip from '../ParticipantStrip/ParticipantStrip';
import MainParticipant from '../MainParticipant/MainParticipant';
import BoxIconGift from './BoxIconGift';
import BoxListGift from './BoxListGift';
import socket from './socket';
import ReceiveGift from './ReceiveGift';

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `${theme.sidebarWidth}px 1fr`,
  gridTemplateAreas: '". participantList"',
  gridTemplateRows: '100%',
  [theme.breakpoints.down('xs')]: {
    gridTemplateAreas: '"participantList" "."',
    gridTemplateColumns: `auto`,
    gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${theme.sidebarMobileHeight + 6}px`,
    gridGap: '6px',
  },
}));

interface GiftDataType {
  from: String;
  to: String;
  gift: {
    name: String;
    price: String;
  };
}

let giftData: GiftDataType;
let setGiftData: any;

export default function Room() {
  let [containerGift, setContainerGift] = useState(false);
  [giftData, setGiftData] = useState<GiftDataType>({
    from: '',
    to: '',
    gift: {
      name: '',
      price: '',
    },
  });
  let [receivedGiftBox, setReceivedGiftBox] = useState(false);
  useEffect(() => {
    socket.on('data-gift-from-server', function(data: any) {
      setGiftData(data);
      if (giftData.to === sessionStorage.getItem('username')) {
        setReceivedGiftBox(true);
        setContainerGift(false);
      }
    });
  }, []);

  let closeReceivedGift = () => {
    setReceivedGiftBox(false);
    setContainerGift(false);
  };

  return (
    <Container>
      <BoxIconGift onClick={() => setContainerGift(!containerGift)} />
      {containerGift && <BoxListGift onClickBoxClose={() => setContainerGift(false)} />}
      {receivedGiftBox && (
        <ReceiveGift from={giftData.from} to={giftData.to} gift={giftData.gift} onClick={closeReceivedGift} />
      )}
      <ParticipantStrip />
      <MainParticipant />
    </Container>
  );
}
