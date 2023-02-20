import React, { Suspense } from "react";
import { useParams } from "react-router-dom";

import ErrorBoundary from "../components/error/errorBoundary";

import TopPlayerLeagues from "../components/topPlayer/topPlayerLeagues";
import TopPlayerData from "../components/topPlayer/topPlayerData";

import {
  TopPlayerWrapper,
  TopPlayerTitle,
} from "../components/topPlayer/topPlayerStyled";

const TopPlayers = () => {
  let leagueId = useParams().id;
  leagueId = leagueId ? +leagueId : 39;
  
  return (
    <TopPlayerWrapper>
      <TopPlayerTitle>개인 기록</TopPlayerTitle>
      <TopPlayerLeagues />
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>기록을 불러오는 중 에러가 발생했습니다.</div>}>
          <TopPlayerData leagueId={leagueId} />
        </ErrorBoundary>
      </Suspense>
    </TopPlayerWrapper>
  );
}

export default TopPlayers;