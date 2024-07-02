import React, { useState, useEffect } from 'react';
import useGetUser from '../hooks/useGetUser';
import useUpdateUser from '../hooks/useUpdateUser';
import useCreateUser from '../hooks/useCreateUser';

type Props = {
  userId?: number;
};

interface FormData {
  name: string;
  email: string;
}

const UserForm: React.FC<Props> = ({ userId }) => {
  const { data: user, isLoading: isUserLoading } = useGetUser(userId);
  const updateUser = useUpdateUser();
  const createUser = useCreateUser();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (userId !== undefined) {
      updateUser.mutate({ id: userId, ...formData });
    } else {
      createUser.mutate(formData);
    }
  };

  if (isUserLoading) return <div>Yükleniyor...</div>;

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="name">Kullanıcı Adı</label>
        <input
          name="name"
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">E-posta</label>
        <input
          name="email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{userId !== undefined ? 'Güncelle' : 'Oluştur'}</button>
    </form>
  );
};

export default UserForm;