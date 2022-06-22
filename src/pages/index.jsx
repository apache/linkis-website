import React, { useEffect } from 'react';
import { throttle } from 'lodash-es';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Home from './home'
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function() {
  const isBrowser = useIsBrowser();
  const {siteConfig} = useDocusaurusContext();
  const {globalData} = useDocusaurusContext();

  globalData['docusaurus-plugin-content-docs'].default.versions[1].label = '1.1.1';
  globalData['docusaurus-plugin-content-docs'].default.versions[1].isLast = false;
  globalData['docusaurus-plugin-content-docs'].default.versions[0].isLast = true;


  const pathname = isBrowser && location.pathname

  const isIndexPage = () => {
    if (pathname === '/' || pathname === '/zh-CN/') {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (isBrowser) {
      const nav = document.getElementsByTagName('nav')[0];
      const classList = nav &&  nav.classList;
      if(!classList) return;
      if (isIndexPage()) {
        classList.add('index-nav');
      } else {
        classList.remove('index-nav');
      }

     // dealing scoll nav style of Index Page
      window.onscroll = throttle((e) => {
        try {
          if (isIndexPage()) {
            if (e.target.scrollingElement.scrollTop > 0) {
              classList.remove('index-nav');
            } else {
              classList.add('index-nav');
            }
          }
        } catch (err) {
          console.warn(err);
        }
      }, 150);
    }
  }, [isBrowser, pathname])

  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />">
      <main>
        <Home/>
      </main>
    </Layout>
  );
}
