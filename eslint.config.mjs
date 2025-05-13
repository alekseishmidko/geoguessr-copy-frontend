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
      // ✅ Использование только type-импортов
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],

      // ✅ Запрет console.log кроме warn/error
      "no-console": ["error", { allow: ["warn", "error"] }],

      // ✅ Требовать указания типов у экспортируемых функций
      "@typescript-eslint/explicit-module-boundary-types": "error",

      // ✅ Предупреждать о any
      "@typescript-eslint/no-explicit-any": "warn",

      // ✅ Требовать единый стиль приведения типов
      "@typescript-eslint/consistent-type-assertions": "error",

      // ✅ Предупреждать об неиспользуемых переменных
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // ✅ Неявные типы разрешены
      "@typescript-eslint/no-inferrable-types": "off",

      // ✅ Ограничить вложенность JSX до 3-х уровней
      "react/jsx-max-depth": ["warn", { max: 3 }],

      // ✅ Обязательный key в списках
      "react/jsx-key": "error",

      // ✅ Запретить хук useEffect без зависимостей
      "react-hooks/exhaustive-deps": "warn",

      // ✅ Запретить вызовы хуков вне тела компонента/хука
      "react-hooks/rules-of-hooks": "error",

      // ✅ Обязательное использование PascalCase для компонентов
      "react/jsx-pascal-case": "error",

      // ✅ Не разрешать лишние скобки
      "no-extra-parens": ["warn", "all"],

      // ✅ Обязательный `default` в switch
      "default-case": "warn",

      // ✅ Запрет на пустые блоки
      "no-empty": "error",

      // ✅ Последовательность в if-else
      curly: ["error", "all"],

      // ✅ Запрет на else после return
      "no-else-return": "warn",

      // ✅ Поддержка безопасности: запрет на eval и т.д.
      "no-eval": "error",
      "no-implied-eval": "error",

      // ✅ Константы по возможности
      "prefer-const": "error",

      // ✅ Обязательный возврат в коллбэках
      "array-callback-return": "warn",
    },
  },
];

export default eslintConfig;
