import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';

import ParticipantStrip from '../ParticipantStrip/ParticipantStrip';
import MainParticipant from '../MainParticipant/MainParticipant';
import BoxIconGift from './BoxIconGift';
import BoxListGift from './BoxListGift';
import socket from './socket';

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

export default function Room() {
  let [containerGift, setContainerGift] = useState(false);

  useEffect(() => {
    socket.on('data-gift-from-server', function(data: any) {
      let { from, to } = data;
      if (to === localStorage.getItem('username')) {
        console.log(`${from} send a gift to you!! tadaaaa`);
      }
    });
  }, []);

  return (
    <Container>
      <BoxIconGift onClick={() => setContainerGift(!containerGift)} />
      {containerGift && <BoxListGift onClickBoxClose={() => setContainerGift(false)} />}
      <ParticipantStrip />
      <MainParticipant />
    </Container>
  );
}
