/*
 * Copyright 2019 WeBank
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { createI18n } from 'vue-i18n'
import en from './en.json';
import zh from './zh.json';

// 先判断是否有设置语言，没有就用本地语言
let lang = 'en';
const locale = localStorage.getItem('locale');
if (locale) {
  lang = locale;
} else {
  if (navigator.language === 'zh-CN') {
    lang = 'zh-CN';
    localStorage.setItem('locale', 'zh-CN');
  } else {
    lang = 'en';
    localStorage.setItem('locale', 'en');
  }
}

const messages = {
  'en': en,
  'zh-CN': zh
};

const i18n = createI18n({
  locale: lang, // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

export default i18n;