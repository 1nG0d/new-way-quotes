<script>
  import uPlot from "uplot";
  import { afterUpdate } from "svelte";
  import { mainStore } from "../../store";
  import { getCandleChartConfigs } from "./chart-configs";
  import { widgetNames } from "../../constatns/widgetNames";
  import ChartWidgetWrapper from "./ChartWidgetWrapper.svelte";
  import { getMinMaxData } from "./chart-utils";
  import ChartWidgetDateButtons from "./ChartWidgetDateButtons.svelte";
  import { getChartData } from "./getChartData";
  import { defaultChartConfigs, periodOptions } from "./chart-constants";
  import "./chartWidget.css";
  import "uplot/dist/uPlot.min.css";

  export let widgetOptions;

  const chartConfigs = { ...defaultChartConfigs, ...widgetOptions.chartConfigs };
  let chartElement;
  let chart;
  let { chartData, chartDataLoading, chartDataError } = {};
  let period = periodOptions[0].id;

  $:{
    getChartData({...chartConfigs, period});
  }

  mainStore.subscribe((store) => {
    chartData = store[widgetNames.CHART_WIDGET].data;
    chartDataLoading = store[widgetNames.CHART_WIDGET].loading;
    chartDataError = store[widgetNames.CHART_WIDGET].error;
  });

  const renderChart = () => {
    if (!chartElement) return;
    // if chart exist destroy previous
    if (chart) chart.destroy();

    const { min, max } = getMinMaxData(chartData);

    const options = getCandleChartConfigs({
      min,
      max,
      chartConfigs,
    });
    chart = new uPlot(options, chartData, chartElement);
  };

  afterUpdate(async () => {
    await renderChart();
  });
</script>

<div class="chart-widget">
  <h3>Chart widget</h3>
  <ChartWidgetDateButtons bind:period />
  <ChartWidgetWrapper {chartDataLoading} {chartDataError}>
    {#key period}
      <div bind:this={chartElement} class="chart-widget" id="chart-widget" />
    {/key}
  </ChartWidgetWrapper>
</div>

<style>
  .chart-widget {
    width: 100vh;
  }
</style>
