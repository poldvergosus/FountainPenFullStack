import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { InputMask } from '@react-input/mask';

const Profile = () => {
  const { token, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [notifications, setNotifications] = useState(true);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/user/profile',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const user = response.data.user;
        setName(user.name || '');
        setEmail(user.email || '');
        setPhone(user.phone || '');
        setCity(user.city || '');
        setStreet(user.street || '');
        setNotifications(user.notifications !== false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Имя не может быть пустым');
      return;
    }

    if (phone && phone.replace(/\D/g, '').length !== 11) {
      toast.error('Введите корректный номер телефона');
      return;
    }

    setSavingProfile(true);

    try {
      const response = await axios.post(
        backendUrl + '/api/user/update-profile',
        { name, phone, city, street, notifications },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Профиль обновлён');
        setIsEditing(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Ошибка сохранения');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error('Введите текущий пароль');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Новый пароль должен быть минимум 8 символов');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('Пароли не совпадают');
      return;
    }
    if (currentPassword === newPassword) {
      toast.error('Новый пароль должен отличаться от текущего');
      return;
    }

    setSavingPassword(true);

    try {
      const response = await axios.post(
        backendUrl + '/api/user/change-password',
        { currentPassword, newPassword },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Пароль изменён');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowPasswordSection(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Ошибка смены пароля');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    fetchProfile();
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary text-sm">Загрузка профиля...</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] max-w-[600px] mx-auto mt-14 mb-20 text-primary">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold">Профиль</h2>
        <hr className="border-none h-[1.5px] w-8 bg-primary" />
      </div>

      <form onSubmit={handleSaveProfile}>
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Личные данные</h3>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-sm text-accent hover:underline"
              >
                Редактировать
              </button>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">
              Email нельзя изменить
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ФИО *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              required
              className={`w-full px-3 py-2 border ${
                isEditing ? 'border-primary' : 'border-gray-200 bg-gray-50'
              }`}
              placeholder="Введите ФИО"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Телефон
            </label>
            {isEditing ? (
              <InputMask
                mask="+7 (___) ___-__-__"
                replacement={{ _: /\d/ }}
                showMask
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-primary"
                placeholder="+7 (___) ___-__-__"
              />
            ) : (
              <input
                type="text"
                value={phone || 'Не указан'}
                disabled
                className="w-full px-3 py-2 border border-gray-200 bg-gray-50"
              />
            )}
          </div>

          <div className="mb-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                disabled={!isEditing}
                className="mt-1 w-4 h-4 accent-primary"
              />
              <span className="text-sm text-gray-600">
                Получать уведомления о заказе
              </span>
            </label>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Адрес доставки</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Город
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border ${
                isEditing ? 'border-primary' : 'border-gray-200 bg-gray-50'
              }`}
              placeholder="Введите город"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Улица, дом, квартира
            </label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border ${
                isEditing ? 'border-primary' : 'border-gray-200 bg-gray-50'
              }`}
              placeholder="Введите адрес"
            />
          </div>

          {!city && !street && !isEditing && (
            <p className="text-sm text-gray-400 mt-2">
              Адрес не указан. Нажмите «Редактировать» чтобы добавить.
            </p>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-3 mb-6">
            <button
              type="submit"
              disabled={savingProfile}
              className="flex-1 py-2 px-6 bg-primary text-white hover:bg-accent transition disabled:bg-gray-300"
            >
              {savingProfile ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 py-2 px-6 border border-primary text-primary hover:bg-gray-100 transition"
            >
              Отмена
            </button>
          </div>
        )}
      </form>

      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Пароль</h3>
          {!showPasswordSection && (
            <button
              type="button"
              onClick={() => setShowPasswordSection(true)}
              className="text-sm text-accent hover:underline"
            >
              Изменить пароль
            </button>
          )}
        </div>

        {showPasswordSection ? (
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Текущий пароль
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-primary"
                placeholder="Введите текущий пароль"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Новый пароль
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-primary"
                placeholder="Минимум 8 символов"
                required
              />
              {newPassword && newPassword.length < 8 && (
                <p className="text-red-500 text-xs mt-1">
                  Минимум 8 символов
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Повторите новый пароль
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  confirmNewPassword && newPassword !== confirmNewPassword
                    ? 'border-red-500'
                    : 'border-primary'
                }`}
                placeholder="Повторите пароль"
                required
              />
              {confirmNewPassword && newPassword !== confirmNewPassword && (
                <p className="text-red-500 text-xs mt-1">
                  Пароли не совпадают
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={savingPassword}
                className="flex-1 py-2 px-6 bg-primary text-white hover:bg-accent transition disabled:bg-gray-300"
              >
                {savingPassword ? 'Сохранение...' : 'Сменить пароль'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordSection(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmNewPassword('');
                }}
                className="flex-1 py-2 px-6 border border-primary text-primary hover:bg-gray-100 transition"
              >
                Отмена
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-gray-400">
            ••••••••
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;