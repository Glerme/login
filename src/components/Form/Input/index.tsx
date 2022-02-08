import { ChangeEvent, InputHTMLAttributes } from 'react';

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'label' | 'value' | 'onChange'
> & {
  name: string;
  label: string;
  error?: string;
  value: string;
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({
  className,
  name,
  label,
  error = '',
  value,
  onChange,
  ...rest
}) => {
  return (
    <section>
      <label htmlFor={name}>
        {label}
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={e => onChange(e.target.value, e)}
          {...rest}
        />
        {error && (
          <section>
            <span>{error}</span>
          </section>
        )}
      </label>
    </section>
  );
};
