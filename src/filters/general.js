import Vue from "vue";
import moment from "moment";

Vue.filter("capitalize", function (sentence) {
  if (!sentence) return "";
  sentence = sentence.toString();
  return sentence
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
});

Vue.filter("globalDate", function (date) {
  if (date) {
    return moment(String(date)).format("DD-MM-YYYY");
  }
});

Vue.filter('limitChars', function(value, limit) {
  if (value.length > limit) {
    return value.slice(0, limit) + '...';
  }
  return value;
});

Vue.filter('currency', number => {
  function formatPrice(value) {
    const val = (value / 1).toFixed(2).replace(',', '.')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  if (number) {
    return formatPrice(number);
  } else {
    return '0.00'
  }
})

Vue.filter("myGlobal", (created) => {
  if (created) return moment(created).format("DD/MM/YYYY");
  return "-";
});