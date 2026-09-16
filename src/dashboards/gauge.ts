import { DashboardInfo } from "@gdacm/core"
import { Dashboard, Datasource, FieldConfigDefault, Gauge, Link, Panel, Testdata, TextPanel, Thresholds } from "@gdacm/core"
import { configureLink, getTextPanelMarkdown, getYoutubePanel } from "../tools"
import type { DashboardMetaOptions, GenericMetaOptions } from "@gdacm/core"

const setStandardThresholds = (defaults: FieldConfigDefault, metaOptions: { has30?: boolean } & GenericMetaOptions): FieldConfigDefault => defaults
    .setColorMode("thresholds")
    .setThresholds(
        new Thresholds(metaOptions)
            .setMode("absolute")
            .addStepWithValueAndColor(0, "green")
            .with(
                thresholds => {
                    if (metaOptions?.has30) {
                        thresholds.addStepWithValueAndColor(30, "green")
                    }
                }
            )
            .addStepWithValueAndColor(60, "#EAB839")
            .addStepWithValueAndColor(80, "red")
    )



const getDashboard = async (uid: string, metaOptions: DashboardMetaOptions): Promise<Dashboard> => {
    const { testDsUid } = metaOptions.info || {};

    const datasource: Datasource = new Testdata(metaOptions).setUid(testDsUid)
    metaOptions = { ...metaOptions, datasource }
    return new Dashboard(metaOptions)
        .setUid(uid)
        .setTitle(metaOptions.title)
        .setTags(metaOptions.tags)
        .setEditable(true)
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
            "https://play.grafana.org/d/mansnzp/gauge",
            "This link doesn't exists on the original diagram."
        ))
        .setLiveNow(false)
        .addPanel(
            getTextPanelMarkdown(
                "Grafana Gauge Visualization",
                "## 📊 Gauge Visualization\n\nThis dashboard is a series of examples showing what you can do in practice with [Gauge Visualizations](https://grafana.com/docs/grafana/latest/visualizations/panels-visualizations/visualizations/gauge/).\n\nGauges are **single-value visualizations** that allow you to quickly see where a value falls within a defined or calculated min and max range.",
                { x: 0, y: 0, w: 6, h: 9 },
                metaOptions
            )
        )
        .addPanel(
            getTextPanelMarkdown(
                "The Basics",
                "## 🛠️ Getting Started\n\n1. **Hover** over any gauge below\n2. Click the **⋯ menu** at the top-right → **Edit**\n3. Review the configuration in the right panel\n4. **Modify options** and watch the gauge update live!",
                { x: 6, y: 0, w: 6, h: 9 },
                metaOptions
            )
        )
        .addPanel(
            getYoutubePanel(
                "",
                "QwXj3y_YpnE",
                { x: 12, y: 0, w: 12, h: 9 },
                metaOptions
            )
        )
        .addPanel(
            new Gauge(metaOptions)
                .setDatasource(datasource)
                .withFieldConfig(
                    fieldConfig => fieldConfig
                        .withDefaults(
                            defaults => setStandardThresholds(defaults, { ...metaOptions, has30: true })
                                .setUnit('decgbytes')
                        )
                )
                .setPos(0, 9, 11, 10)
                .withOptions(
                    options => options
                        .setBarShape("flat")
                        .setBarWidthFactor(0.5)
                        .setNewEffects(
                            effects => effects
                                .setBarGlow(false)
                                .setCenterGlow(false)
                                .setGradient(false)
                        )
                        .setEndpointMarker("point")
                        .setMinVizHeight(75)
                        .setMinVizWidth(75)
                        .setOrientation("auto")
                        .setNewReduceOptions(
                            reduceOptions => reduceOptions
                                .addCalc("mean")
                                .setFields("")
                                .setLimit(7)
                                .setValues(true)
                        )
                        .setSegmentCount(1)
                        .setSegmentSpacing(0.3)
                        .setShape("gauge")
                        .setShowThresholdLabels(false)
                        .setShowThresholdMarkers(true)
                        .setSizing("auto")
                        .setSparkline(true)
                        .setTextMode("auto")
                )
                .addNewTarget(
                    target => target
                        .setAlias("sda")
                        .setDatasource(datasource)
                        .setRefId("A")
                        .setScenarioId("random_walk")
                )
                .setTitle("Basic Gauge - Arc")
        )
        .addPanel(
            new Gauge(metaOptions)
                .setDatasource(datasource)
                .setDescription("Arc gauge with sparkline overlay and center glow effect. The three-step threshold (green → yellow → red) clearly communicates health status at a glance.")
                .withFieldConfig(
                    fieldConfig => fieldConfig
                        .withDefaults(
                            defaults => setStandardThresholds(defaults, metaOptions)
                                .setUnit('GBs')
                        )
                )
                .setPos(11, 9, 6, 10)
                .withOptions(
                    options => options
                        .setBarShape("flat")
                        .setBarWidthFactor(0.5)
                        .setNewEffects(
                            effects => effects
                                .setBarGlow(false)
                                .setCenterGlow(true)
                                .setGradient(false)
                        )
                        .setEndpointMarker("none")
                        .setMinVizHeight(75)
                        .setMinVizWidth(75)
                        .setOrientation("auto")
                        .setNewReduceOptions(
                            reduceOptions => reduceOptions
                                .addCalc("mean")
                                .setFields("")
                                .setValues(false)
                        )
                        .setSegmentCount(1)
                        .setSegmentSpacing(0.3)
                        .setShape("gauge")
                        .setShowThresholdLabels(true)
                        .setShowThresholdMarkers(true)
                        .setSizing("auto")
                        .setSparkline(true)
                        .setTextMode("auto")
                )
                .addNewTarget(
                    target => target
                        .setDatasource(datasource)
                        .setRefId("A")
                        .setScenarioId("random_walk")
                        .setSeriesCount(1)
                )
                .setTitle("Gauge with sparkline and center glow")
        )
        .addPanel(
            new Gauge(metaOptions)
                .setDatasource(datasource)
                .setDescription("Arc gauge showcasing 64-segment gradient rendering. Multiple threshold steps with varied colors create a smooth spectrum effect as values rise through each zone.")
                .withFieldConfig(
                    fieldConfig => fieldConfig
                        .withDefaults(
                            defaults => defaults
                                .setColorMode("thresholds")
                                .setThresholds(
                                    new Thresholds(metaOptions)
                                        .setMode("absolute")
                                        .addStepWithValueAndColor(0, "green")
                                        .addStepWithValueAndColor(10, "#EAB839")
                                        .addStepWithValueAndColor(30, "red")
                                        .addStepWithValueAndColor(60, "#6ED0E0")
                                        .addStepWithValueAndColor(90, "#EF843C")
                                )
                                .setUnit('GBs')
                        )
                )
                .setPos(17, 9, 7, 10)
                .withOptions(
                    options => options
                        .setBarShape("flat")
                        .setBarWidthFactor(0.41)
                        .setNewEffects(
                            effects => effects
                                .setBarGlow(false)
                                .setCenterGlow(false)
                                .setGradient(true)
                        )
                        .setEndpointMarker("none")
                        .setMinVizHeight(75)
                        .setMinVizWidth(75)
                        .setOrientation("auto")
                        .setNewReduceOptions(
                            reduceOptions => reduceOptions
                                .addCalc("mean")
                                .setFields("")
                                .setValues(false)
                        )
                        .setSegmentCount(64)
                        .setSegmentSpacing(0.14)
                        .setShape("gauge")
                        .setShowThresholdLabels(true)
                        .setShowThresholdMarkers(true)
                        .setSizing("auto")
                        .setSparkline(true)
                        .setTextMode("auto")
                )
                .addNewTarget(
                    target => target
                        .setDatasource(datasource)
                        .setRefId("A")
                        .setScenarioId("csv_metric_values")
                        .setStringInput("10,20,30,40,50,60,70,80,90,10,20,50,90,10")
                )
                .setTitle("Gauge with sparkline and gradient")
        )
        .addPanel(
            new Gauge(metaOptions)
                .setDatasource(datasource)
                .setDescription("Full-circle gauge with gradient, bar glow, and center glow effects. Warning threshold at 60 and critical at 80 are labeled directly on the arc for quick interpretation.")
                .withFieldConfig(
                    fieldConfig => fieldConfig
                        .withDefaults(
                            defaults => setStandardThresholds(defaults, metaOptions)
                                .setUnit('velocityms')
                        )
                )
                .setPos(0, 19, 6, 10)
        )
        .setPreload(false)
        .setRefresh("10s")
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
    .setSid("mansnzp")
    .setTitle("Gauge")
    .setTags(["featured-viz", "viz", "demo"])

