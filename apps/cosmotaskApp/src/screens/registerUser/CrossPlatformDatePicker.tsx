import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";

const CrossPlatformDatePicker = ({
  setShowDtPicker,
  setValue,
  dateTime,
  setDateTime
}: any) => {
  const [selectedDT, setSelectedDT] = useState(new Date());

  // const handleDateChange = (date: Date) => {
  //   setShowDtPicker(false);
  //   setDob(date);
  //   setValue("dob", date.toISOString());
  // };

  // if (Platform.OS === "web") {
  //   return (
  //     <input
  //       type="date"
  //       value={dob.toISOString().substring(0, 10)}
  //       onChange={(e) => {
  //         const selectedDate = new Date(e.target.value);
  //         handleDateChange(selectedDate);
  //       }}
  //       style={{
  //         padding: 10,
  //         borderRadius: 5,
  //         border: "1px solid #ccc",
  //       }}
  //     />
  //   );
  // }

  return (
    <DateTimePicker
      value={dateTime}
      mode="date"
      display="default"
      onChange={(event, selectedDate) => {
        setShowDtPicker(false);
        if (selectedDate) {
          setDateTime(selectedDate);
          setValue("dob", selectedDate.toISOString());
        }
      }}
    />
  );
};

export default CrossPlatformDatePicker;
