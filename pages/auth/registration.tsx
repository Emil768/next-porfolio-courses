import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { UserProps } from "propTypes";

import { ClipLoader } from "react-spinners";

import styles from "styles/Registration.module.scss";

import { EmailIcon, FolderIcon, UserIcon, ImageIcon } from "public/icons";

import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import useAuthStore from "store/auth";
import { useEffect } from "react";
import Head from "next/head";

const Registration = () => {
  const router = useRouter();
  const { data, fetchAuthRegister, status } = useAuthStore();
  const isLoading = Boolean(status === "loading");

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      avatarUrl: "",
    },
    mode: "onChange",
  });

  const onSubmit = async ({ fullName, email, password, avatarUrl }: any) => {
    try {
      const formData = new FormData();
      formData.append("file", avatarUrl[0]);
      formData.append("upload_preset", "avatars_uploads");
      const newAvatarUrl = await axios.post(
        "https://api.cloudinary.com/v1_1/dl4ooiriz/image/upload",
        formData
      );

      const { secure_url, public_id } = newAvatarUrl.data;

      const fields: UserProps = {
        fullName,
        email,
        password,
        role: "user",
        avatarUrl: {
          public_id: public_id,
          url: secure_url,
        },
      };

      const data = await fetchAuthRegister(fields);

      if (!data) {
        return window.alert("Не удалось зарегистрироваться!");
      }
      if ("token" in data) {
        window.localStorage.setItem("token", data.token!);
        router.push("/");
      }
    } catch (err) {
      window.alert("Не удалось зарегистрироваться");
    }
  };

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data]);

  return (
    <div className={styles.registration} data-testid="Login">
      <Head>
        <title>Регистрация - Extra school</title>
        <meta property="og:title" content="Регистрация - Extra school" />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/dl4ooiriz/image/upload/v1672837860/checklists_cover_m1f4zm.png"
          }
        />
        <meta property="og:type" content="website" />
      </Head>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__content}>
          <h2 className={styles.form__title}>Регистрация</h2>
          <div className={styles.form__loading}>
            <ClipLoader loading={isLoading} color="#39ca81" />
          </div>
          <div className={styles.form__inputs}>
            <div className={styles.form__input}>
              <input
                type="text"
                placeholder="Введите ваше имя"
                {...register("fullName", {
                  required: true,
                  minLength: {
                    value: 5,
                    message: "Минимум 5 символов",
                  },
                })}
              />

              <ErrorMessage
                errors={errors}
                name="fullName"
                render={({ message }) =>
                  message && (
                    <div className={styles.registration__error}>
                      <p className={styles.registration__message}>
                        <svg
                          clipRule="evenodd"
                          fillRule="evenodd"
                          strokeLinejoin="round"
                          strokeMiterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#dd2727"
                        >
                          <path
                            d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                            fillRule="nonzero"
                          />
                        </svg>
                        {message}
                      </p>
                    </div>
                  )
                }
              />

              <UserIcon className={styles.form__email} />
            </div>
            <div className={styles.form__input}>
              <input
                type="email"
                placeholder="Введите логин (e-mail)"
                {...register("email", {
                  required: true,
                })}
              />
              <EmailIcon className={styles.form__email} />
            </div>
            <div className={styles.form__input}>
              <input
                type="password"
                placeholder="Введите пароль"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 5,
                    message: "Минимум 5 символов",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) =>
                  message && (
                    <div className={styles.registration__error}>
                      <p className={styles.registration__message}>
                        <svg
                          clipRule="evenodd"
                          fillRule="evenodd"
                          strokeLinejoin="round"
                          strokeMiterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#dd2727"
                        >
                          <path
                            d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                            fillRule="nonzero"
                          />
                        </svg>
                        {message}
                      </p>
                    </div>
                  )
                }
              />
              <FolderIcon className={styles.form__password} />
            </div>
            <div className={styles.form__input}>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                {...register("avatarUrl", { required: true })}
              />
              <ImageIcon className={styles.form__password} />
            </div>
          </div>
          <div className={styles.form__buttons}>
            <button type="submit">Зарегистрироваться</button>
            <Link href={"/auth/login"}> Авторизоваться</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
