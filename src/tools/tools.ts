import { Link, Panel, TextPanel } from "@gdacm/core"
import type { GenericMetaOptions } from "@gdacm/core"

export const getTextPanelMarkdown = (title: string, content: string, pos: { x: number, y: number, w: number, h: number }, metaOptions: GenericMetaOptions
    ,): TextPanel => {
    return new TextPanel(metaOptions)
        .setPos(pos.x, pos.y, pos.w, pos.h)
        .withOptions(
            options => options
                .withCode(
                    code => code
                        .setLanguage('plaintext')
                        .setShowLineNumbers(false)
                        .setShowMiniMap(false)
                )
                .setContent(content)
                .setMode("markdown")
        )
        .setTitle(title)
}

export const configureLink = (link: Link, icon: string, title: string, url: string, tooltip: string) => {
    return link
        .setAsDropdown(false)
        .setIcon(icon)
        .setIncludeVars(false)
        .setKeepTime(false)
        .setTargetBlank(true)
        .setTitle(title)
        .setTooltip(tooltip)
        .setUrl(url)
}

export const getYoutubePanel = (title: string, videoId: string, pos: { x: number, y: number, w: number, h: number }, metaOptions: GenericMetaOptions): Panel =>
    new Panel(metaOptions)
        .setPos(pos.x, pos.y, pos.w, pos.h)
        .setOptions({
            autoPlay: true,
            customBackground: false,
            geolocate: false,
            loop: true,
            videoId: videoId,
            videoType: "youtube",
        })
        .setTitle(title)
        .setType("innius-video-panel")
