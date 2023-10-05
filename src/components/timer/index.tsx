import React, { useEffect, useState } from "react";
import { PiWatchDuotone } from "react-icons/pi";

const ContentBoxStyle: React.CSSProperties = {
  width: "270px",
  height: "100px",
  backgroundColor: "white",
  borderRadius: "25px",
  margin: "0 auto",
  padding: "20px",
  color: "black",
  boxShadow: "1px 1px 1px 1px gainsboro ",
};

const EventTextStyle: React.CSSProperties = {
  margin: "0",
  fontSize: "13px",
  opacity: "40%",
  fontWeight: "600",
};

const TimeTextStyle: React.CSSProperties = {
  margin: "0",
  fontSize: "20px",
  fontWeight: "600",
};

type TimerTextProps = {
  eventText: string;
  timeText: string;
};

const TimerText = ({ eventText, timeText }: TimerTextProps) => {
  return (
    <span style={{ display: "flex", flexDirection: "column" }}>
      <p style={EventTextStyle}>{eventText}</p>
      <p style={TimeTextStyle}>{timeText}</p>
    </span>
  );
};

const Timer = () => {
  const [updateState, setUpdateState] = useState({
    lunchTime: "-",
    homeTime: "-",
  });

  useEffect(() => {
    setInterval(() => {
      const now = new Date();

      const hour = now.getHours();
      const minute = now.getMinutes();

      let lunchTimeHour = 12 - hour;
      let lunchTimeMinute = 30 - minute;
      if (lunchTimeMinute < 0) {
        lunchTimeMinute += 60;
        lunchTimeHour -= 1;
      }

      let homeTimeHour = 16 - hour;
      let homeTimeMinute = 10 - minute;
      if (homeTimeMinute < 0) {
        homeTimeMinute += 60;
        homeTimeHour -= 1;
      }

      const lunchTime =
        hour >= 0 && hour < 12
          ? `${lunchTimeHour}시간 ${lunchTimeMinute}분`
          : minute < 30
          ? `${lunchTimeHour}시간 ${lunchTimeMinute}분`
          : "-";

      const homeTime =
        hour >= 0 && hour < 16
          ? `${homeTimeHour}시간 ${homeTimeMinute}분`
          : minute < 10
          ? `${homeTimeHour}시간 ${homeTimeMinute}분`
          : "-";

      //수정해야할것 : 각각 1시 20분, 4시 10분에 " - " 로 바뀌게 수정해야함 / 현재 각각 1시, 4시에 바뀜

      setUpdateState({ lunchTime, homeTime });
    }, 1000);
  }, []);

  return (
    <div style={ContentBoxStyle}>
      <div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "900",
          }}
        >
          <PiWatchDuotone size={40} />
          타이머
        </span>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <TimerText
            eventText="점심시간까지"
            timeText={updateState.lunchTime}
          />
          <TimerText
            eventText="집에 가기까지"
            timeText={updateState.homeTime}
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
