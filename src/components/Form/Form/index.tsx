import { FormEvent, ReactNode } from 'react';

type FormProps = {
  children: ReactNode;
  className?: string;
  onSubmit: () => void;
};

export const Form: React.FC<FormProps> = ({
  children,
  className,
  onSubmit,
}) => {
  const handleSubmit = async (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={className ? className : ''}>
      {children}
    </form>
  );
};
