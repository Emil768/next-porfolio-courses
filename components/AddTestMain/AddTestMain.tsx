import { useId, useRef } from "react";
import styles from "./AddTestMain.module.scss";

import { CategoryOption } from "propTypes";
import Select from "react-select";

import { categoryOptions } from "data";
import axios from "axios";
import useTestStore from "store/test";

import Image from "next/legacy/image";

export const AddTestMain = () => {
  const { data, onGetProps } = useTestStore();

  const isEmpty = Object.values(data.category).every((value) => Boolean(value));
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files![0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "portfolio_uploads");

      const newAvatarUrl = await axios.post(
        "https://api.cloudinary.com/v1_1/dl4ooiriz/image/upload",
        formData
      );

      const { secure_url, public_id } = newAvatarUrl.data;

      onGetProps({
        ...data,
        bgImage: { public_id, url: secure_url },
      });
    } catch (err) {
      console.log(err);
      window.alert("Не удалось загрузить картинку");
    }
  };

  const onClickInput = () => {
    inputFileRef.current!.click();
  };

  return (
    <div className={styles.AddTestMain} data-testid="AddTestMain">
      <div className={styles.inputField__imageBlock}>
        <button
          className={styles.inputField__button}
          type="button"
          onClick={onClickInput}
        >
          Выберите изображение
        </button>
        <input
          type="file"
          name="picture"
          ref={inputFileRef}
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={onUploadImage}
          className={[styles.inputField__field, styles.inputField__file].join(
            " "
          )}
          placeholder="Изображение"
          required={data.bgImage.url ? false : true}
        />

        {data.bgImage.url && (
          <div className={styles.inputField__image}>
            <Image layout="fill" src={`${data.bgImage.url}`} alt="preview" />
          </div>
        )}
      </div>
      <div className={styles.inputField}>
        <label className={styles.inputField__title}>Название теста</label>
        <input
          type="text"
          className={styles.inputField__field}
          placeholder="Введите название"
          onChange={(e) => onGetProps({ ...data, title: e.target.value })}
          defaultValue={data.title}
          required
        />
      </div>

      <div className={styles.inputField}>
        <label className={styles.inputField__title}>Категория</label>
        <Select
          instanceId={useId()}
          closeMenuOnSelect={false}
          options={categoryOptions}
          onChange={(option: CategoryOption | null) =>
            onGetProps({ ...data, category: option! })
          }
          value={isEmpty ? data.category : null}
          placeholder={"Выберите категорию"}
          required
          isClearable
          isSearchable
        />
      </div>

      <textarea
        className={styles.addNote__text}
        onChange={(e) => onGetProps({ ...data, text: e.target.value })}
        placeholder="Описание"
        name="message"
        cols={30}
        rows={3}
        defaultValue={data.text}
        required
      />
    </div>
  );
};
