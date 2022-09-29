export function selectBackgroundColor(isActive, canDrop) {
  if (isActive) {
    return "#c4c5c6";
  } else if (canDrop) {
    return "#E5E7EB";
  } else {
    return "inherit";
  }
}
