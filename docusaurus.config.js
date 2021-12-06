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
          editUrl: 'https://github.com/apache/incubator-linkis-website/edit/master/',
        },
        blog: {
          // showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/apache/incubator-linkis-website/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'announcementBar-2', // Increment on change
        content: `⭐️ &nbsp; If you like Apache Linkis , give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/apache/incubator-linkis">GitHub</a>`,
        backgroundColor: "#BBDFFF",
      },
      navbar: {
        title: 'Apache Linkis(Incubating)',
        logo: {
          alt: 'Apache',
          src: 'img/logo.png',
        },
        items: [
          {
            to: '/',
            position: 'left',
            label: 'Home',
            activeBaseRegex: `^/$`,
          },
//          {
//            position: 'left',
//            label: 'Doc',
//            to: "/docs/user_guide/quick_start",
//            items: [
//              {
//                label: "Next",
//                to: "/docs/next/user_guide/quick_start",
//              },
//              {
//                label: "0.11.0",
//                to: "/docs/user_guide/quick_start",
//              },
//              {
//                label: "All versions",
//                to: "/versions/",
//              },
//            ],
//          },
        {
            to: '/faq/index',
            position: 'left',
            label: 'FAQ',
            activeBaseRegex: `/faq/`,
          },
          {
            to: '/download/index',
            position: 'left',
            label: 'Download',
            activeBaseRegex: `/download/`,
          },
          {
            to: '/development/how-to-contribute',
            label: 'Development',
            position: 'left',
            activeBaseRegex: `/development/`,
          },
          {
              to: '/team',
              label: 'Team',
              position: 'left',
              activeBaseRegex: `/team`,
          },
//          {
//            to: '/blog/how-to-used',
//            label: 'Blog',
//            position: 'left'
//          },


//          {
//            label: 'ASF',
//            position: 'left',
//            items: [
//              {
//                label: "Foundation",
//                to: "https://www.apache.org/",
//              },
//              {
//                label: "License",
//                to: "https://www.apache.org/licenses/",
//              },
//              {
//                label: "Events",
//                to: "https://www.apache.org/events/",
//              },
//              {
//                label: "Security",
//                to: "https://www.apache.org/security/",
//              },
//              {
//                label: "Sponsorship",
//                to: "https://www.apache.org/foundation/sponsorship.html",
//              },
//              {
//                label: "Thanks",
//                to: "https://www.apache.org/foundation/thanks.html",
//              },
//            ],
//          },
//          {
//            type: 'localeDropdown',
//            position: 'right',
//          },
//          {
//            href: 'https://github.com/apache/incubator-Linkis',
//            label: 'GitHub',
//            position: 'right',
//          },

          {
            position: 'right',
            label: 'Doc',
            to: "/docs/user_guide/overview",
            items: [
              {
                label: "Next",
                to: "/docs/next/user_guide/overview",
              },
              {
                label: "1.0.2",
                to: "/docs/user_guide/overview",
              },
              {
                label: "All versions",
                to: "/versions/",
              },
            ],
          },
//           {
//              type: 'docsVersionDropdown',
//              position: 'right',
//              dropdownActiveClassDisabled: true,
//              dropdownItemsAfter: [
//                {
//                  to: '/versions',
//                  label: 'All versions',
//                },
//              ],
//           },
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
//      footer: {
//        // style: 'dark',
//        // links: [
//        //   {
//        //     title: 'Docs',
//        //     items: [
//        //       {
//        //         label: 'Tutorial',
//        //         to: '/docs/quick_start',
//        //       },
//        //     ],
//        //   },
//        //   {
//        //     title: 'Community',
//        //     items: [
//        //       {
//        //         label: 'Stack Overflow',
//        //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
//        //       },
//        //       {
//        //         label: 'Discord',
//        //         href: 'https://discordapp.com/invite/docusaurus',
//        //       },
//        //       {
//        //         label: 'Twitter',
//        //         href: 'https://twitter.com/docusaurus',
//        //       },
//        //     ],
//        //   },
//        //   {
//        //     title: 'More',
//        //     items: [
//        //       {
//        //         label: 'Blog',
//        //         to: '/blog',
//        //       },
//        //       {
//        //         label: 'GitHub',
//        //         href: 'https://github.com/apache/incubator-Linkis',
//        //       },
//        //     ],
//        //   },
//        // ],
//        logo: {
//          alt: 'Apache Linkis',
//          src: 'img/incubator-logo.svg',
//          href: 'https://Linkis.apache.org',
//        },
//        copyright: `<div style="text-align: left;">
//          <div>
//            <p style="font-family: Avenir-Medium;font-size: 14px;color: #999;line-height: 20px;">Apache Linkis (incubating) is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.</p>
//          </div>
//          <div style="border-top: 1px solid #ccc;min-height: 60px;line-height: 20px;text-align: center;font-family: Avenir-Medium;font-size: 14px;color: #999;display: flex;align-items: center;"><span>Copyright © 2019-2020 The Apache Software Foundation. Apache Linkis, Linkis, and its feather logo are trademarks of The Apache Software Foundation.</span></div>
//        </div>`,
//      },

     footer: {
          style: 'light',
          links: [
            {
              title: 'Linkis',
              items: [
//                {
//                    label: 'Documentation',
//                    to: '/docs',
//                },
//                {
//                  label: 'FAQ',
//                  to: '/faq',
//                },
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
              title: 'Apache Software Foundation',
              items: [
                {
                  label: 'Foundation',
                  href: 'https://www.apache.org/',
                },
                {
                  label: 'License',
                  href: 'https://www.apache.org/licenses/LICENSE-2.0',
                },
                {
                  label: 'Sponsorship',
                  href: 'https://www.apache.org/foundation/sponsorship.html',
                },
                {
                  label: 'Thanks',
                  href: 'http://www.apache.org/foundation/thanks.html',
                },
              ],
            },
          ],
//          copyright: `
//            Copyright © ${new Date().getFullYear()} The Apache Software Foundation.
//            Apache Linkis, Apache Incubator, Linkis, Apache, the Apache feather logo,
//            the Apache Linkis logo and the Apache Incubator project logo
//            are trademarks of The Apache Software Foundation.
//          `,
//        logo: {
//          alt: 'Apache Linkis',
//          src: 'img/incubator-logo.svg',
//          href: 'https://linkis.apache.org',
//        },
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
        id: 'development',
        path: 'development',
        routeBasePath: 'development',
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          if (locale !== 'en') {
            return `https://github.com/apache/incubator-linkis-website/edit/master/i18n/${locale}/${docPath}`;
          }
          return `https://github.com/apache/incubator-linkis-website/edit/master/${versionDocsDirPath}/${docPath}`;
        },
        sidebarPath: require.resolve('./sidebarsDevelopment.js'),
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
            return `https://github.com/apache/incubator-linkis-website/edit/master/i18n/${locale}/${docPath}`;
          }
          return `https://github.com/apache/incubator-linkis-website/edit/master/${versionDocsDirPath}/${docPath}`;
        },
        sidebarPath: require.resolve('./sidebarsDevelopment.js'),
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
                return `https://github.com/apache/incubator-linkis-website/edit/master/i18n/${locale}/${docPath}`;
              }
              return `https://github.com/apache/incubator-linkis-website/edit/master/${versionDocsDirPath}/${docPath}`;
            },
            sidebarPath: require.resolve('./sidebarsDevelopment.js'),
          },
        ],
  ]
});
