import styled from 'styled-components';

interface Div {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  border?: string;
  borderLeft?: string;
  borderRight?: string;
  borderBottom?: string;
  borderTop?: string;
  borderRadius?: string;
  background?: string;
  backgroundColor?: string;
};

interface FlexContainer extends Div {
  flexWrap?: string;
  flexDirection?: string;
  alignItems?: string;
  alignContent?: string;
  justifyContent?: string;
};

interface FlexItems extends Div {
  flex?: string;
  flexGrow?: string;
  flexShrink?: string;
  flexBasis?: string;
};

interface Text extends Div {
  color?: string;
  align?: string;
  size?: string;
  weight?: string;
  decoration?: string;
  lineHeight?: string;
};

interface ColorList {
  red01: string;
  blue01: string;
  yellow01: string;
  yellow02: string;
  yellowRgba01: string;
  yellowRgba02: string;
};

export const ColorList: ColorList = {
  red01: '#f75467',
  blue01: '#4386f9',
  yellow01: '#fec91e',
  yellow02: '#af8702',
  yellowRgba01: 'rgba(254,201,30,0.5)',
  yellowRgba02: 'rgba(254,201,30,0.1)',
};

export const Div = styled.div<Div>`
  ${({width}) => width && `width: ${width};`}
  ${({height}) => height && `height: ${height};`}
  ${({margin}) => margin && `margin: ${margin};`}
  ${({padding}) => padding && `padding: ${padding};`}
  ${({border}) => border && `border: ${border};`}
  ${({borderLeft}) => borderLeft && `border-left: ${borderLeft};`}
  ${({borderRight}) => borderRight && `border-right: ${borderRight};`}
  ${({borderBottom}) => borderBottom && `border-bottom: ${borderBottom};`}
  ${({borderTop}) => borderTop && `border-top: ${borderTop};`}
  ${({borderRadius}) => borderRadius && `border-radius: ${borderRadius};`}
  ${({background}) => background && `background: ${background};`}
  ${({backgroundColor}) => backgroundColor && `background-color: ${backgroundColor};`}
`;

export const FlexContainer = styled(Div)<FlexContainer>`
  display: flex;
  ${({flexWrap}) => flexWrap && `flex-wrap: ${flexWrap};`}
  ${({flexDirection}) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({alignItems}) => alignItems && `align-items: ${alignItems};`}
  ${({alignContent}) => alignContent && `align-content: ${alignContent};`}
  ${({justifyContent}) => justifyContent && `justify-content: ${justifyContent};`}
`;

export const FlexItems = styled(Div)<FlexItems>`
  ${({flex}) => flex && `flex: ${flex};`}
  ${({flexGrow}) => flexGrow && `flex-grow: ${flexGrow};`}
  ${({flexShrink}) => flexShrink && `flex-shrink: ${flexShrink};`}
  ${({flexBasis}) => flexBasis && `flex-basis: ${flexBasis};`}
`;

export const Text = styled(Div)<Text>`
  ${({color}) => color && `color: ${color};`}
  ${({align}) => align && `text-align: ${align};`}
  ${({size}) => size && `font-size: ${size};`}
  ${({weight}) => weight && `font-weight: ${weight};`}
  ${({decoration}) => decoration && `text-decoration: ${decoration};`}
  ${({lineHeight}) => lineHeight && `line-height: ${lineHeight};`}
`;
