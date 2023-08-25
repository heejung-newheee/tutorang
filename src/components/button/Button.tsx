import { ReactNode } from 'react';
import * as S from './Button.styled';
import { ColorKey } from '../../style/theme/colors';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant: 'solid' | 'outline' | 'text' | 'textIcon';
  color: ColorKey;
  size: 'Large' | 'Medium' | 'Small';
};

const Button = (props: ButtonProps) => {
  const { children, variant, color, size, onClick } = props;

  return (
    <S.Button variant={variant} color={color} size={size} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default Button;
