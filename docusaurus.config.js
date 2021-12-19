const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  // omit unrelated docusaurus options
  title: 'Apache Linkis',
  tagline: 'Apache Linkis',
  url: 'https://linkis.apache.org',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Apache Linkis', // Usually your GitHub org/user name.
  projectName: 'Apache Linkis', // Usually your repo name.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-CN"],
    localeConfigs: {
      en: {
        label: "English",
        direction: 'ltr',
      },
      'zh-CN': {
        label: "简体中文",
        direction: 'ltr',
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
          editLocalizedFiles: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/apache/incubator-linkis-website/edit/dev/',
           versions: {
              current: {
                //label: 'Next v1.0.3 (WIP)',
                path: '1.0.3',
                //banner: 'none',
              },
              '1.0.2': {
                //label: 'v1.0.2',
                path: 'latest',
                //banner: 'unmaintained',
              }
            }
        },
        blog: {
          // showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/apache/incubator-linkis-website/edit/dev/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    (
    {
//     algolia: {
//          apiKey: 'xxx',
//          indexName: 'apache_linkis',
//       },
      colorMode: {
          defaultMode: 'light',
          disableSwitch: true
      },
//      announcementBar: {
//        id: 'announcementBar-2', // Increment on change
//        content: `⭐️ &nbsp; If you like Apache Linkis , give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/apache/incubator-linkis">GitHub</a>`,
//        backgroundColor: "#BBDFFF",
//      },
      navbar: {
       title: 'Apache EventMesh (Incubating)',
        title: 'Apache Linkis(Incubating)',
        logo: {
          alt: 'Apache Linkis Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            to: '/',
            position: 'left',
            label: 'Home',
            activeBaseRegex: `^/$`,
          },
        {
            to: '/faq/main',
            position: 'left',
            label: 'FAQ',
            activeBaseRegex: `/faq/`,
          },
          {
            to: '/download/main',
            position: 'left',
            label: 'Download',
            activeBaseRegex: `/download/`,
          },
          {
            to: '/community/how-to-subscribe',
            label: 'Community',
            position: 'left',
            activeBaseRegex: `/community/`,
          },
          {
              to: '/team',
              label: 'Team',
              position: 'left',
              activeBaseRegex: `/team`,
          },
         {
            to: '/user',
            label: 'Users',
            position: 'left',
            activeBaseRegex: `/user`,
          },
          {
            label: 'ASF',
            position: 'left',
            items: [
              {
                label: "Foundation",
                to: "https://www.apache.org/",
              },
              {
                label: "License",
                to: "https://www.apache.org/licenses/",
              },
              {
                label: "Events",
                to: "https://www.apache.org/events/",
              },
              {
                label: "Security",
                to: "https://www.apache.org/security/",
              },
              {
                label: "Sponsorship",
                to: "https://www.apache.org/foundation/sponsorship.html",
              },
              {
                label: "Thanks",
                to: "https://www.apache.org/foundation/thanks.html",
              },
            ],
          },
          {
            position: 'right',
            label: 'Doc',
//            to: "/docs/user_guide/overview",
            items: [
              {
                label: "Next-1.0.3 (WIP)",
                to: "/docs/1.0.3/introduction",
              },
              {
                label: "1.0.2",
                to: "/docs/latest/introduction",
              },
              {
                label: "All versions",
                to: "/versions/",
              },
            ],
          },
           {
              href: 'https://github.com/apache/incubator-linkis',
              label: 'GitHub',
              position: 'right',
           },
           {
              type: "localeDropdown",
              position: "right",
           },
        ],
      },
     footer: {
          style: 'light',
          links: [
            {
              title: 'Linkis',
              items: [
                {
                  label: 'Document',
                  href: '/docs/latest/introduction',
                },
                {
                  label: 'FAQ',
                  href: '/faq/main',
                },
                {
                  label: 'Releases',
                  href: 'https://github.com/apache/incubator-linkis/releases',
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'GitHub',
                  href: 'https://github.com/apache/incubator-linkis',
                },
                {
                  label: 'Issue Tracker',
                  href: 'https://github.com/apache/incubator-linkis/issues',
                },
                {
                  label: 'Pull Requests',
                  href: 'https://github.com/apache/incubator-linkis/pulls',
                },
              ],
            },
            {
              title: 'Subscribe Mailing List',
              items: [
                {
                  label: 'How to Subscribe',
                  to: '/community/how-to-subscribe',
                },
                {
                  label: 'Subscribe Mail',
                  href: 'mailto:dev-subscribe@linkis.apache.org',
                },
                {
                  label: 'Mail Archive',
                  href: 'https://lists.apache.org/list.html?dev@linkis.apache.org',
                },
              ],
            },
//            {
                //              title: 'Apache Software Foundation',
                //              items: [
                //
                //                {
                //                  label: 'Events',
                //                  href: 'https://www.apache.org/events/current-event',
                //                },
                //                {
                //                  label: 'Thanks',
                //                  href: 'http://www.apache.org/foundation/thanks.html',
                //                },
                //                {
                //                  label: 'License',
                //                  href: 'https://www.apache.org/licenses/',
                //                },
                //                {
                //                  label: 'Security',
                //                  href: 'https://www.apache.org/security/',
                //                },
                //                {
                //                  label: 'Sponsorship',
                //                  href: 'https://www.apache.org/foundation/sponsorship.html',
                //                },
                //                {
                //                  label: 'Foundation',
                //                  href: 'https://www.apache.org/',
                //                }
                //              ],
                //            },
          ],
         copyright: `<div><img style="height:50px" alt="Apache Software Foundation" src="/img/incubator-logo.svg" /><p style="color: #999999;  padding: 0 20px 30px;font-weight:400;text-align:left">Apache Linkis is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p></p>
             <p style="padding: 0 20px 30px;color: #999999;font-weight: 400;"> Copyright © ${new Date().getFullYear()} The Apache Software Foundation. Licensed under the Apache License, Version 2.0. Apache Linkis, Apache Incubator, Apache, the Apache feather logo, the Apache Linkis logo and the Apache Incubator project logo are trademarks of The Apache Software Foundation.</p>
             <div>`,
        },
      prism: {
        theme: require('prism-react-renderer/themes/dracula'),
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    'docusaurus-plugin-less',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          if (locale !== 'en') {
            return `https://github.com/apache/incubator-linkis-website/edit/dev/i18n/${locale}/${docPath}`;
          }
          return `https://github.com/apache/incubator-linkis-website/edit/dev/${versionDocsDirPath}/${docPath}`;
        },
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'download',
        path: 'download',
        routeBasePath: 'download',
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          if (locale !== 'en') {
            return `https://github.com/apache/incubator-linkis-website/edit/dev/i18n/${locale}/${docPath}`;
          }
          return `https://github.com/apache/incubator-linkis-website/edit/dev/${versionDocsDirPath}/${docPath}`;
        },
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
      },
    ],

     [
          '@docusaurus/plugin-content-docs',
          {
            id: 'faq',
            path: 'faq',
            routeBasePath: 'faq',
            editUrl: ({locale, versionDocsDirPath, docPath}) => {
              if (locale !== 'en') {
                return `https://github.com/apache/incubator-linkis-website/edit/dev/i18n/${locale}/${docPath}`;
              }
              return `https://github.com/apache/incubator-linkis-website/edit/dev/${versionDocsDirPath}/${docPath}`;
            },
            sidebarPath: require.resolve('./sidebarsCommunity.js'),
          },
     ],
  ]
});
