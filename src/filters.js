import Vue from "vue";

Vue.filter("money", function(value) {
  if (typeof value !== "number") return value;
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return formatter.format(value);
});

Vue.filter("hour", function(value) {
  if (typeof value !== "number") return value;
  let hours = Math.floor(value / 60);
  let minutes = value % 60;
  return `${hours}:${minutes}h`;
});

Vue.filter("formattedText", function(value) {
  let newValue = value.replace(/[/_]/g, " "); // replace _ and /
  return newValue;
});

Vue.filter("date", function(value) {
  let date = value.replace(/[-]/g, "/"); // replace - with /
  return date;
});
