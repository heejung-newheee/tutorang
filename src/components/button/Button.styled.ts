import styled, { css } from 'styled-components';
import { ColorKey, colors } from '../../style/theme/colors';

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
        return css`
          color: ${colors[props.color]};
        `;
    }
  }}

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
          color: ${colors.white};
          border-radius: 30px;
          padding: 13px 53px;
          font-size: 19px;
        `;
      case 'Small':
        return css`
          display: inline-block;
          min-width: 120px;
          text-align: center;
        `;
    }
  }}
`;
