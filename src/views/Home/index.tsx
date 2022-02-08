import * as Yup from 'yup';

import { Form } from 'components/Form/Form';
import { Input } from 'components/Form/Input';
import { Button } from 'components/Form/Button';

import { useForm } from 'hooks/useForm';

import styles from './styles.module.scss';

const schema = Yup.object({
  email: Yup.string().required('obrigatorio'),
  senha: Yup.string().required('obrigatorio'),
});

export const HomeView: React.FC = () => {
  const { fields, errors, resetForm, setFields, submitHandler } = useForm({
    email: '',
    senha: '',
  });

  const handleSubmit = submitHandler({
    validateSchema: schema,
    callback: async values => {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email, senha: values.senha }),
      });

      const r = await response.json();

      console.log('token', r);
    },
    onError: error => {},
  });

  return (
    <div className={styles['container']}>
      <Form onSubmit={() => handleSubmit()}>
        <Input
          label="email"
          name="email"
          onChange={value => setFields({ ...fields, email: value })}
          value={fields.email}
          error={errors.email}
        />

        <Input
          label="senha"
          name="senha"
          onChange={value => setFields({ ...fields, senha: value })}
          value={fields.senha}
          error={errors.senha}
        />

        <Button type="submit">Entrar</Button>
      </Form>
    </div>
  );
};
