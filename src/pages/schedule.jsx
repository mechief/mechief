import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";

import ScheduleControlAside from "../components/schedule/scheduleControlAside";
import ScheduleListSection from "../components/schedule/scheduleListSection";

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1 1 auto;
`;

const Schedule = () => {
  const params = useParams();
  const [isScrollToFocus, setIsScrollToFocus] = useState(false);

  const focusDate = useMemo(() => {
    setIsScrollToFocus(true);
    return params.date && dayjs(params.date, 'YYYYMMDD').isValid() 
      ? dayjs(params.date, 'YYYYMMDD').format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD');
  }, [params.date]);

  return (
    <ScheduleContainer>
      <ScheduleControlAside focusDate={focusDate} />
      <ScheduleListSection 
        focusDate={focusDate} 
        isScrollToFocus={isScrollToFocus} 
        setIsScrollToFocus={setIsScrollToFocus}
      />
    </ScheduleContainer>
  );
}

export default Schedule;