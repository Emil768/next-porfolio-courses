import { EmailIcon, FolderIcon } from "public/icons";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchAuth } from "redux/slices";
import { LoginProps } from "propTypes";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../styles/Login.module.scss";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isAuth = useAppSelector((state) => Boolean(state.auth.data));

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "test@massl.ru",
      password: "123123",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginProps) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
      return window.alert("Пользователь не найден!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token!);
    }
  };

  if (isAuth) {
    router.push("/");
  }

  return (
    <div className={styles.login} data-testid="Login">
      <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__content}>
          <h2 className={styles.form__title}>Авторизация</h2>
          <div className={styles.form__inputs}>
            <div className={styles.form__input}>
              <input
                type="email"
                placeholder="Введите логин (e-mail)"
                {...register("email", { required: "Укажите e-mail" })}
              />
              <EmailIcon className={styles.form__email} />
            </div>
            <div className={styles.form__input}>
              <input
                type="password"
                placeholder="Введите пароль"
                {...register("password", { required: "Укажите пароль" })}
              />
              <FolderIcon className={styles.form__password} />
            </div>
          </div>
          <div className={styles.form__buttons}>
            <button type="submit">Войти</button>
            <Link href={"/auth/register"}>Зарегистрироваться</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
