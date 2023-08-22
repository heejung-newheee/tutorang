import styled, { css } from 'styled-components';
import { colors, ColorKey } from '../../style/theme/colors';

type ButtonProps = {
  variant: 'solid' | 'outline' | 'text' | 'textIcon';
  color: ColorKey;
  size: 'Large' | 'Medium' | 'Small';
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 16px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3 ease;
  line-height: 1;

  &:hover {
    opacity: 0.8;
    transition: all 0.3 ease;
  }

  // variant 정의
  ${(props) => {
    switch (props.variant) {
      case 'solid':
        return css`
          background-color: ${colors[props.color]};
          color: ${colors.white};
        `;
      case 'outline':
        return css`
          border: 1px solid ${colors[props.color]};
          color: ${colors[props.color]};
        `;
      case 'text':
        return css`
          width: 100%;
          text-align: center;
          color: ${colors[props.color]};
        `;
      case 'textIcon':
        return css``;
    }
  }}

  // size 정의
   ${(props) => {
    switch (props.size) {
      case 'Large':
        return css`
          width: 100%;
          height: 48px;
        `;
      case 'Medium':
        return css`
          border: 1px solid ${colors[props.color]};
          color: ${colors[props.color]};
        `;
      case 'Small':
        return css`
          width: 100%;
          text-align: center;
          color: ${colors[props.color]};
        `;
    }
  }}
`;
