import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getFixture } from "../apiFootball/fixtures";
import { setFixtureId, setFixture } from "../slices/currentFixtureSlice";

import { FIXTURE_STATUS } from "../service/apiFootballService";

import FixtureDate from "../components/fixture/fixtureDate";
import FixtureLeague from "../components/fixture/fixtureLeague";
import FixtureStatus from "../components/fixture/fixtureStatus";
import FixtureEventSummary from "../components/fixture/fixtureEventSummary";
import FixtureTeam from "../components/fixture/fixtureTeam";
import FixtureScore from "../components/fixture/fixtureScore";
import FixtureDetail from "../components/fixture/fixtureDetail";
import Lineup from "../components/fixture/lineup";

import LiveSidebarButton from "../components/liveWidget/liveSidebarButton"
import LiveWidget from "../components/liveWidget/liveWidget";

import { 
  FixtureWrapper, 
  FixtureInfo, 
  FixtureSummary, 
  FixtureDetailSection,
  FixtureStatusWrapper,
  FixtureScoreWrapper,
} from "../components/fixture/fixtureStyled";

const Fixture = () => {
  const id = useSelector((state) => state.currentFixture.id);
  const date = useSelector((state) => state.currentFixture.date);
  const referee = useSelector((state) => state.currentFixture.referee);
  const status = useSelector((state) => state.currentFixture.status);
  const venue = useSelector((state) => state.currentFixture.venue);
  const goals = useSelector((state) => state.currentFixture.goals);
  const league = useSelector((state) => state.currentFixture.league);
  const lineups = useSelector((state) => state.currentFixture.lineups);
  const players = useSelector((state) => state.currentFixture.players);
  const score = useSelector((state) => state.currentFixture.score);
  const statistics = useSelector((state) => state.currentFixture.statistics);
  const events = useSelector((state) => state.currentFixture.events);
  const teams = useSelector((state) => state.currentFixture.teams);
  
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFixtureId(params.id));
  }, [params.id]);

  useEffect(() => {
    if (id) {
      getFixture(id)
        .then((res) => {
          console.log(res);
          dispatch(setFixture(res));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  // 팀별 events filter
  const teamEvents = useMemo(() => {
    return {
      home: events.filter(v => {
        return v.team.id === teams.home.id;
      }),
      away: events.filter(v => {
        return v.team.id === teams.away.id;
      })
    }
  }, [events]);
  
  return (
    <>
      <LiveSidebarButton />
      {
        id != '' && date && (  
          <FixtureWrapper>
            <FixtureInfo>
              <div><FixtureDate date={date} /></div>
              { league?.id &&
                <FixtureLeague league={league} />
              }
              { status?.short && (
                <FixtureStatusWrapper>
                  <FixtureStatus shortStatus={status.short} />
                </FixtureStatusWrapper>
              )}
            </FixtureInfo>
            <FixtureSummary>
              { teams?.home?.id && teams?.away?.id && <>
                  <FixtureTeam team={teams.home} isHome={true} />
                  <FixtureTeam team={teams.away} />
                </>
              }
              { FIXTURE_STATUS[status?.short]?.code >= 0 &&
                <FixtureScoreWrapper><FixtureScore goals={goals} score={score} shortStatus={status.short} /></FixtureScoreWrapper>
              }
              <FixtureEventSummary events={teamEvents.home} isHome={true} />
              <FixtureEventSummary events={teamEvents.away} />
            </FixtureSummary>
            { lineups[0]?.team?.id && (
              <FixtureDetailSection>
                <Lineup lineup={lineups[0]} events={teamEvents.home} />
                <FixtureDetail />
                <Lineup lineup={lineups[1]} events={teamEvents.away} />
              </FixtureDetailSection>
            )}
          </FixtureWrapper>
        )
      }
      <LiveWidget />
    </>
  );
}

export default Fixture;