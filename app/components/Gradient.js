import React from "react";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { StyleSheet } from "react-native";

function Gradient({
  color1 = "red",
  color2 = "yellow",
  offset1 = "0%",
  offset2 = "100%",
  borderRadius = 0,
  width = "100%",
  height = "100%",
}) {
  return (
    <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset={offset1} stopColor={color1} stopOpacity="1" />
          <Stop offset={offset2} stopColor={color2} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#grad)"
        rx={borderRadius}
        ry={borderRadius}
      />
    </Svg>
  );
}

export default Gradient;
