/**
 * Legacy header shim.
 *
 * This used to be a second, entirely separate navigation: a different wordmark,
 * a different type scale, a different mobile pattern and a different set of
 * destinations from the one the rest of the site rendered. Two navigations on
 * one site is a usability problem before it is a maintenance one.
 *
 * It is now a re-export of the single site navigation. The name survives only
 * so the routes that still import `SiteHeader` keep resolving; new code should
 * import `SiteNav` from `components/chrome/nav` directly, and this file goes
 * away when the last of those imports does.
 *
 * The prop shape is unchanged: both take an optional `active` label.
 */
export { SiteNav as SiteHeader } from './chrome/nav';
