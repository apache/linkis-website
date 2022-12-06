const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  // omit unrelated docusaurus options
  title: 'Apache Linkis',
  tagline: 'Apache Linkis',
  url: 'https://linkis.incubator.apache.org',
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
              path: '1.3.1',
              label: 'Next(1.3.1)'
            },
            '1.3.0': {
              path: 'latest',
            },
          }
        },
        blog: {
          // routeBasePath: '/',
          path: 'blog',
          editUrl: ({
            locale,
            blogDirPath,
            blogPath
          }) => {
            if (locale !== 'en') {
              return `https://github.com/apache/incubator-linkis-website/edit/dev/i18n/${locale}`;
            }
            return `https://github.com/apache/incubator-linkis-website/edit/dev/${blogDirPath}/${blogPath}`;
          },

          postsPerPage: 5,
          feedOptions: {
            type: 'all',
            //copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
          },
          blogSidebarCount: 'ALL'
        },
      community: {
          // routeBasePath: '/',
          path: 'community',
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
            },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],
  themeConfig: {
    algolia: {
      appId: 'AE29KQB3IA',
      apiKey: '9ca054a67ee2403605e78587a518b0d6',
      indexName: 'linkis-apache'
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true
    },
    //     announcementBar: {
    //       id: 'announcementBar-2', // Increment on change
    //       content: `⭐️ &nbsp; If you like Apache Linkis , give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/apache/incubator-linkis">GitHub</a>`,
    //       backgroundColor: "#BBDFFF",
    //     },
    navbar: {
      title: 'Apache Linkis(Incubating)',
      logo: {
        alt: 'Apache Linkis Logo',
        src: 'img/logo.png',
      },
      items: [
//       {
//          to: '/',
//          position: 'left',
//          label: 'Home',
//          activeBaseRegex: `^/$`,
//        },
        /*{
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },*/
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
          to: 'blog',
          label: 'Blog',
          position: 'left',
          activeBaseRegex: `/blog`,
        },
        {
          to: '/team',
          label: 'Team',
          position: 'left',
          activeBaseRegex: `/team`,
        },
//        {
//          to: '/blessing_wall',
//          label: 'Blessing',
//          position: 'left',
//          activeBaseRegex: `/blessing_wall`,
//        },
        {
          to: '/user',
          label: 'Users',
          position: 'left',
          activeBaseRegex: `/user`,
        },
        {
          to: '/faq/main',
          position: 'left',
          label: 'FAQ',
          activeBaseRegex: `/faq/`,
        },
        {
          label: 'Doc',
          position: 'right',
          items: [
            {label: '1.3.0', to: '/docs/latest/introduction'},
            {label: '1.2.0', to: '/docs/1.2.0/introduction'},
            {label: '1.1.1', to: '/docs/1.1.1/introduction'},
            {label: 'Next(1.3.1)', to: '/docs/1.3.1/about/introduction'},
            {label: 'All Version', to: '/versions'}
          ]
        },
        {
          label: 'ASF',
          position: 'left',
          items: [{
              label: "Foundation",
              to: "https://www.apache.org/",
            },
            {
              label: "License",
              to: "https://www.apache.org/licenses/",
            },
            {
              label: "Events",
              to: "https://www.apache.org/events/current-event",
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
              label: "Privacy",
              to: "https://www.apache.org/foundation/policies/privacy.html",
            },
            {
              label: "Thanks",
              to: "https://www.apache.org/foundation/thanks.html",
            },
          ],
        },
        {
          href: 'https://github.com/apache/incubator-linkis',
          'aria-label': 'GitHub',
          className: 'header-github-link',
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
      links: [{
          title: 'Linkis',
          items: [{
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
          items: [{
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
          items: [{
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
      ],
      copyright: `<div><img style="height:50px" alt="Apache Software Foundation" src="/img/incubator-logo.svg" /><p style="color: #999999;  padding: 0 20px 30px;font-weight:400;text-align:left">Apache Linkis is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p></p>
             <p style="padding: 0 20px 30px;color: #999999;font-weight: 400;"> Copyright © ${new Date().getFullYear()} The Apache Software Foundation. Licensed under the Apache License, Version 2.0. Apache Linkis, Apache Incubator, Apache, the Apache feather logo, the Apache Linkis logo and the Apache Incubator project logo are trademarks of The Apache Software Foundation.</p>
             <div>`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
      darkTheme: darkCodeTheme,
    },
    scripts: ['/script/matomo.js'],
  },
  plugins: [
     [
        'docusaurus-plugin-less',
        {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      ],
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebars.js'),
        sidebarCollapsible: true,
        editUrl: ({
          locale,
          versionDocsDirPath,
          docPath
        }) => {
          if (locale !== 'en') {
            return `https://github.com/apache/incubator-linkis-website/edit/dev/i18n/${locale}/${docPath}`;
          }
          return `https://github.com/apache/incubator-linkis-website/edit/dev/${versionDocsDirPath}/${docPath}`;
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'download',
        path: 'download',
        routeBasePath: 'download',
        editUrl: ({
          locale,
          versionDocsDirPath,
          docPath
        }) => {
          if (locale !== 'en') {
            return `https://github.com/apache/incubator-linkis-website/edit/dev/i18n/${locale}/${docPath}`;
          }
          return `https://github.com/apache/incubator-linkis-website/edit/dev/${versionDocsDirPath}/${docPath}`;
        },
      },
    ],

    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'faq',
        path: 'faq',
        routeBasePath: 'faq',
        editUrl: ({
          locale,
          versionDocsDirPath,
          docPath
        }) => {
          if (locale !== 'en') {
            return `https://github.com/apache/incubator-linkis-website/edit/dev/i18n/${locale}/${docPath}`;
          }
          return `https://github.com/apache/incubator-linkis-website/edit/dev/${versionDocsDirPath}/${docPath}`;
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath) {
          if (existingPath.includes('/latest')) {
            return [
              existingPath.replace('/latest', '/1.3.0'),
            ];
          }
          return undefined; // Return a false value: no redirect created
        },
      }
    ]
    //    [
    //      '@docusaurus/plugin-content-docs',
    //      {
    //        id: 'blog',
    //        path: 'blog',
    //        routeBasePath: 'blog',
    //        editUrl: ({locale, versionDocsDirPath, docPath}) => {
    //          if (locale !== 'en') {
    //            return `https://github.com/apache/incubator-linkis-website/edit/dev/i18n/${locale}/${docPath}`;
    //          }
    //          return `https://github.com/apache/incubator-linkis-website/edit/dev/${versionDocsDirPath}/${docPath}`;
    //        },
    //      },
    //    ],

    //    [
    //      '@docusaurus/plugin-content-docs',
    //      {
    //        id: 'blog',
    //        path: 'blog',
    //        routeBasePath: 'blog',
    //        editUrl: ({locale, versionDocsDirPath, docPath}) => {
    //          if (locale !== 'en') {
    //            return `https://github.com/apache/incubator-linkis-website/edit/dev/i18n/${locale}/${docPath}`;
    //          }
    //          return `https://github.com/apache/incubator-linkis-website/edit/dev/${versionDocsDirPath}/${docPath}`;
    //        },
    //      },
    //    ],
  ]
});