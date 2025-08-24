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
    "url": "assets/index-CtOQyb8D.js",
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
    "revision": "fa7d25c18e2ad56b63b844c691d6d432"
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
    "revision": "3911e878905e4d046af26eccb75847a2"
  }, {
    "url": "resources/cn-1pe.json",
    "revision": "7dc438504db754df01e9e2c17abe22b8"
  }, {
    "url": "resources/cn-1th.json",
    "revision": "c12e5472899212a25f35909becb9f6ba"
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
    "revision": "099c431da9ba535854a8fea2fda647c2"
  }, {
    "url": "resources/cn-2ti.json",
    "revision": "b86ea4ffb0baed42afe5271e9f2039bd"
  }, {
    "url": "resources/cn-3jo.json",
    "revision": "34d6d8f5c378818bc9bb4c0f04f2743c"
  }, {
    "url": "resources/cn-act.json",
    "revision": "987bae1ce5c0e9de39238c778ba00cc0"
  }, {
    "url": "resources/cn-author-bio.json",
    "revision": "b13071bbdcf8ee15f81be43db1ba18a3"
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
    "revision": "6cc1fab065229559117608e84463eb73"
  }, {
    "url": "resources/cn-history.json",
    "revision": "43f9da46cf326e85ace0177a1542f3c1"
  }, {
    "url": "resources/cn-jas.json",
    "revision": "688765626c08f586326779d56d32d6c0"
  }, {
    "url": "resources/cn-joh.json",
    "revision": "abb17a09999bc334560c552cd9d9327c"
  }, {
    "url": "resources/cn-jud.json",
    "revision": "c1f81d5504cf5d68ed88c130e4ac9d75"
  }, {
    "url": "resources/cn-lk.json",
    "revision": "76fe6eabaff9e6d202aca56dfb14a09d"
  }, {
    "url": "resources/cn-mk.json",
    "revision": "a7f9dbb28717b173f61ac0b533bcafbb"
  }, {
    "url": "resources/cn-mt.json",
    "revision": "96a51f552de889b21475d428fe5244e2"
  }, {
    "url": "resources/cn-phi.json",
    "revision": "fcfafca76b6e748d632d4224adebb0e3"
  }, {
    "url": "resources/cn-phm.json",
    "revision": "b50d62b4f76da50df777acffd79c6e8c"
  }, {
    "url": "resources/cn-preface.json",
    "revision": "dd44725301571934b7394b624e87eabc"
  }, {
    "url": "resources/cn-rev.json",
    "revision": "c33549d6cc2a467fe13bea7ae6abb3e0"
  }, {
    "url": "resources/cn-rom.json",
    "revision": "a8f76e93b6977c38113ab56d67bce877"
  }, {
    "url": "resources/cn-tit.json",
    "revision": "69d90dc0fc4b58c6824b28dae5c64ead"
  }, {
    "url": "resources/tw-1co.json",
    "revision": "1e896d785726a1cc8786b3de3beceede"
  }, {
    "url": "resources/tw-1jo.json",
    "revision": "d0d2dbd10fa882af1da2ee5bfc8911f2"
  }, {
    "url": "resources/tw-1pe.json",
    "revision": "d7cc383ec6eb68ea6ec11831dadccb63"
  }, {
    "url": "resources/tw-1th.json",
    "revision": "d3b1f167b5ca28315aa01cdd12b1f5b6"
  }, {
    "url": "resources/tw-1ti.json",
    "revision": "2e76b9cb75fbbf8d6bb80d579bb1de24"
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
    "revision": "b3adba62863c35fdf92cc109c9b012f6"
  }, {
    "url": "resources/tw-2ti.json",
    "revision": "cec1acf08c7e3303781abd1e6c5b95f1"
  }, {
    "url": "resources/tw-3jo.json",
    "revision": "8aeba008879b50869eaf642a20b02e4b"
  }, {
    "url": "resources/tw-act.json",
    "revision": "e294574c80763a16990977acd5f3c07a"
  }, {
    "url": "resources/tw-author-bio.json",
    "revision": "f94e5d528ed8e5ad39f57368c63d0001"
  }, {
    "url": "resources/tw-bibliography.json",
    "revision": "7fef908a2a0daeb4e83a65e6d368c650"
  }, {
    "url": "resources/tw-col.json",
    "revision": "8254faca4fc6ecaf53bd0eb2a75c41aa"
  }, {
    "url": "resources/tw-eph.json",
    "revision": "9e6f67567dc0413a39144a0b08e93178"
  }, {
    "url": "resources/tw-gal.json",
    "revision": "2108963802b96c68f00d2beced88aa04"
  }, {
    "url": "resources/tw-heb.json",
    "revision": "3e12ea0d4849a3a0340073232f4b43c5"
  }, {
    "url": "resources/tw-history.json",
    "revision": "e021800192632286d6be336f0e0d4636"
  }, {
    "url": "resources/tw-jas.json",
    "revision": "d5ed5e3dfc588cf0f847f037865f8dc5"
  }, {
    "url": "resources/tw-joh.json",
    "revision": "7f1bdc4e527c6e22d8b89c2da71e4007"
  }, {
    "url": "resources/tw-jud.json",
    "revision": "c0a2b957b826875234d3032f297d75bd"
  }, {
    "url": "resources/tw-lk.json",
    "revision": "12c4ff4e8e1bc98556b082fb784e1def"
  }, {
    "url": "resources/tw-mk.json",
    "revision": "a2843ec2cc14478f4738cdb549cdbe01"
  }, {
    "url": "resources/tw-mt.json",
    "revision": "d596d880906eea996c108db99bf9b635"
  }, {
    "url": "resources/tw-phi.json",
    "revision": "96eb6924ff2a5dd1fc73f25092560181"
  }, {
    "url": "resources/tw-phm.json",
    "revision": "38027bfa1f68cfa09b457c5163e13746"
  }, {
    "url": "resources/tw-preface.json",
    "revision": "c58f3e6d674d053671969f8e9c4ca1fc"
  }, {
    "url": "resources/tw-rev.json",
    "revision": "b62116b79efb94d4fa8f9b246edefb23"
  }, {
    "url": "resources/tw-rom.json",
    "revision": "0c989eab384f8c15d488bbc7655a45eb"
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
