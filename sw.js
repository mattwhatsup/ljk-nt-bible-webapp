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
    "url": "assets/index-BPvX5IOt.js",
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
    "revision": "0a05a0f93830188961aabce821c39c42"
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
    "revision": "c40273d9c8e6d2f02233b92b69e1e8e5"
  }, {
    "url": "resources/cn-1jo.json",
    "revision": "bdd409fdd9a1c8590344a18d666cd1a0"
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
    "revision": "2ca48da205c453a3cd32710eb56f52c7"
  }, {
    "url": "resources/cn-bibliography.json",
    "revision": "743b7cb656342bb9f6d9bbfa30e8d525"
  }, {
    "url": "resources/cn-col.json",
    "revision": "0b21a87efdc879a7e7c4af14969a5f7f"
  }, {
    "url": "resources/cn-eph.json",
    "revision": "c635e619335e9b16e5948960ed9645ee"
  }, {
    "url": "resources/cn-gal.json",
    "revision": "a9aecb750fdf006219438178934ba011"
  }, {
    "url": "resources/cn-heb.json",
    "revision": "65307da6fe7bf285c6fba74ef403ee8b"
  }, {
    "url": "resources/cn-history.json",
    "revision": "51378d9e68d5f559bbbb5bb79987ad22"
  }, {
    "url": "resources/cn-jas.json",
    "revision": "c11776e0b6414706b99a6f9bb667ec67"
  }, {
    "url": "resources/cn-joh.json",
    "revision": "5e8af16890e243026158316408c2341c"
  }, {
    "url": "resources/cn-jud.json",
    "revision": "c1f81d5504cf5d68ed88c130e4ac9d75"
  }, {
    "url": "resources/cn-lk.json",
    "revision": "c9fa78fcfc346b9cede490702578bc33"
  }, {
    "url": "resources/cn-mk.json",
    "revision": "7e0861dedb4564741e0eccc64491b05a"
  }, {
    "url": "resources/cn-mt.json",
    "revision": "37158c2fb4153b55d204107f9a78d482"
  }, {
    "url": "resources/cn-phi.json",
    "revision": "5eb6e68033dac04daff6db8d82986ddb"
  }, {
    "url": "resources/cn-phm.json",
    "revision": "5ba49b9a4dc79e0ae4614876732863d7"
  }, {
    "url": "resources/cn-preface.json",
    "revision": "428b6663125cd2474bd4650188a2a476"
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
    "revision": "2f981c055db6d483d74c5ae760cda54c"
  }, {
    "url": "resources/tw-1jo.json",
    "revision": "d0c7cdf276a5c8d733f26d9bd79f33a4"
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
    "revision": "10dbb38d6bed6a0737e6b5b13b8ed443"
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
    "revision": "5e8dc2746ee6ae2f185eb0177299acc1"
  }, {
    "url": "resources/tw-bibliography.json",
    "revision": "ac2e3728d1de4e3b0c6cd81f14523995"
  }, {
    "url": "resources/tw-col.json",
    "revision": "c631e191fc7251eea3316960a76b269f"
  }, {
    "url": "resources/tw-eph.json",
    "revision": "d88b7b0973631909ba4eb75d6c027472"
  }, {
    "url": "resources/tw-gal.json",
    "revision": "0991df6407883dd5cf5f29c9dabb0b7a"
  }, {
    "url": "resources/tw-heb.json",
    "revision": "1a3690e403ae86e327e3b68fcb985455"
  }, {
    "url": "resources/tw-history.json",
    "revision": "51378d9e68d5f559bbbb5bb79987ad22"
  }, {
    "url": "resources/tw-jas.json",
    "revision": "b842f5b0e98c5b528364581706edb7ea"
  }, {
    "url": "resources/tw-joh.json",
    "revision": "99cee739e663515cbe718c275d2cac2e"
  }, {
    "url": "resources/tw-jud.json",
    "revision": "c0a2b957b826875234d3032f297d75bd"
  }, {
    "url": "resources/tw-lk.json",
    "revision": "aad04a482e18d8af5b2208b7f261f814"
  }, {
    "url": "resources/tw-mk.json",
    "revision": "22ec4cca8ba7c275f829c3a20984cfd7"
  }, {
    "url": "resources/tw-mt.json",
    "revision": "9f063fd376b53c51009745dd2745a987"
  }, {
    "url": "resources/tw-phi.json",
    "revision": "4868e401bff1295f2f5e62fd548ed295"
  }, {
    "url": "resources/tw-phm.json",
    "revision": "0654619bd3704f413f3b9afb8c753b06"
  }, {
    "url": "resources/tw-preface.json",
    "revision": "00204cb4250d89d7bf5f831fa2019677"
  }, {
    "url": "resources/tw-rev.json",
    "revision": "d2b24c1b5fea5466c14abd101cb07531"
  }, {
    "url": "resources/tw-rom.json",
    "revision": "44e5af5df4f8d9fb51012c12b5f9c5a2"
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
