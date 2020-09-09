import styled from 'styled-components';

interface IDiv {
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
  backgroundColor?: string;
};

interface IFlexContainer extends IDiv {
  flexWrap?: string;
  flexDirection?: string;
  alignItems?: string;
  alignContent?: string;
  justifyContent?: string;
};

interface IFlexItems extends IDiv {
  flex?: string;
  flexGrow?: string;
  flexShrink?: string;
  flexBasis?: string;
};

interface IText extends IDiv {
  color?: string;
  align?: string;
  size?: string;
  weight?: string;
  decoration?: string;
  lineHeight?: string;
};

export const Div = styled.div<IDiv>`
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
  ${({backgroundColor}) => backgroundColor && `background-color: ${backgroundColor};`}
`;

export const FlexContainer = styled(Div)<IFlexContainer>`
  display: flex;
  ${({flexWrap}) => flexWrap && `flex-wrap: ${flexWrap};`}
  ${({flexDirection}) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({alignItems}) => alignItems && `align-items: ${alignItems};`}
  ${({alignContent}) => alignContent && `align-content: ${alignContent};`}
  ${({justifyContent}) => justifyContent && `justify-content: ${justifyContent};`}
`;

export const FlexItems = styled(Div)<IFlexItems>`
  ${({flex}) => flex && `flex: ${flex};`}
  ${({flexGrow}) => flexGrow && `flex-grow: ${flexGrow};`}
  ${({flexShrink}) => flexShrink && `flex-shrink: ${flexShrink};`}
  ${({flexBasis}) => flexBasis && `flex-basis: ${flexBasis};`}
`;

export const Text = styled(Div)<IText>`
  ${({color}) => color && `color: ${color};`}
  ${({align}) => align && `text-align: ${align};`}
  ${({size}) => size && `font-size: ${size};`}
  ${({weight}) => weight && `font-weight: ${weight};`}
  ${({decoration}) => decoration && `text-decoration: ${decoration};`}
  ${({lineHeight}) => lineHeight && `line-height: ${lineHeight};`}
`;