import type { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages'))
  },
  {
    path: '/docs',
    component: lazy(() => import('./pages/docs'))
  },
  {
    path: '/docs/:package',
    component: lazy(() => import('./pages/docs/[package]'))
  },
  {
    path: '/docs/:package/:version',
    children: [
      {
        path: '/',
        component: lazy(() => import('./pages/docs/[package]/[version]'))
      },
      {
        path: '/namespace/*namespace',
        component: lazy(() => import('./pages/docs/[package]/[version]/namespace/[namespace]'))
      },
      {
        path: '/class/:class',
        component: lazy(() => import('./pages/docs/[package]/[version]/class/[class]'))
      },
      {
        path: '/function/:function',
        component: lazy(() => import('./pages/docs/[package]/[version]/function/[function]'))
      },
      {
        path: '/interface/:interface',
        component: lazy(() => import('./pages/docs/[package]/[version]/interface/[interface]'))
      },
      {
        path: '/type-alias/:typeAlias',
        component: lazy(() => import('./pages/docs/[package]/[version]/type-alias/[typeAlias]'))
      },
      {
        path: '/enum/:enum',
        component: lazy(() => import('./pages/docs/[package]/[version]/enum/[enum]'))
      },
      {
        path: '/variable/:variable',
        component: lazy(() => import('./pages/docs/[package]/[version]/variable/[variable]'))
      }
    ]
  },
  {
    path: '*',
    component: lazy(() => import('./pages/[...all]'))
  }
];
