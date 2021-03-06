import React, { Component, Fragment } from 'react'
import { Container, SvgWrapper } from '@nivo/core'
import { GeoMapPropTypes } from './props'
import GeoMapFeature from './GeoMapFeature'
import enhance from './enhance'

class GeoMap extends Component {
    static propTypes = GeoMapPropTypes

    renderTooltip = (showTooltip, feature, event) => {
        const { tooltip, theme } = this.props
        if (!tooltip) return

        const tooltipContent = tooltip(feature)
        if (!tooltipContent) return

        showTooltip(
            <div style={theme.tooltip.container}>
                <div>{tooltipContent}</div>
            </div>,
            event
        )
    }

    handleMouseEnter = showTooltip => (feature, event) => {
        const { isInteractive, onMouseEnter } = this.props
        if (isInteractive !== true) return

        this.renderTooltip(showTooltip, feature, event)
        onMouseEnter(feature, event)
    }

    handleMouseMove = showTooltip => (feature, event) => {
        const { isInteractive, onMouseMove } = this.props
        if (isInteractive !== true) return

        this.renderTooltip(showTooltip, feature, event)
        onMouseMove(feature, event)
    }

    handleMouseLeave = hideTooltip => (feature, event) => {
        const { isInteractive, onMouseLeave } = this.props
        if (isInteractive !== true) return

        hideTooltip()
        onMouseLeave(feature, event)
    }

    handleClick = (feature, event) => {
        const { isInteractive, onClick } = this.props
        if (isInteractive !== true) return

        onClick(feature, event)
    }

    render() {
        const {
            margin,
            outerWidth,
            outerHeight,
            theme,
            features,
            pathHelper,
            getFillColor,
            getBorderWidth,
            getBorderColor,
            layers,
            isInteractive
        } = this.props

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        theme={theme}
                    >
                        {layers.map((layer, i) => {
                            if (layer === 'features') {
                                return (
                                    <Fragment key={i}>
                                        {features.map(feature => (
                                            <GeoMapFeature
                                                key={feature.id}
                                                feature={feature}
                                                pathHelper={pathHelper}
                                                fillColor={getFillColor(feature)}
                                                borderWidth={getBorderWidth(feature)}
                                                borderColor={getBorderColor(feature)}
                                                onMouseEnter={this.handleMouseEnter(showTooltip)}
                                                onMouseMove={this.handleMouseMove(showTooltip)}
                                                onMouseLeave={this.handleMouseLeave(hideTooltip)}
                                                onClick={this.handleClick}
                                            />
                                        ))}
                                    </Fragment>
                                )
                            }
                            return <Fragment key={i}>layer(this.props)</Fragment>
                        })}
                    </SvgWrapper>
                )}
            </Container>
        )
    }
}

export default enhance(GeoMap, 'GeoMap')
