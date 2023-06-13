import uPlot from "uplot";
import { fixEqualMinMax, tzDate, getDateTranslates } from "./chart-utils";
import {
  candlestickPlugin,
  legendAsTooltipPlugin,
  // columnHighlightPlugin,
} from "./chart-plugins";
import {
  defaultCandleChartConfig,
  xAxesIncrs,
  xAxesValues,
} from "./chart-constants";

function fmtUSD(val, dec) {
  return "$" + val.toFixed(dec).replace(/\d(?=(\d{3})+(?:\.|$))/g, "$&,");
}

export const getCandleChartConfigs = ({ min, max, chartConfigs }) => {
  const config = { ...defaultCandleChartConfig, ...chartConfigs };
  const fixedMinMax = fixEqualMinMax({ min, max });
  min = fixedMinMax.min;
  max = fixedMinMax.max;

  const plugins = [
    // columnHighlightPlugin(),
    legendAsTooltipPlugin(),
    candlestickPlugin({
      gap: config.candleGap,
      bearishColor: config.candleBearishColor,
      bullishColor: config.candleBullishColor,
      bodyMaxWidth: config.candleMaxWidth,
      shadowWidth: config.candleShadowWidth,
      bodyOutline: config.candleOutline,
    }),
  ];

  return {
    width: config.width,
    height: config.height,
    tzDate,
    fmtDate: (tpl) => (date) => {
      return !isNaN(date.getTime())
        ? uPlot.fmtDate(tpl, getDateTranslates())(date)
        : "";
    },
    plugins: plugins,
    scales: {
      x: { distr: 2 },
      y: { min, max },
    },
    series: [
      {
        label: "Date",
        value: (u, ts) => uPlot.fmtDate(config.tooltipDateFormat)(tzDate(ts)),
      },
      {
        label: "Open",
        value: (u, value) =>
          value ? value.toFixed(config.tooltipDecimalsInFloat) : null,
      },
      {
        label: "High",
        value: (u, value) =>
          value ? value.toFixed(config.tooltipDecimalsInFloat) : null,
      },
      {
        label: "Low",
        value: (u, value) =>
          value ? value.toFixed(config.tooltipDecimalsInFloat) : null,
      },
      {
        label: "Close",
        value: (u, value) =>
          value ? value.toFixed(config.tooltipDecimalsInFloat) : null,
      },
      {
        label: "Volume",
        scale: "vol",
      },
    ],
    axes: [
      {
        size: config.xAxisSize,
        font: config.xAxisFont,
        incrs: xAxesIncrs,
        values: xAxesValues,
      },
      {
        size: config.yAxisSize,
        font: config.yAxisFont,
        values: (self, ticks) =>
          ticks.map((rawValue) =>
            rawValue.toFixed(config.yAxisDecimalsInFloat)
          ),
      },
    ],
  };
};
