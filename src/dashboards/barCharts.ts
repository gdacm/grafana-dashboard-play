import { Color, DashboardInfo, FieldConfig, FieldConfigOverride, Histogram, OverrideMatcher, PieChart, Target } from "@gdacm/core"
import { BarChart, Dashboard, Datasource, GrafanaItem, Mapping, Testdata, VizTextDisplayOptions } from "@gdacm/core"
import { configureLink, getTextPanelMarkdown, getYoutubePanel } from "../tools"

import type { DashboardMetaOptions, Panel } from "@gdacm/core";

const getDashboard = async (uid: string, metaOptions: DashboardMetaOptions): Promise<Dashboard> => {
    const { testDsUid } = metaOptions.info || {};

    const datasource: Datasource = new Testdata(metaOptions).setUid(testDsUid)
    metaOptions = { ...metaOptions, datasource }

    let panelMarketShare: BarChart | null = null
    const datasourceDashboard: Datasource = new Datasource(metaOptions).setType("datasource").setUid("-- Dashboard --")

    return new Dashboard(metaOptions)
        .setUid(uid)
        .setTitle(metaOptions.title)
        .setTags(metaOptions.tags)
        .setEditable(true)
        .setFiscalYearStartMonth(0)
        .setGraphTooltip(1)
        .addNewLink(link => configureLink(
            link,
            "cloud",
            "Want to build a dashboard like this? Get started fast with the Grafana Cloud free tier!",
            "https://grafana.com/auth/sign-up/create-user?pg=play",
            "Includes 10k metrics, 50GB logs, 50GB traces, and more"
        ))
        .addNewLink(link => configureLink(
            link,
            "doc",
            "Learn about Grafana through our Learning Journeys",
            "https://grafana.com/docs/learning-journeys/?src=play&camp=learning-journey-button",
            "Master the Grafana platform "
        ))
        .addNewLink(link => configureLink(
            link,
            "dashboard",
            "Original diagram on Grafana Play",
            "https://play.grafana.org/d/ktMs4D6Mk",
            "This link doesn't exists on the original diagram."
        ))
        .setLiveNow(false)
        .addPanel(
            getTextPanelMarkdown(
                "Grafana Bar Charts and Pie Charts",
                "This dashboard is a series of examples showing you what you can do in \npractice with [bar charts](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/bar-chart/) \nand [pie charts](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/pie-chart/) in Grafana.\n\nBar charts allow you to graph categorical data, and pie charts display reduced series values,\nas they relate to each other.",
                { x: 0, y: 0, w: 24, h: 4 },
                metaOptions
            )
        )
        .addPanel(
            getTextPanelMarkdown(
                "The Basics",
                "* Hover over any visualization, select the ... menu at the top right of the visualization > edit\n* Check out how it's configured\n* Try modifying the options on the right in the edit menu!",
                { x: 0, y: 4, w: 13, h: 5 },
                metaOptions
            )
        )
        .addPanel(
            getYoutubePanel(
                "",
                "qyKE9-71KkE",
                { x: 13, y: 4, w: 11, h: 11 },
                metaOptions
            )
        )
        .addPanel(
            new BarChart(metaOptions)
                .setDatasource(datasource)
                .withCustom(
                    custom => custom
                        .setAxisBorderShow(false)
                        .setAxisCenteredZero(false)
                        .setAxisColorMode("text")
                        .setAxisLabel('')
                        .setAxisPlacement('auto')
                        .setAxisSoftMin(0)
                        .setFillOpacity(80)
                        .setGradientMode("none")
                        .withHideFrom(
                            hideFrom => hideFrom
                                .setGraph(false)
                                .setLegend(false)
                                .setTooltip(false)
                                .setViz(false)
                        )
                        .setLineWidth(1)
                        .withScaleDistribution(
                            scaleDistribution => scaleDistribution
                                .setType("linear")
                        )
                        .setThresholdsStyleMode("off")
                )
                .withFieldConfig(
                    fieldConfig => fieldConfig
                        .withDefaults(
                            defaults => defaults
                                .addMapping(
                                    new Mapping(metaOptions)
                                        ._setValue('type', 'special')
                                        ._setObject('options',
                                            new GrafanaItem(metaOptions)
                                                ._setValue('match', 'true')
                                                ._setObject('result',
                                                    new GrafanaItem(metaOptions)
                                                        ._setValue('color', 'green')
                                                        ._setValue('index', 0)
                                                        ._setValue('text', 'True')
                                                )
                                        )
                                )
                                .addMapping(
                                    new Mapping(metaOptions)
                                        ._setValue('type', 'special')
                                        ._setObject('options',
                                            new GrafanaItem(metaOptions)
                                                ._setValue('match', 'false')
                                                ._setObject('result',
                                                    new GrafanaItem(metaOptions)
                                                        ._setValue('color', 'red')
                                                        ._setValue('index', 1)
                                                        ._setValue('text', 'False')
                                                )
                                        )
                                )
                                .withThresholds(
                                    thresholds => thresholds
                                        .setMode('absolute')
                                        // @ts-ignore
                                        .addStepWithValueAndColor(null, 'blue')
                                )
                                .setUnit('short')
                        )
                )
                .setPos(0, 9, 13, 6)
                .setMaxDataPoints(10)
                .withOptions(
                    options => options
                        .setBarRadius(0)
                        .setBarWidth(0.97)
                        .setFullHighlight(false)
                        .setGroupWidth(0.7)
                        .withLegend(
                            legend => legend
                                .initCalcs()
                                .setDisplayMode('list')
                                .setPlacement('right')
                                .setShowLegend(true)
                        )
                        .setOrientation('auto')
                        .setShowValue('auto')
                        .setStacking('none')
                        .setText(
                            new VizTextDisplayOptions(metaOptions)
                        )
                        .withTooltip(
                            tooltip => tooltip
                                .setHideZeros(false)
                                .setMode("single")
                                .setSort("none")
                        )
                        .setXTickLabelRotation(0)
                        .setXTickLabelSpacing(0)
                )
                .addNewTarget(
                    target => target
                        .setAlias("SensorA")
                        ._setValue("csvFileName", "js_libraries.csv")
                        .setDatasource(datasource)
                        .setRefId("A")
                        .setScenarioId("csv_file")
                )
                .setTitle("Popular JS Frameworks")
        )
        .addPanel(
            new BarChart(metaOptions)
                .setDatasource(datasource)
                .withCustom(
                    custom => custom
                        .setAxisBorderShow(false)
                        .setAxisCenteredZero(false)
                        .setAxisColorMode("text")
                        .setAxisLabel("")
                        .setAxisPlacement("auto")
                        .setAxisSoftMin(0)
                        .setFillOpacity(74)
                        .setGradientMode("none")
                        .withHideFrom(
                            hideFrom => hideFrom
                                // .setGraph(false)
                                .setLegend(false)
                                .setTooltip(false)
                                .setViz(false)
                        )
                        .setLineWidth(1)
                        .withScaleDistribution(
                            scaleDistribution => scaleDistribution
                                .setType("linear")
                        )
                        .setThresholdsStyleMode("off")
                )
                .withFieldConfig(
                    fieldConfig => fieldConfig
                        .withDefaults(
                            defaults => defaults
                                .withColor(
                                    color => color
                                        ._setValue("fixedColor", "blue")
                                        .setMode("fixed")
                                )
                                .withThresholds(
                                    thresholds => thresholds
                                        .setMode("absolute")
                                        .addNewStep(
                                            step => step
                                                ._setValue("value", null)
                                                .setColor("green")
                                        )
                                        .addStepWithValueAndColor(80, "red")
                                )
                        )
                        .addOverride(
                            new FieldConfigOverride(metaOptions)
                                .setNewMatcher(
                                    overrideMatcher => overrideMatcher
                                        .setId("byName")
                                        .setOptions("pressure")
                                )
                                .addNewProperty(
                                    property => property
                                        .setId("color")
                                        .setValue(
                                            new Color(metaOptions)
                                                .setMode("fixed")
                                                ._setValue("fixedColor", "red")
                                        )
                                )

                        )
                )
                .setPos(0, 15, 14, 12)
                .setNewOptions(
                    options => options
                        .setBarRadius(0)
                        .setBarWidth(0.81)
                        .setFullHighlight(false)
                        .setGroupWidth(0.7)
                        .withLegend(
                            legend => legend
                                .setDisplayMode("list")
                                .setPlacement("right")
                                .setShowLegend(false)
                        )
                        .setOrientation("horizontal")
                        .setShowValue("auto")
                        .setStacking("none")
                        .setText(
                            new VizTextDisplayOptions(metaOptions)
                        )
                        .withTooltip(
                            tooltip => tooltip
                                .setHideZeros(false)
                                .setMode("single")
                                .setSort("none")
                        )
                        .setXTickLabelRotation(0)
                        .setXTickLabelSpacing(0)
                )
                .addNewTarget(
                    target => target
                        ._setValue("csvFileName", "browser_marketshare.csv")
                        .setDatasource(datasource)
                        .setRefId("A")
                        .setScenarioId("csv_file")
                )
                .setTitle("Browser market share")
                .addNewTransformation(
                    transformation => transformation
                        ._setValue("id", "filterByValue")
                        ._setObject("options",
                            new GrafanaItem(metaOptions)
                                ._addArrayItem("filters",
                                    new GrafanaItem(metaOptions)
                                        ._setObject("config",
                                            new GrafanaItem(metaOptions)
                                                ._setValue("id", "greater")
                                                ._setObject("options",
                                                    new GrafanaItem(metaOptions)
                                                        ._setValue("value", 0.37)
                                                )
                                        )
                                        ._setValue("fieldName", "Market share")
                                )
                                ._setValue("match", "any")
                                ._setValue("type", "include")
                        )
                )
                .addNewTransformation(
                    transformation => transformation
                        ._setValue("id", "sortBy")
                        ._setObject("options",
                            new GrafanaItem(metaOptions)
                                ._setObject("fields", new GrafanaItem(metaOptions))
                                ._addArrayItem("sort",
                                    new GrafanaItem(metaOptions)
                                        ._setValue("desc", true)
                                        ._setValue("field", "Market share")
                                )
                        )
                )
                .with(
                    panel => panelMarketShare = panel
                )
        )
        .addPanel(
            new PieChart(metaOptions)
                .setDatasource(datasource)
                .withFieldConfig(
                    fieldConfig => fieldConfig
                        .withDefaults(
                            defaults => defaults
                                .addNewMapping(
                                    mapping => mapping
                                        ._setObject("options", {
                                            match: "true",
                                            result: {
                                                color: "green",
                                                index: 0,
                                                text: "True",
                                            }
                                        })
                                        ._setValue("type", "special")
                                )
                                .addNewMapping(
                                    mapping => mapping
                                        ._setObject("options", {
                                            match: "false",
                                            result: {
                                                color: "red",
                                                index: 1,
                                                text: "False",
                                            }
                                        })
                                        ._setValue("type", "special")
                                )
                                .setUnit("short")
                        )
                        .addNewOverride(
                            override => override
                                .withMatcher(
                                    matcher => matcher
                                        .setId("byName")
                                        .setOptions("Vue")
                                )
                                .addNewProperty(
                                    property => property
                                        .setId("color")
                                        .setValue(
                                            new Color(metaOptions)
                                                .setMode("fixed")
                                                ._setValue("fixedColor", "purple")
                                        )
                                )
                        )
                )
                .setPos(14, 15, 10, 12)
                .setMaxDataPoints(10)
                .withOptions(
                    options => options
                        .addDisplayLabel('percent')
                        .withLegend(
                            legend => legend
                                .setDisplayMode("list")
                                .setPlacement("right")
                                .setShowLegend(true)
                                .addValue("value")
                        )
                        .setPieType("pie")
                        ._setObject("reduceOptions",
                            {
                                calcs: ["lastNotNull"],
                                fields: "",
                                values: true,
                            }
                        )
                        .withTooltip(
                            tooltip => tooltip
                                .setHideZeros(false)
                                .setMode("single")
                                .setSort("none")
                        )
                )
                .addNewTarget(
                    target => target
                        .setAlias("SensorA")
                        ._setValue("csvFileName", "js_libraries.csv")
                        .setDatasource(datasource)
                        .setRefId("A")
                        .setScenarioId("csv_file")
                )
                .setTitle("Popular JS Frameworks")
                .addNewTransformation(
                    transformation => transformation
                        ._setValue("id", "filterFieldsByName")
                        ._setObject("options", {
                            "include": {
                                "names": [
                                    "Github Stars",
                                    "Library"
                                ]
                            }
                        })
                )
        )
        .addPanel(
            new Histogram(metaOptions)
                .setDatasource(datasource)
                .withCustom(
                    custom => custom
                        .setFillOpacity(80)
                        .setGradientMode("hue")
                        .withHideFrom(
                            hideFrom => hideFrom
                                .setGraph(false)
                                .setLegend(false)
                                .setTooltip(false)
                                .setViz(false)
                        )
                        .setLineWidth(1)
                        .withStacking(
                            stacking => stacking
                                .setGroup("A")
                                .setMode("none")
                        )
                )
                .withFieldConfig(
                    fieldConfig => fieldConfig
                        .withDefaults(
                            defaults => defaults
                                .withThresholds(
                                    thresholds => thresholds
                                        .setMode("absolute")
                                        .addStepWithValueAndColor(0, "green") // null, "green"
                                        .addStepWithValueAndColor(80, "red")
                                )
                        )
                        .addNewOverride(
                            override => override
                                .withMatcher(
                                    matcher => matcher
                                        .setId("byName")
                                        .setOptions("A-series")
                                )
                                .addNewProperty(
                                    properties => properties
                                        .setId("color")
                                        .setValue({ mode: "fixed", fixedColor: "blue" })
                                )
                        )
                )
                .setPos(0, 27, 13, 12)
                .withOptions(
                    options => options
                        .setBucketOffset(0)
                        .setBucketSize(1)
                        .withLegend(
                            legend => legend
                                .initCalcs()
                                .setDisplayMode("list")
                                .setPlacement("bottom")
                                .setShowLegend(false)
                        )
                        .withTooltip(
                            tooltip => tooltip
                                .setHideZeros(false)
                                .setMode("single")
                                .setSort("none")
                        )
                )
                .addNewTarget(
                    target => target
                        .setAlias("")
                        ._setObject("csvWave",
                            new GrafanaItem(metaOptions)
                                ._setValue("timeStep", 60)
                                ._setValue("valueCSV", "0,0,2,2,1,1")
                        )
                        .setDatasource(datasource)
                        ._setValue("lines", 10)
                        ._setValue("max", 100)
                        ._setValue("min", 1)
                        ._setValue("noise", 10)
                        ._initArray("points")
                        ._setObject("pulseWave",
                            new GrafanaItem(metaOptions)
                                ._setValue("offCount", 3)
                                ._setValue("offValue", 1)
                                ._setValue("onCount", 3)
                                ._setValue("onValue", 2)
                                ._setValue("timeStep", 60)
                        )
                        .setRefId("A")
                        ._setValue("scenarioId", "random_walk")
                        ._setValue("spread", 10)
                        ._setValue("startValue", 50)
                        ._setObject("stream",
                            new GrafanaItem(metaOptions)
                                ._setValue("bands", 1)
                                ._setValue("noise", 2.2)
                                ._setValue("speed", 250)
                                ._setValue("spread", 3.5)
                                ._setValue("type", "signal")
                        )
                        ._setValue("stringInput", "1,20,90,30,5,0")
                )
                .setTitle("Histogram visualization")
        )
        .addPanel(
            new PieChart(metaOptions)
                .setDatasource(datasourceDashboard)
                .withCustom(
                    custom => custom
                        .withHideFrom(
                            hideFrom => hideFrom
                                .setLegend(false)
                                .setTooltip(false)
                                .setViz(false)
                        )
                )
                .withFieldConfig(
                    fieldConfig => fieldConfig
                        .withDefaults(
                            defaults => defaults
                                .setDecimals(1)
                                .setUnit("none")
                        )
                        .addNewOverride(
                            override => override
                                .withMatcher(
                                    matcher => matcher
                                        .setId("byName")
                                        .setOptions("Chrome")
                                )
                                .addNewProperty(
                                    property => property
                                        .setId("color")
                                        .setValue({ mode: "fixed", fixedColor: "purple" })
                                )
                        )
                )
                .setPos(13, 27, 11, 12)
                .withOptions(
                    options => options
                        .addDisplayLabel("name")
                        .withLegend(
                            legend => legend
                                .setDisplayMode("list")
                                .setPlacement("right")
                                .setShowLegend(true)
                                .initValues()
                        )
                        .setPieType("donut")
                        ._setObject("reduceOptions",
                            new GrafanaItem(metaOptions)
                                ._addArrayItem("calcs", "mean")
                                ._setValue("fields", "")
                                ._setValue("values", true)
                        )
                        ._setValue("showLegend", true)
                        ._setValue("strokeWidth", 1)
                        ._setValue("text", {})
                        .withTooltip(
                            tooltip => tooltip
                                .setHideZeros(false)
                                .setMode("single")
                                .setSort("none")
                        )
                )
                .addNewTarget(
                    target => target
                        .setDatasource(datasourceDashboard)
                        ._setValue("panelId", panelMarketShare?.id ?? 0)
                        ._setValue("refId", "A")
                )
                .setTitle("Browser market share")
                .addNewTransformation(
                    transformation => transformation
                        ._setValue("id", "filterByValue")
                        ._setObject("options",
                            new GrafanaItem(metaOptions)
                                ._addArrayItem("filters",
                                    new GrafanaItem(metaOptions)
                                        ._setObject("config",
                                            new GrafanaItem(metaOptions)
                                                ._setValue("id", "greater")
                                                ._setObject("options",
                                                    new GrafanaItem(metaOptions)
                                                        ._setValue("value", 0.2)
                                                )
                                        )
                                        ._setValue("fieldName", "Market share")
                                )
                                ._setValue("match", "any")
                                ._setValue("type", "include")
                        )
                )

        )
        .setPreload(false)
        .setTimeRange("now-6h", "now")
        .withTimepicker(
            timepicker => timepicker
                .addRefreshInterval("5s")
                .addRefreshInterval("10s")
                .addRefreshInterval("30s")
                .addRefreshInterval("1m")
                .addRefreshInterval("5m")
                .addRefreshInterval("15m")
                .addRefreshInterval("30m")
                .addRefreshInterval("1h")
                .addRefreshInterval("2h")
                .addRefreshInterval("1d")
        )
        .setTimezone("utc")

}

export default new DashboardInfo()
    .setDashboardGenerator(getDashboard)
    .setSid("barcharts")
    .setTitle("Bar charts and pie charts")
    .setTags(["featured-viz", "viz", "demo", "visualization"])
    .setEmoji("📊")
