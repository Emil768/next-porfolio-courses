import { EmailIcon, FolderIcon } from "public/icons";
import { useForm } from "react-hook-form";
import { LoginProps, UserProps } from "propTypes";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "styles/Login.module.scss";

import axios from "utils/axios";

const Login = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "test@massl.ru",
      password: "123123",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginProps) => {
    try {
      const { data } = await axios.post<UserProps>("/auth/login", values);
      if (!data) {
        return window.alert("Пользователь не найден!");
      }
      if ("token" in data) {
        window.localStorage.setItem("token", data.token!);
        window.dispatchEvent(new Event("storage"));
        router.push("/");
      }
    } catch (err) {
      return window.alert("Пользователь не найден!");
    }
  };

  return (
    <div className={styles.login}>
      <form action="" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__content}>
          <h1 className={styles.form__title}>Авторизация</h1>
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
            <Link href={"/auth/registration"}>Зарегистрироваться</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
