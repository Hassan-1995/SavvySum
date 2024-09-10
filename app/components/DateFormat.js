import React from "react";

import { View, StyleSheet } from "react-native";

function DateFormat(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Get day suffix (st, nd, rd, th)
  const daySuffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  // Format hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Format time string
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  //   const timeString = `${hours}:${formattedMinutes}${ampm}`;

  //   return `${day}${daySuffix} ${month} ${year} ${timeString}`;
  return `${day}${daySuffix} ${month} ${year}`;
}

const styles = StyleSheet.create({
  container: {},
});

export default DateFormat;
