export const xAxesIncrs = [
  // minute divisors (# of secs)
  1,
  5,
  10,
  15,
  30,
  // hour divisors
  60,
  60 * 5,
  60 * 10,
  60 * 15,
  60 * 30,
  // day divisors
  3600,
  // ...
];

// [0]:   minimum num secs in found axis split (tick incr)
// [1]:   default tick format
// [2-7]: rollover tick formats
// [8]:   mode: 0: replace [1] -> [2-7], 1: concat [1] + [2-7]
// Before add new date format as MMMM / WWWW/ WWW please add translates for these periods to getDateTranslates

export const xAxesValues = [
  // tick incr        default        year               month    day            hour     min      sec    mode
  // [3600 * 24 * 365, "{YYYY}", null, null, null, null, null, null, 1],
  // [3600 * 24 * 28, "{MMM}", "\n{YYYY}", null, null, null, null, null, 1],
  // [3600 * 24, "{M}/{D}", "\n{YYYY}", null, null, null, null, null, 1],
  [3600, "{HH}:{mm}", "\n{M}/{D}/{YY}", null, "\n{M}/{D}", null, null, null, 1],
  [60, "{HH}:{mm}", "\n{M}/{D}/{YY}", null, "\n{M}/{D}", null, null, null, 1],
];

export const defaultCandleChartConfig = {
  xAxisSize: 50,
  yAxisSize: 65,
  xAxisFont: "10px Arial",
  yAxisFont: "10px Arial",
  yAxisDecimalsInFloat: 3,
  candleGap: 2,
  candleBearishColor: "#fc3c5f",
  candleBullishColor: "#48b479",
  candleMaxWidth: 20,
  candleShadowWidth: 2,
  candleOutline: 1,
  tooltipDateFormat: "{MM}/{DD}/{YYYY} {HH}:{MM}",
  tooltipDecimalsInFloat: 3,
  heightToWidthRatio: 0.6,
  isResizable: true,
  side: 3, // label on the left side near yAxis
};

export const defaultChartConfigs = {
  pair: "BTCUSDT",
  width: 600,
  height: 300,
  limit: 100,
};

export const periodOptions = [
  { id: Symbol("day"), name: "Day", interval: "1h" },
  { id: Symbol("week"), name: "Week", interval: "6h" },
  { id: Symbol("month"), name: "Month", interval: "1d" },
  { id: Symbol("year"), name: "Year", interval: "1w" },
];
