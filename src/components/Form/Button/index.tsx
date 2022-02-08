import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  background?: 'primary' | 'secondary';
  isOutlined?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  background = 'primary',
  isOutlined = false,
  className,
  children,
  ...rest
}) => {
  return <button {...rest}>{children}</button>;
};
