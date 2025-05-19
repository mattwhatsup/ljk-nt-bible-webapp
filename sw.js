/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-1a24de20'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "apple-touch-icon.png",
    "revision": "43ff7b31a0acb47db42e678df0b86dd7"
  }, {
    "url": "assets/index-B0nVd5_-.js",
    "revision": null
  }, {
    "url": "assets/index-oa8OvAR6.css",
    "revision": null
  }, {
    "url": "favicon-96x96.png",
    "revision": "529d24a0a13ac4bae5c49b40be117998"
  }, {
    "url": "favicon.ico",
    "revision": "69ced9a8cd3ccd595b2e5fad35312a28"
  }, {
    "url": "favicon.svg",
    "revision": "039ceb16c1ff2548b6c0f40df839e007"
  }, {
    "url": "index.html",
    "revision": "8824d25b907f1b7c3d84c302a83481fb"
  }, {
    "url": "mask-icon.svg",
    "revision": "039ceb16c1ff2548b6c0f40df839e007"
  }, {
    "url": "offline.html",
    "revision": "fbe2116bafc710d9c7a2726410aae849"
  }, {
    "url": "registerSW.js",
    "revision": "01a4cd97d457afb7c2b7c5c2828f05ba"
  }, {
    "url": "web-app-manifest-192x192.png",
    "revision": "cf822853bbf7a6d5fc0b83a32d310789"
  }, {
    "url": "web-app-manifest-512x512.png",
    "revision": "d985829e7c690479b8d10b1e0b85cf79"
  }, {
    "url": "resources/cn-1co.json",
    "revision": "0ac91cd8bc3d2db2fa097d7618e2cc4a"
  }, {
    "url": "resources/cn-1jo.json",
    "revision": "01fb20470d4555f72286b3e4283ca51f"
  }, {
    "url": "resources/cn-1pe.json",
    "revision": "841fce28194e71d6aa5b043d99a2645e"
  }, {
    "url": "resources/cn-1th.json",
    "revision": "c2f985a9a78f18980ec339c33d8a03a6"
  }, {
    "url": "resources/cn-1ti.json",
    "revision": "13e5b96d14e0f2b8dd7d89fd32dd5128"
  }, {
    "url": "resources/cn-2co.json",
    "revision": "5eebe7b0ea795d921bd7a0c81673fbff"
  }, {
    "url": "resources/cn-2jo.json",
    "revision": "a11e8d94024b48bff2b607c6b4a6b39d"
  }, {
    "url": "resources/cn-2pe.json",
    "revision": "0acc21bc84c76385959b4e7dac7163ff"
  }, {
    "url": "resources/cn-2th.json",
    "revision": "ce09dbb24528139c6c4bba862bbc7185"
  }, {
    "url": "resources/cn-2ti.json",
    "revision": "feabdc0386b2fc1ac563431374a8ddcd"
  }, {
    "url": "resources/cn-3jo.json",
    "revision": "55400003d457ab9a69278f9ba7ff4dba"
  }, {
    "url": "resources/cn-act.json",
    "revision": "4c9ff3e2c15a08b9adb5024f215809c0"
  }, {
    "url": "resources/cn-bibliography.json",
    "revision": "743b7cb656342bb9f6d9bbfa30e8d525"
  }, {
    "url": "resources/cn-col.json",
    "revision": "9ac0136fbf2ed019d3e2a4b70ffd2ef9"
  }, {
    "url": "resources/cn-eph.json",
    "revision": "69d6d88fd5e2665536c114bd0f73696b"
  }, {
    "url": "resources/cn-gal.json",
    "revision": "b4cd9c7e582f2618c51494e1dc0186d0"
  }, {
    "url": "resources/cn-heb.json",
    "revision": "0fb7a433201fcd3ea1fa6f09e2e775de"
  }, {
    "url": "resources/cn-history.json",
    "revision": "ce582cdfc90ab9e265380deaff318b8b"
  }, {
    "url": "resources/cn-jas.json",
    "revision": "76099fa224f0b4fc124440d3c884b3fc"
  }, {
    "url": "resources/cn-joh.json",
    "revision": "b7bfd6406bf921b5ec5ee7546872ea91"
  }, {
    "url": "resources/cn-jud.json",
    "revision": "2bd707c11e279c97fef4be52568ece0e"
  }, {
    "url": "resources/cn-lk.json",
    "revision": "900cabc967fa2722ecce30347813b42a"
  }, {
    "url": "resources/cn-mk.json",
    "revision": "a3cf2b7b7fb02c69279ff9a4e31891ab"
  }, {
    "url": "resources/cn-mt.json",
    "revision": "62733ed766f47c056a4099846193a4ca"
  }, {
    "url": "resources/cn-phi.json",
    "revision": "8563029ee0e8ec6ffa0c07117307a359"
  }, {
    "url": "resources/cn-phm.json",
    "revision": "5b93af2fc9f21039a657891d292df892"
  }, {
    "url": "resources/cn-preface.json",
    "revision": "7ffff396b6ae10428ad3b67e7fafff41"
  }, {
    "url": "resources/cn-rev.json",
    "revision": "545bd1ee188fe633536496e90570e80c"
  }, {
    "url": "resources/cn-rom.json",
    "revision": "c494293245a635c101fd62d09cd52510"
  }, {
    "url": "resources/cn-tit.json",
    "revision": "00fba124ee1eb522765a18a2e2158085"
  }, {
    "url": "resources/tw-1co.json",
    "revision": "954989cde04ca843801d9a4c277611b6"
  }, {
    "url": "resources/tw-1jo.json",
    "revision": "ac4fd63c9938b33179c97b1f65551345"
  }, {
    "url": "resources/tw-1pe.json",
    "revision": "f66ac351d8edd36cc77c5852a04db5d7"
  }, {
    "url": "resources/tw-1th.json",
    "revision": "d347e539bd23da15e278b721276e066a"
  }, {
    "url": "resources/tw-1ti.json",
    "revision": "d11fbfc513c4759dfc24a8a7e4613bed"
  }, {
    "url": "resources/tw-2co.json",
    "revision": "bc80329f0344f5c3e3c1f60b09292855"
  }, {
    "url": "resources/tw-2jo.json",
    "revision": "c75660adff8987c30bf6e00e4227531e"
  }, {
    "url": "resources/tw-2pe.json",
    "revision": "a011f1afd31ab7e2a3eab9e40b8b183a"
  }, {
    "url": "resources/tw-2th.json",
    "revision": "71689493a6f8035d5876d9893a823dbd"
  }, {
    "url": "resources/tw-2ti.json",
    "revision": "e7806047f021cc671a884d805b821647"
  }, {
    "url": "resources/tw-3jo.json",
    "revision": "8a74152a215cbba2bb46d025bf237988"
  }, {
    "url": "resources/tw-act.json",
    "revision": "2c2af35dd5b2f26c475dd9c568c0adcb"
  }, {
    "url": "resources/tw-bibliography.json",
    "revision": "cba72ba2747efc34d87a335541034d30"
  }, {
    "url": "resources/tw-col.json",
    "revision": "d2295088603e60096faf4f6f60f54eca"
  }, {
    "url": "resources/tw-eph.json",
    "revision": "8691a6cff9f3c27f3de4cd90f9bfdd71"
  }, {
    "url": "resources/tw-gal.json",
    "revision": "566abda02daf4a7efa174fa679e017f8"
  }, {
    "url": "resources/tw-heb.json",
    "revision": "a8c447219e0f572da127e522a9d68641"
  }, {
    "url": "resources/tw-history.json",
    "revision": "ce582cdfc90ab9e265380deaff318b8b"
  }, {
    "url": "resources/tw-jas.json",
    "revision": "57e4c8419e3e2ee35bdda78666b933f8"
  }, {
    "url": "resources/tw-joh.json",
    "revision": "8651768755de1040f8bb27db6532894b"
  }, {
    "url": "resources/tw-jud.json",
    "revision": "daeda16a531f5f984a8c581eef7f1186"
  }, {
    "url": "resources/tw-lk.json",
    "revision": "93503501c9316122759e935bd5939662"
  }, {
    "url": "resources/tw-mk.json",
    "revision": "5082a50a22f548100c7f86b219f4af2f"
  }, {
    "url": "resources/tw-mt.json",
    "revision": "b8cf3cbfa4c27f698b620cc089a2a542"
  }, {
    "url": "resources/tw-phi.json",
    "revision": "af5e76214b2e074d982b1d8fe36b3770"
  }, {
    "url": "resources/tw-phm.json",
    "revision": "aacdacb3596d266fc78da47be32297cb"
  }, {
    "url": "resources/tw-preface.json",
    "revision": "c7225cfb0db75c5af69eeeee6ecc0616"
  }, {
    "url": "resources/tw-rev.json",
    "revision": "440abaca4312ec03d2a3f2780f13c50d"
  }, {
    "url": "resources/tw-rom.json",
    "revision": "f0c43fe71bc06a416da9a8e6620341c8"
  }, {
    "url": "resources/tw-tit.json",
    "revision": "e92c9d21df6aa49b286c2f7b975b4f4e"
  }, {
    "url": "resources/cn-1co.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-1jo.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-1pe.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-1th.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-1ti.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-2co.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-2jo.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-2pe.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-2th.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-2ti.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-3jo.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-act.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-bibliography.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-col.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-eph.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-gal.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-heb.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-history.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-jas.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-joh.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-jud.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-lk.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-mk.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-mt.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-phi.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-phm.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-preface.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-rev.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-rom.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/cn-tit.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-1co.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-1jo.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-1pe.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-1th.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-1ti.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-2co.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-2jo.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-2pe.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-2th.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-2ti.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-3jo.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-act.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-bibliography.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-col.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-eph.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-gal.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-heb.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-history.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-jas.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-joh.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-jud.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-lk.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-mk.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-mt.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-phi.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-phm.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-preface.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-rev.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-rom.json",
    "revision": "0.0.0"
  }, {
    "url": "resources/tw-tit.json",
    "revision": "0.0.0"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "43ff7b31a0acb47db42e678df0b86dd7"
  }, {
    "url": "favicon.ico",
    "revision": "69ced9a8cd3ccd595b2e5fad35312a28"
  }, {
    "url": "web-app-manifest-192x192.png",
    "revision": "cf822853bbf7a6d5fc0b83a32d310789"
  }, {
    "url": "web-app-manifest-512x512.png",
    "revision": "d985829e7c690479b8d10b1e0b85cf79"
  }, {
    "url": "manifest.webmanifest",
    "revision": "cea2c37f0d693bb73515cea0eb9c9cdb"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(({
    url
  }) => {
    const base2 = "/ljk-nt-bible-webapp" ;
    return url.pathname.startsWith(`${base2}/resources/`);
  }, new workbox.NetworkFirst({
    "cacheName": "static-resources",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 100,
      maxAgeSeconds: 2592000
    })]
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
