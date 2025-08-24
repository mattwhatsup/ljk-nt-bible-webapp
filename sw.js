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
    "url": "assets/index-CyloBb6N.js",
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
    "revision": "2409a7c1b0d457dec1922c73dacf4fa5"
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
    "revision": "aca665a75a388661cdf3b85df58382e0"
  }, {
    "url": "resources/cn-1jo.json",
    "revision": "681ad173b69491dbc28626830277a4db"
  }, {
    "url": "resources/cn-1pe.json",
    "revision": "7dc438504db754df01e9e2c17abe22b8"
  }, {
    "url": "resources/cn-1th.json",
    "revision": "b7689e888f3066adec3433e2b4f67f02"
  }, {
    "url": "resources/cn-1ti.json",
    "revision": "807ec1e2c9716ac42b3675391c32dc75"
  }, {
    "url": "resources/cn-2co.json",
    "revision": "802a40ed556bbe2f783e9a72b2677f03"
  }, {
    "url": "resources/cn-2jo.json",
    "revision": "a11e8d94024b48bff2b607c6b4a6b39d"
  }, {
    "url": "resources/cn-2pe.json",
    "revision": "74f0a765951357ea6ad486c378d0e9b5"
  }, {
    "url": "resources/cn-2th.json",
    "revision": "908962f91fa7b01119de98e19eca83d7"
  }, {
    "url": "resources/cn-2ti.json",
    "revision": "72a276bb5ba726516ddd6fff6ab1b399"
  }, {
    "url": "resources/cn-3jo.json",
    "revision": "34d6d8f5c378818bc9bb4c0f04f2743c"
  }, {
    "url": "resources/cn-act.json",
    "revision": "9f32924524a30d6a26a8657fab6919fc"
  }, {
    "url": "resources/cn-author-bio.json",
    "revision": "97531c3087a037faa82e28e4561742c7"
  }, {
    "url": "resources/cn-bibliography.json",
    "revision": "f805341672e062562337a3474facc3c0"
  }, {
    "url": "resources/cn-col.json",
    "revision": "124ecbbb8ec56752814b653a2ae947b2"
  }, {
    "url": "resources/cn-eph.json",
    "revision": "e4138057290a16c7d497e83de2d13022"
  }, {
    "url": "resources/cn-gal.json",
    "revision": "92e654e8c496a803458daf52c6655c50"
  }, {
    "url": "resources/cn-heb.json",
    "revision": "65307da6fe7bf285c6fba74ef403ee8b"
  }, {
    "url": "resources/cn-history.json",
    "revision": "43f9da46cf326e85ace0177a1542f3c1"
  }, {
    "url": "resources/cn-jas.json",
    "revision": "c11776e0b6414706b99a6f9bb667ec67"
  }, {
    "url": "resources/cn-joh.json",
    "revision": "b000c9ecbb6fb2952c14fbb67828bc4a"
  }, {
    "url": "resources/cn-jud.json",
    "revision": "c1f81d5504cf5d68ed88c130e4ac9d75"
  }, {
    "url": "resources/cn-lk.json",
    "revision": "76fe6eabaff9e6d202aca56dfb14a09d"
  }, {
    "url": "resources/cn-mk.json",
    "revision": "5aa7d361521f4887ad6abc8cebf250cb"
  }, {
    "url": "resources/cn-mt.json",
    "revision": "60cad2e1b6699ad940651245dc211be5"
  }, {
    "url": "resources/cn-phi.json",
    "revision": "fcfafca76b6e748d632d4224adebb0e3"
  }, {
    "url": "resources/cn-phm.json",
    "revision": "b50d62b4f76da50df777acffd79c6e8c"
  }, {
    "url": "resources/cn-preface.json",
    "revision": "bfd25fdcc89fddeeade67ea84293e004"
  }, {
    "url": "resources/cn-rev.json",
    "revision": "af31d7af0f84adb48084f4955f7c6779"
  }, {
    "url": "resources/cn-rom.json",
    "revision": "75aff33ba665d496ebd6c7f215f3162b"
  }, {
    "url": "resources/cn-tit.json",
    "revision": "69d90dc0fc4b58c6824b28dae5c64ead"
  }, {
    "url": "resources/tw-1co.json",
    "revision": "1e896d785726a1cc8786b3de3beceede"
  }, {
    "url": "resources/tw-1jo.json",
    "revision": "8774c967867f746caf57a9240ee4f10a"
  }, {
    "url": "resources/tw-1pe.json",
    "revision": "d7cc383ec6eb68ea6ec11831dadccb63"
  }, {
    "url": "resources/tw-1th.json",
    "revision": "da71ffca132fdf50943f54da089e17f0"
  }, {
    "url": "resources/tw-1ti.json",
    "revision": "a4da261b24f44e30177f69cdce2e05c0"
  }, {
    "url": "resources/tw-2co.json",
    "revision": "213e5785bb15ffbc4f268f7f4dfcd27c"
  }, {
    "url": "resources/tw-2jo.json",
    "revision": "c75660adff8987c30bf6e00e4227531e"
  }, {
    "url": "resources/tw-2pe.json",
    "revision": "9a72f37042a8d0618b9a86cc2cc69ccd"
  }, {
    "url": "resources/tw-2th.json",
    "revision": "de42aa97772c50cc88e669a2c8430797"
  }, {
    "url": "resources/tw-2ti.json",
    "revision": "bd9a38697837f32a5c5b861ed92666a2"
  }, {
    "url": "resources/tw-3jo.json",
    "revision": "8aeba008879b50869eaf642a20b02e4b"
  }, {
    "url": "resources/tw-act.json",
    "revision": "bdf5d684b19e10e1417366a525137ebf"
  }, {
    "url": "resources/tw-author-bio.json",
    "revision": "0b310ffa82339e9613ea22239f03f4fc"
  }, {
    "url": "resources/tw-bibliography.json",
    "revision": "2b958f574b2a734d44da5b99f99056c3"
  }, {
    "url": "resources/tw-col.json",
    "revision": "8254faca4fc6ecaf53bd0eb2a75c41aa"
  }, {
    "url": "resources/tw-eph.json",
    "revision": "9e6f67567dc0413a39144a0b08e93178"
  }, {
    "url": "resources/tw-gal.json",
    "revision": "46c502eab7741387cf4fa73504af31fc"
  }, {
    "url": "resources/tw-heb.json",
    "revision": "1a3690e403ae86e327e3b68fcb985455"
  }, {
    "url": "resources/tw-history.json",
    "revision": "e021800192632286d6be336f0e0d4636"
  }, {
    "url": "resources/tw-jas.json",
    "revision": "b842f5b0e98c5b528364581706edb7ea"
  }, {
    "url": "resources/tw-joh.json",
    "revision": "e14fcd142ca89fd08427b5f78fa475c5"
  }, {
    "url": "resources/tw-jud.json",
    "revision": "c0a2b957b826875234d3032f297d75bd"
  }, {
    "url": "resources/tw-lk.json",
    "revision": "12c4ff4e8e1bc98556b082fb784e1def"
  }, {
    "url": "resources/tw-mk.json",
    "revision": "35f94d1585e5831a548ff0248c93f0da"
  }, {
    "url": "resources/tw-mt.json",
    "revision": "fb54b056a253c66d27ee6cd4f775f125"
  }, {
    "url": "resources/tw-phi.json",
    "revision": "96eb6924ff2a5dd1fc73f25092560181"
  }, {
    "url": "resources/tw-phm.json",
    "revision": "38027bfa1f68cfa09b457c5163e13746"
  }, {
    "url": "resources/tw-preface.json",
    "revision": "39362cbdaf32c332cda29662d9e1f913"
  }, {
    "url": "resources/tw-rev.json",
    "revision": "d2b24c1b5fea5466c14abd101cb07531"
  }, {
    "url": "resources/tw-rom.json",
    "revision": "44e5af5df4f8d9fb51012c12b5f9c5a2"
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
