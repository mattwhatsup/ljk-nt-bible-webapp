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
    "url": "apple-touch-icon-2.png",
    "revision": "5d4726e217669b9d446e2de151b1b21d"
  }, {
    "url": "assets/index-DoMu3XQp.js",
    "revision": null
  }, {
    "url": "assets/index-kmGED2z3.css",
    "revision": null
  }, {
    "url": "favicon-2.ico",
    "revision": "2fef8b8fca512c48ef7d262384f29014"
  }, {
    "url": "favicon-2.svg",
    "revision": "bc25ce440fd26506cb11c8311a4c8ac0"
  }, {
    "url": "favicon-96x96-2.png",
    "revision": "74333ed8c75d1f30634875c88abff2ef"
  }, {
    "url": "index.html",
    "revision": "0a1fe0d1fcaa56556aa11ddaa225f183"
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
    "url": "web-app-manifest-192x192-2.png",
    "revision": "ec6723d39e8c059edbaa3cf4f78876ed"
  }, {
    "url": "web-app-manifest-512x512-2.png",
    "revision": "fd94eda02b0f6cf666c414e35707a63c"
  }, {
    "url": "resources/cn-1co.json",
    "revision": "7e84c3c98cfa62ade3356eb32d59428f"
  }, {
    "url": "resources/cn-1jo.json",
    "revision": "3911e878905e4d046af26eccb75847a2"
  }, {
    "url": "resources/cn-1pe.json",
    "revision": "138f58e2d03d9c731b1f280c7d7618cf"
  }, {
    "url": "resources/cn-1th.json",
    "revision": "c12e5472899212a25f35909becb9f6ba"
  }, {
    "url": "resources/cn-1ti.json",
    "revision": "807ec1e2c9716ac42b3675391c32dc75"
  }, {
    "url": "resources/cn-2co.json",
    "revision": "dc37e529c8762cd3078a75b8a126afd0"
  }, {
    "url": "resources/cn-2jo.json",
    "revision": "a11e8d94024b48bff2b607c6b4a6b39d"
  }, {
    "url": "resources/cn-2pe.json",
    "revision": "ab9d62861cc5ac7439014b63cab97b90"
  }, {
    "url": "resources/cn-2th.json",
    "revision": "03eda482087f82f3c5b3db0985ba838e"
  }, {
    "url": "resources/cn-2ti.json",
    "revision": "32700b2d9564f16a219cd3b9fe4ba075"
  }, {
    "url": "resources/cn-3jo.json",
    "revision": "34d6d8f5c378818bc9bb4c0f04f2743c"
  }, {
    "url": "resources/cn-act.json",
    "revision": "64fdd35d1c686642f9be7def9a6c47e8"
  }, {
    "url": "resources/cn-author-bio.json",
    "revision": "1898d6370b25b9eb1426d7c34f9b7636"
  }, {
    "url": "resources/cn-bibliography.json",
    "revision": "2d0d00a2098f86fc367423958efc3ee3"
  }, {
    "url": "resources/cn-col.json",
    "revision": "124ecbbb8ec56752814b653a2ae947b2"
  }, {
    "url": "resources/cn-eph.json",
    "revision": "e4138057290a16c7d497e83de2d13022"
  }, {
    "url": "resources/cn-gal.json",
    "revision": "b674459b40be0e9557b0748bdbf3b719"
  }, {
    "url": "resources/cn-heb.json",
    "revision": "dc99724d3a6ae6aa790d8635de9bde89"
  }, {
    "url": "resources/cn-history.json",
    "revision": "43f9da46cf326e85ace0177a1542f3c1"
  }, {
    "url": "resources/cn-jas.json",
    "revision": "688765626c08f586326779d56d32d6c0"
  }, {
    "url": "resources/cn-joh.json",
    "revision": "4d43e3f430f46c1c9ffdd4cca64939d5"
  }, {
    "url": "resources/cn-jud.json",
    "revision": "c1f81d5504cf5d68ed88c130e4ac9d75"
  }, {
    "url": "resources/cn-lk.json",
    "revision": "ca9c13ba93e0406286b6bf348b56ddea"
  }, {
    "url": "resources/cn-mk.json",
    "revision": "954880be1046768f05dc44c98d6d154c"
  }, {
    "url": "resources/cn-mt.json",
    "revision": "c3ac420152ddcfb740055cef6b08a72e"
  }, {
    "url": "resources/cn-phi.json",
    "revision": "fcfafca76b6e748d632d4224adebb0e3"
  }, {
    "url": "resources/cn-phm.json",
    "revision": "ffbf98317b67a8c1dadb3671f3a85eb0"
  }, {
    "url": "resources/cn-preface.json",
    "revision": "e77fae90694ee0398ff032be19572742"
  }, {
    "url": "resources/cn-rev.json",
    "revision": "cc984819c707a57b978e6ae0875538b6"
  }, {
    "url": "resources/cn-rom.json",
    "revision": "d46fe3a7bce9199cea9213e48cc51841"
  }, {
    "url": "resources/cn-tit.json",
    "revision": "41ed402ac57ff54aabe1a2e0bed16344"
  }, {
    "url": "resources/tw-1co.json",
    "revision": "a7bd12ba9d64bab9d1b323ffb5ef890e"
  }, {
    "url": "resources/tw-1jo.json",
    "revision": "0cda83a4d5fc56f0dfb3bc9a57187e7c"
  }, {
    "url": "resources/tw-1pe.json",
    "revision": "92d1fecccc7798aa860e66e3f70ddf81"
  }, {
    "url": "resources/tw-1th.json",
    "revision": "e8d8b843a46f7745302621b900d45e5f"
  }, {
    "url": "resources/tw-1ti.json",
    "revision": "2e76b9cb75fbbf8d6bb80d579bb1de24"
  }, {
    "url": "resources/tw-2co.json",
    "revision": "1fe08254022a8d745b8fc0572a6d18d1"
  }, {
    "url": "resources/tw-2jo.json",
    "revision": "c75660adff8987c30bf6e00e4227531e"
  }, {
    "url": "resources/tw-2pe.json",
    "revision": "bdc9466d27097391c09f2a903915b478"
  }, {
    "url": "resources/tw-2th.json",
    "revision": "782f8142a0da34ac7a299c71bfbd1686"
  }, {
    "url": "resources/tw-2ti.json",
    "revision": "f963fd76e263d1a2f39d62a18bbec6ed"
  }, {
    "url": "resources/tw-3jo.json",
    "revision": "8aeba008879b50869eaf642a20b02e4b"
  }, {
    "url": "resources/tw-act.json",
    "revision": "5971bfe9600d7587cdaffd7d8df11695"
  }, {
    "url": "resources/tw-author-bio.json",
    "revision": "02a9d68a8c811f9463fb635c54727b56"
  }, {
    "url": "resources/tw-bibliography.json",
    "revision": "7fef908a2a0daeb4e83a65e6d368c650"
  }, {
    "url": "resources/tw-col.json",
    "revision": "e7591154f8b5ae4d45f5a3fffaa813ac"
  }, {
    "url": "resources/tw-eph.json",
    "revision": "9e6f67567dc0413a39144a0b08e93178"
  }, {
    "url": "resources/tw-gal.json",
    "revision": "68a0f0fd060818ae7bfd4ae2e60b9797"
  }, {
    "url": "resources/tw-heb.json",
    "revision": "28af9347da2f87f34fb2518f31e386fb"
  }, {
    "url": "resources/tw-history.json",
    "revision": "e021800192632286d6be336f0e0d4636"
  }, {
    "url": "resources/tw-jas.json",
    "revision": "07bfc7590083cae4b80d2271aa00b3d7"
  }, {
    "url": "resources/tw-joh.json",
    "revision": "54cae77b0b8077457d264894ae353147"
  }, {
    "url": "resources/tw-jud.json",
    "revision": "180e40d37803c98a9380dca5f1dc5576"
  }, {
    "url": "resources/tw-lk.json",
    "revision": "b6aa4d51ac51234332aea6f5304d29f0"
  }, {
    "url": "resources/tw-mk.json",
    "revision": "55da8d9dffa7d8c2f65de78906d1a8b7"
  }, {
    "url": "resources/tw-mt.json",
    "revision": "d843e80f0c5054103c835a0fdc7c37d6"
  }, {
    "url": "resources/tw-phi.json",
    "revision": "f6b6c7d04633ef4ae24c10a64b030475"
  }, {
    "url": "resources/tw-phm.json",
    "revision": "e40c63d4c779a5301d9d48be21085a31"
  }, {
    "url": "resources/tw-preface.json",
    "revision": "e25b39224d86f4e06cdff7b226c60ece"
  }, {
    "url": "resources/tw-rev.json",
    "revision": "db75ff307e34a5ce285d8c563613f03a"
  }, {
    "url": "resources/tw-rom.json",
    "revision": "3ab67119199ac26ddb27d165161d2517"
  }, {
    "url": "resources/tw-tit.json",
    "revision": "27972f8068847a55d9ae3678f316fde2"
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
    "url": "resources/cn-author-bio.json",
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
    "url": "resources/tw-author-bio.json",
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
