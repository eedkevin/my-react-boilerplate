const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: './build/messages',
  translationsDirectory: 'src/translations',
  languages: ['en', 'zh-Hans', 'zh-Hant'],
});
