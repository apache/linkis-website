import React from 'react';
import NotFound from '@theme-original/NotFound';
import Layout from '@theme/Layout';

export default function NotFoundWrapper(props) {
  return (
  <Layout>
     <main class="container margin-vert--xl"><div class="row"><div class="col col--6 col--offset-3"><h1 class="hero__title">Page Not Found404</h1><p>We could not find what you were looking for.</p><p>Please contact the owner of the site that linked you to the original URL and let them know their link is broken.</p></div></div>
     </main>
   </Layout>
  );
}
