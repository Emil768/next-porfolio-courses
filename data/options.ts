import { CategoryOption } from "propTypes";
import {
  SliceIcon_1,
  SliceIcon_2,
  SliceIcon_3,
  SliceIcon_4,
} from "public/gallery";

export const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour24: true,
} as const;

export const categoryOptions: CategoryOption[] = [
  { value: "tests", label: "Тесты" },
  {
    value: "offers",
    label: "Тесты / Предложения",
    // isDisabled: true,
  },
];

export const categoryNames = [
  {
    title: "Тесты",
    link: "tests",
  },
  {
    title: "Тесты / Предложения",
    link: "offers",
  },
];

export const programsData = [
  {
    id: "01",
    title: "Алфавит и правила чтения",
    body: "В этом разделе вы познакомитесь с алфавитом, фонетикой, произношением и ударением в английском языке. Научитесь читать новые слова, а также выучите первые слова на английском.",
    slice: SliceIcon_1,
    transition: "fade-left",
  },
  {
    id: "02",
    title: "Построение простых предложений",
    body: "Познакомимся с правилами построения утвердительных, отрицательных и вопросительных предложений. ",
    slice: SliceIcon_2,
    transition: "fade-right",
  },
  {
    id: "03",
    title: "Приветствия/знакомство",
    body: "В этом разделе вы выучите основные выражения для начинающих: фразы используемые при знакомстве, приветствие в зависимости от времени суток, фразы для шопинга, для путешествий, для досуга (посещения кино, театра, ресторана, выставки, зоопарка)",
    slice: SliceIcon_3,
    transition: "fade-left",
  },
  {
    id: "04",
    title: "Времена",
    body: "Подробно изучим: Present Continuous · Present Simple · Past Simple · Past Continuous · Present Perfect · Future Simple.",
    slice: SliceIcon_4,
    transition: "fade-left",
  },
  {
    id: "05",
    title: "Исчисляемые и неисчисляемые",
    body: "Употребление some, any, many, much, a lot of. Различия и нюансы употребления.",
    slice: SliceIcon_3,
    transition: "fade-right",
  },
  {
    id: "06",
    title: "Время",
    body: "В этом разделе, мы изучим как правильно говорить о времени. Употребление past, half past, to, quarter и различные примеры употребления.",
    slice: SliceIcon_1,
    transition: "fade-left",
  },
];
