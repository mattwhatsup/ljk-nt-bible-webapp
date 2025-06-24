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
    "url": "assets/index-DFabw8P8.js",
    "revision": null
  }, {
    "url": "assets/index-tEY7HlhM.css",
    "revision": null
  }, {
    "url": "favicon-96x96.png",
    "revision": "0cc4049d109db636987b51d003d2f611"
  }, {
    "url": "favicon.ico",
    "revision": "f6b870dbd2c28caf09a2bfb1f9ecc061"
  }, {
    "url": "favicon.svg",
    "revision": "5b18e5c1f8ba1aac7345e361cc721b77"
  }, {
    "url": "index.html",
    "revision": "f794126a2e257b93e10eb7ae600cbe15"
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
    "revision": "bba748bd41a30b46c6c37e1da059208c"
  }, {
    "url": "web-app-manifest-512x512.png",
    "revision": "1501e832e9946feba2cb38585cad02b5"
  }, {
    "url": "resources/cn-1co.json",
    "revision": "48b54c30df768dd13127e813059aedf6"
  }, {
    "url": "resources/cn-1jo.json",
    "revision": "33bd4dc5df70b6c3531f4e96c03dec4d"
  }, {
    "url": "resources/cn-1pe.json",
    "revision": "841fce28194e71d6aa5b043d99a2645e"
  }, {
    "url": "resources/cn-1th.json",
    "revision": "f34f314e3e0b567204f733863c80693e"
  }, {
    "url": "resources/cn-1ti.json",
    "revision": "40cad78950e0d4ccdbedb53f57adfd37"
  }, {
    "url": "resources/cn-2co.json",
    "revision": "547910ca694008a4bf25b5214c449b1b"
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
    "revision": "fefbe812776b4e5b594e956650e7fa32"
  }, {
    "url": "resources/cn-bibliography.json",
    "revision": "743b7cb656342bb9f6d9bbfa30e8d525"
  }, {
    "url": "resources/cn-col.json",
    "revision": "7d8054d5f3c3d5433ae097282918f409"
  }, {
    "url": "resources/cn-eph.json",
    "revision": "038c55088fe2402827935ec84f69a974"
  }, {
    "url": "resources/cn-gal.json",
    "revision": "e654190c975c4fac0b0d74a8735b59af"
  }, {
    "url": "resources/cn-heb.json",
    "revision": "0fb7a433201fcd3ea1fa6f09e2e775de"
  }, {
    "url": "resources/cn-history.json",
    "revision": "1bf26861aaa09733cc62d078fcf424c4"
  }, {
    "url": "resources/cn-jas.json",
    "revision": "76099fa224f0b4fc124440d3c884b3fc"
  }, {
    "url": "resources/cn-joh.json",
    "revision": "984da6e38f981349af097cfc02f855ec"
  }, {
    "url": "resources/cn-jud.json",
    "revision": "2bd707c11e279c97fef4be52568ece0e"
  }, {
    "url": "resources/cn-lk.json",
    "revision": "faa49ab87ae8ad5338c5f06864d97bed"
  }, {
    "url": "resources/cn-mk.json",
    "revision": "baf5a737f431e398fb6f80ec276ca542"
  }, {
    "url": "resources/cn-mt.json",
    "revision": "0b4c5545355d00cbdc0f20c3e07c4cbf"
  }, {
    "url": "resources/cn-phi.json",
    "revision": "8a3774cd617f1c5c5fb0f8b47933bd1e"
  }, {
    "url": "resources/cn-phm.json",
    "revision": "b6db46ed721c9e7eeb5469d7d48ab990"
  }, {
    "url": "resources/cn-preface.json",
    "revision": "ecf15d965384760597e761f71337f511"
  }, {
    "url": "resources/cn-rev.json",
    "revision": "545bd1ee188fe633536496e90570e80c"
  }, {
    "url": "resources/cn-rom.json",
    "revision": "8b2f202e4ef42c542553cb6f7dbb8dfc"
  }, {
    "url": "resources/cn-tit.json",
    "revision": "69d90dc0fc4b58c6824b28dae5c64ead"
  }, {
    "url": "resources/tw-1co.json",
    "revision": "411de3aff2690fd3d9fd448689adf827"
  }, {
    "url": "resources/tw-1jo.json",
    "revision": "c22598d05fb02bdb61369ad235561c36"
  }, {
    "url": "resources/tw-1pe.json",
    "revision": "f66ac351d8edd36cc77c5852a04db5d7"
  }, {
    "url": "resources/tw-1th.json",
    "revision": "7be3048202c8877ac10f36f53ae57340"
  }, {
    "url": "resources/tw-1ti.json",
    "revision": "23a91e752c5d29b8b99b77e7f724f7c3"
  }, {
    "url": "resources/tw-2co.json",
    "revision": "a3da4c1827dc2959fab7cea96ddee367"
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
    "revision": "2654ede1b65b251855a4495188f2684b"
  }, {
    "url": "resources/tw-bibliography.json",
    "revision": "ac2e3728d1de4e3b0c6cd81f14523995"
  }, {
    "url": "resources/tw-col.json",
    "revision": "d88fb6f6746a89edeeb8da7fec7a9765"
  }, {
    "url": "resources/tw-eph.json",
    "revision": "8424934d1d70dc238d8f1e40fb9aae46"
  }, {
    "url": "resources/tw-gal.json",
    "revision": "bb83aae2ab5efc56f5e99c493be82eb8"
  }, {
    "url": "resources/tw-heb.json",
    "revision": "a8c447219e0f572da127e522a9d68641"
  }, {
    "url": "resources/tw-history.json",
    "revision": "56f2dba2129bcd8a846d0ba9bdd257b0"
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
    "revision": "732a7166afe0ac4c3ac86c1216f7b389"
  }, {
    "url": "resources/tw-mk.json",
    "revision": "d216008b279dc8475ed2a19333666905"
  }, {
    "url": "resources/tw-mt.json",
    "revision": "178e74902fbdc27b51b2fee8f850fa5f"
  }, {
    "url": "resources/tw-phi.json",
    "revision": "f031097a646fb3fc16ff80ee9ec9ba0e"
  }, {
    "url": "resources/tw-phm.json",
    "revision": "48bddf1042bf7f9c7951ace20f257a99"
  }, {
    "url": "resources/tw-preface.json",
    "revision": "36bc1ef2170f3b3d6c1a989410f0c7ac"
  }, {
    "url": "resources/tw-rev.json",
    "revision": "0949c71d377730c4bd2823a31a8f7b84"
  }, {
    "url": "resources/tw-rom.json",
    "revision": "af490c88c398c9fa37948b5636379281"
  }, {
    "url": "resources/tw-tit.json",
    "revision": "ca12e81a364da584827cef0715d90176"
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
    "revision": "f6b870dbd2c28caf09a2bfb1f9ecc061"
  }, {
    "url": "web-app-manifest-192x192.png",
    "revision": "bba748bd41a30b46c6c37e1da059208c"
  }, {
    "url": "web-app-manifest-512x512.png",
    "revision": "1501e832e9946feba2cb38585cad02b5"
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
