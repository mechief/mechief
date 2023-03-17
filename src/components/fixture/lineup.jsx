import React, { useState, useMemo, useLayoutEffect, memo } from "react";
import styled from "styled-components";

import LineupPlayer from "./lineupPlayer";

import { LineupWrapper } from "./fixtureStyled";

const LineupSubst = styled.div`
  margin-top: 40px;
`;

const playerEventDefault = {goal: 0, assist: 0, yellow: false, red: false};

const Lineup = memo(({ lineup, events }) => {
  const [playingLineup, setPlayingLineup] = useState([]);
  const [substLineup, setSubstLineup] = useState([]);
  const [substOutLineup, setSubstOutLineup] = useState([]);
  // const [eventVars, setEventVars] = useState([]);
  const [playerEvents, setPlayerEvents] = useState({});

  const eventSubsts = useMemo(() => {
    return events.filter(v => {
      return v.type === 'subst';
    });
  }, [events]);
  
  const eventGoals = useMemo(() => {
    return events.filter(v => {
      return v.type === 'Goal' && v.comments !== 'Penalty Shootout';
    });
  }, [events]);

  const eventCards = useMemo(() => {
    return events.filter(v => {
      return v.type === 'Card';
    });
  }, [events]);

  // 선수 교체 반영
  useLayoutEffect(() => {
    if (eventSubsts.length > 0) {
      const newPlayingLineup = [...lineup.startXI];
      const newSubstLineup = [...lineup.substitutes];
      const newSubstOutLineup = [];
  
      eventSubsts.forEach(substEvent => {
        const subInIndex = lineup.substitutes.findIndex(substPlayer => {
          return substPlayer.player.id === substEvent.assist.id; // subst in (assist: 투입 선수)
        });
        const subOut = newPlayingLineup.splice(newPlayingLineup.findIndex(v => {
          return v.player.id === substEvent.player.id; // subst out
        }), 1, lineup.substitutes[subInIndex]);
  
        newSubstLineup.splice(subInIndex, 1);
        newSubstOutLineup.push(subOut[0]);
      });
  
      setPlayingLineup(() => newPlayingLineup);
      setSubstLineup(() => newSubstLineup);
      setSubstOutLineup(() => newSubstOutLineup);
    }
  }, [eventSubsts]);

  // 득점, 도움, 경고, 퇴장 반영
  useLayoutEffect(() => {
    setPlayerEvents(() => {
      let playerEvent = {};

      eventGoals.forEach(v => {
        playerEvent[v.player.id] = playerEvent[v.player.id] ?? {...playerEventDefault};
        playerEvent[v.player.id].goal++;

        if (v.assist.id) {
          playerEvent[v.assist.id] = playerEvent[v.assist.id] ?? {...playerEventDefault};
          playerEvent[v.assist.id].assist++;
        }
      });

      eventCards.forEach(v => {
        playerEvent[v.player.id] = playerEvent[v.player.id] ?? {...playerEventDefault};

        if (v.detail === 'Yellow Card') {
          playerEvent[v.player.id].yellow = true;
        } else if (v.detail === 'Red Card') {
          playerEvent[v.player.id].red = true;
        }
      });

      return playerEvent;
    });
  }, [eventGoals, eventCards]);

  return (
    <LineupWrapper>
      <div>
        {playingLineup.map(v => 
          <LineupPlayer key={v.player.id} player={v.player} playerEvent={playerEvents[v.player.id]} />
        )}
      </div>
      <LineupSubst>
        <p>교체 명단</p>
        {substLineup.length > 0 && (
          <>
            {substLineup.map(v => 
              <LineupPlayer key={v.player.id} player={v.player} />
            )}
            {substOutLineup.map(v => 
              <LineupPlayer key={v.player.id} player={v.player} playerEvent={playerEvents[v.player.id]} isSubstOut={true} />
            )}
          </>
        )}
      </LineupSubst>
    </LineupWrapper>
  );
});

export default Lineup;