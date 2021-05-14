export function intToString(value) {
  var suffixes = ["", "K", "M", "B", "T"];
  var suffixNum = Math.floor(("" + value).length / 3);
  var shortValue = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
}

export const formatCash = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e5) return +(n / 1e3).toFixed(1) + "K+";
  if (n >= 1e5 && n <= 1e6) return +(n / 1e5).toFixed(1) + "L+";
  if (n >= 1e6 && n <= 1e9) return +(n / 1e7).toFixed(1) + "C+";
};
