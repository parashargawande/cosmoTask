import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";

interface CrossPlatformDatePickerProps {
  setShowDtPicker: (show: boolean) => void;
  setValue: (field: any, value: string) => void; // Accept any for field to match react-hook-form
  dateTime: Date;
  setDateTime: (date: Date) => void;
  mode: "date" | "time";
  fieldName: string; // Accept string
}

const CrossPlatformDatePicker = ({
  setShowDtPicker,
  setValue,
  dateTime,
  setDateTime,
  mode,
  fieldName,
}: CrossPlatformDatePickerProps) => {
  if (Platform.OS === "web") {
    if (mode === "date") {
      return (
        <input
          type="date"
          value={dateTime.toISOString().substring(0, 10)}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value + "T" + dateTime.toISOString().substring(11, 19));
            setShowDtPicker(false);
            setDateTime(selectedDate);
            setValue(fieldName, selectedDate.toISOString());
          }}
          style={{
            padding: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />
      );
    } else if (mode === "time") {
      return (
        <input
          type="time"
          value={dateTime.toISOString().substring(11, 16)}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":");
            const selectedDate = new Date(dateTime);
            selectedDate.setHours(Number(hours));
            selectedDate.setMinutes(Number(minutes));
            setShowDtPicker(false);
            setDateTime(selectedDate);
            setValue(fieldName, selectedDate.toISOString());
          }}
          style={{
            padding: 10,
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />
      );
    }
  }

  // Native (iOS/Android)
  return (
    <DateTimePicker
      value={dateTime}
      mode={mode}
      display="default"
      onChange={(event, selectedDate) => {
        setShowDtPicker(false);
        if (selectedDate) {
          setDateTime(selectedDate);
          setValue(fieldName, selectedDate.toISOString());
        }
      }}
    />
  );
};

export default CrossPlatformDatePicker;
