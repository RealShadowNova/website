import { Meta, MetaProvider } from '@solidjs/meta';
import { Router, useRoutes } from '@solidjs/router';
import type { Component } from 'solid-js';
import { routes } from './routes';

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <MetaProvider>
      <Meta name='title' content='RealShadowNova' />
      <Meta name='description' content='The personal portfolio website of Hezekiah Hendry, aka RealShadowNova' />

      <Meta property='og:type' content='website' />
      <Meta property='og:url' content='https://shadownova.dev' />
      <Meta property='og:title' content='RealShadowNova' />
      <Meta property='og:description' content='The personal portfolio website of Hezekiah Hendry, aka RealShadowNova' />

      <Router>
        <div id='container'>
          <Routes />
        </div>
      </Router>
    </MetaProvider>
  );
};

export default App;
