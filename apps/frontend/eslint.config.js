import { config as reactConfig } from "@repo/eslint-config/react-internal";
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  ...reactConfig,
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    ignores: ['dist/**'],
  },
];
