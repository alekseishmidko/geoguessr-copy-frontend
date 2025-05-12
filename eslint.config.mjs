import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      // Запрещаем использование console.log в продакшн коде
      "no-console": ["error", { allow: ["warn", "error"] }],

      // Требуем явное указание типа для экспортируемых сущностей
      "@typescript-eslint/explicit-module-boundary-types": "error",

      // Запрещаем использование типа any
      "@typescript-eslint/no-explicit-any": "warn",

      // Требуем использования согласованных типов при приведение типов
      "@typescript-eslint/consistent-type-assertions": "error",

      // Запрещаем ненужные экспортируемые типы
      "@typescript-eslint/no-unused-vars": "warn",

      // Добавить другие правила, если необходимо
      "no-unused-vars": "off", // Выключаем стандартное правило для unused-vars в пользу TypeScript версии
      "@typescript-eslint/no-inferrable-types": "off", // Отключаем предупреждения о неявно определенных типах
    },
  },
];

export default eslintConfig;
