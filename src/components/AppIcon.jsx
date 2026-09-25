import React from "react";

const ICONS = {
  award: "award",
  barChart: "bar-chart",
  bell: "bell",
  calendar: "calendar3",
  calendarCheck: "calendar-check",
  chart: "graph-up",
  check: "check",
  checkCircle: "check-circle-fill",
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right",
  clock: "clock",
  creditCard: "credit-card",
  download: "download",
  dumbbell: "dumbbell",
  eye: "eye",
  eyeOff: "eye-slash",
  fileText: "file-text",
  filter: "funnel",
  flame: "fire",
  gauge: "speedometer2",
  home: "house",
  info: "info-circle",
  key: "key",
  grid: "grid",
  listFilter: "filter",
  logOut: "box-arrow-right",
  mail: "envelope",
  mapPin: "geo-alt",
  menu: "list",
  more: "three-dots",
  edit: "pencil",
  phone: "telephone",
  plus: "plus",
  qrCode: "qr-code",
  receipt: "receipt",
  scanLine: "upc-scan",
  search: "search",
  settings: "gear",
  share: "share",
  sliders: "sliders",
  star: "star-fill",
  trash: "trash",
  trending: "graph-up-arrow",
  user: "person",
  userPlus: "person-plus",
  users: "people",
  x: "x",
  help: "question-circle",
  clipboardCheck: "clipboard-check",
  clipboardList: "clipboard2-check",
  card: "credit-card",
};

const AppIcon = ({ name, size = 18, className = "", ...props }) => {
  const iconName = ICONS[name] || "info-circle";

  return (
    <i
      className={`bi bi-${iconName} ${className}`.trim()}
      style={{ fontSize: size, lineHeight: 1, display: "inline-flex", ...props.style }}
      aria-hidden="true"
      {...props}
    />
  );
};

export default AppIcon;
