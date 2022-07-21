import './App.css';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useCallback,useEffect,useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
function App() {
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };
  const localizer = momentLocalizer(moment);
  // const localizer = dateFnsLocalizer({
  //   format,
  //   parse,
  //   startOfWeek,
  //   getDay,
  //   locales,
  // });
  // const current = new Date();
  // const date = `${current.getFullYear()}/${
  //   current.getMonth() + 1
  // }/${current.getDate()}`;
  // console.log(date);
  // const today = `2022/7/18`;
  //  cách định dạng ngày tháng đúng trong hàm date
  // const events = [
  //   {
  //     title: "Big Meeting",
  //     allDay: false,
  //     start: today,
  //     end_time: new Date(2022, 6, 20),
  //   },
  //   {
  //     title: "Vacation",
  //     start: new Date(2022, 6, 7, 3, 15),
  //     end: new Date(2022, 6, 7, 22, 20),
  //   },
  //   {
  //     title: "Conference",
  //     start: new Date(2022, 6, 20),
  //     end: new Date(2022, 6, 23),
  //   },
  // ];
  const [allEvents, setAllEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start_time: "",
    end_time  : "",
  });
  const getData = () => {
    axios.get(`http://127.0.0.1:8000/api/lessons`)
      .then((res) => { 
        console.log(res.data)
        setAllEvents(res.data);

      })
      .catch((error) => console.log(error));
  };
   

   
  function handleAddEvent() {
    console.log(newEvent);
    setAllEvents([...allEvents, newEvent]);
    axios
      .post("http://127.0.0.1:8000/api/lessons", {
        title: newEvent.title,
        start_time: newEvent.start_time,
        end_time: newEvent.end_time,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getData();
  }, [newEvent]);
  const handleSelectEvent = useCallback((event) => window.alert(event.name),[]);
  return (
    <div className="App">
      <div>
        <input
          type="text"
          name="content"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="start day"
          name="start"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.start}
          onChange={(e) =>
            setNewEvent({ ...newEvent, start_time: e.target.value })
          }
        />
        <input
          type="datetime-local"
          name="end"
          placeholder="End Date "
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.end}
          onChange={(e) =>
            setNewEvent({ ...newEvent, end_time: e.target.value })
          }
        />
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        views={["day", "agenda", "work_week", "month"]}
        selectable={true}
        startAccessor="start_time"
        // defaultView="day"
        endAccessor="end_time"
        style={{ height: 500, margin: "50px" }}
        // defaultView={Views.DAY}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}

export default App;
