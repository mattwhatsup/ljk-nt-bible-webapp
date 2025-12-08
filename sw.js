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
    "url": "assets/index-DPXJu04c.css",
    "revision": null
  }, {
    "url": "assets/index-RzKeg-5d.js",
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
    "revision": "1e9c9d70e588cac72713c300121eb703"
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
    "revision": "a088d1e7b298c8333487cac55f47e923"
  }, {
    "url": "resources/cn-1jo.json",
    "revision": "11db7205a93bcd811dd89c70f9d85b05"
  }, {
    "url": "resources/cn-1pe.json",
    "revision": "cfcb2d2e0c5528e8dc672e9eb65c6cee"
  }, {
    "url": "resources/cn-1th.json",
    "revision": "a308e84be72a84bbe232e0da2b77e687"
  }, {
    "url": "resources/cn-1ti.json",
    "revision": "2c24f4ddf5f6113202b1a008915d2f28"
  }, {
    "url": "resources/cn-2co.json",
    "revision": "d963ba73f5d684865f20de32f94aecf5"
  }, {
    "url": "resources/cn-2jo.json",
    "revision": "deeed78e22e0d08ef2e5d93fa1f67278"
  }, {
    "url": "resources/cn-2pe.json",
    "revision": "60151f02a461c9f9688712b919ca3227"
  }, {
    "url": "resources/cn-2th.json",
    "revision": "c0a5685918baeb41bf64a480d5b481ee"
  }, {
    "url": "resources/cn-2ti.json",
    "revision": "69cf6dd6af8bb570b16219e158f45368"
  }, {
    "url": "resources/cn-3jo.json",
    "revision": "2097157f75d72705e2dcc6c269051339"
  }, {
    "url": "resources/cn-act.json",
    "revision": "2b54d7313bf5a695fd38c1356a62a15c"
  }, {
    "url": "resources/cn-author-bio.json",
    "revision": "1898d6370b25b9eb1426d7c34f9b7636"
  }, {
    "url": "resources/cn-bibliography.json",
    "revision": "2d0d00a2098f86fc367423958efc3ee3"
  }, {
    "url": "resources/cn-col.json",
    "revision": "405004fe95da9ef3f06d7e925ea21cff"
  }, {
    "url": "resources/cn-eph.json",
    "revision": "8f576dfe2269b9fcf6233e2e1b805786"
  }, {
    "url": "resources/cn-gal.json",
    "revision": "6466e10fe883255402ff3c221150c104"
  }, {
    "url": "resources/cn-heb.json",
    "revision": "7666ffecab2b33fb49b4d3e642cc28f7"
  }, {
    "url": "resources/cn-history.json",
    "revision": "43f9da46cf326e85ace0177a1542f3c1"
  }, {
    "url": "resources/cn-jas.json",
    "revision": "ec9a19c6d54d61b8f2a58dc09d64fe2e"
  }, {
    "url": "resources/cn-joh.json",
    "revision": "98a605161a58e9d5489604d1fcee8378"
  }, {
    "url": "resources/cn-jud.json",
    "revision": "4205845d51d78e4becdacbb159ed5b12"
  }, {
    "url": "resources/cn-lk.json",
    "revision": "c76236d5def33c23a0b73c956338ffb4"
  }, {
    "url": "resources/cn-mk.json",
    "revision": "1d0826fe77aabb5f1282de53ddb11eb1"
  }, {
    "url": "resources/cn-mt.json",
    "revision": "57e3d2bcbc9527c6ff8ad6b7b52c8487"
  }, {
    "url": "resources/cn-phi.json",
    "revision": "2ac98a63dc112f1e41f399caf23067e9"
  }, {
    "url": "resources/cn-phm.json",
    "revision": "2d80027df8e9930487f8db0ea9b8e880"
  }, {
    "url": "resources/cn-preface.json",
    "revision": "e77fae90694ee0398ff032be19572742"
  }, {
    "url": "resources/cn-rev.json",
    "revision": "3da72cc4365a85f0dc7c3bc163bc2166"
  }, {
    "url": "resources/cn-rom.json",
    "revision": "50e3a1be77433e7d2d860bd9b2d35d00"
  }, {
    "url": "resources/cn-tit.json",
    "revision": "86790f25c09d37ece0300749f4d96771"
  }, {
    "url": "resources/tw-1co.json",
    "revision": "dd13965e67ae65c4725281164514ea87"
  }, {
    "url": "resources/tw-1jo.json",
    "revision": "25377e6b0db5e353ef6bb67c3e899243"
  }, {
    "url": "resources/tw-1pe.json",
    "revision": "db79c107cd89ebea6c5f6745559e1ab8"
  }, {
    "url": "resources/tw-1th.json",
    "revision": "45509d00347eee6d4ff46eab151ff631"
  }, {
    "url": "resources/tw-1ti.json",
    "revision": "471e8e988250d2127be03230103d8961"
  }, {
    "url": "resources/tw-2co.json",
    "revision": "8598399405c779ae370394f91ea61ac2"
  }, {
    "url": "resources/tw-2jo.json",
    "revision": "5f526073668a538cd2b0faebf8656acb"
  }, {
    "url": "resources/tw-2pe.json",
    "revision": "c4422208eb7bf8622683f2b59c940b80"
  }, {
    "url": "resources/tw-2th.json",
    "revision": "d33c6d10f1776771bc950ead56fe8269"
  }, {
    "url": "resources/tw-2ti.json",
    "revision": "b227e73576f17b3067718bc2e07e09f2"
  }, {
    "url": "resources/tw-3jo.json",
    "revision": "7181f28702c64801e8c90a9103c2fbde"
  }, {
    "url": "resources/tw-act.json",
    "revision": "d398a64c62d49164d8253e998583716b"
  }, {
    "url": "resources/tw-author-bio.json",
    "revision": "02a9d68a8c811f9463fb635c54727b56"
  }, {
    "url": "resources/tw-bibliography.json",
    "revision": "7fef908a2a0daeb4e83a65e6d368c650"
  }, {
    "url": "resources/tw-col.json",
    "revision": "a7dd30365fc64c0871b6667a9abba246"
  }, {
    "url": "resources/tw-eph.json",
    "revision": "98490b468d0b4ed7b3e3bd86c2cce4b5"
  }, {
    "url": "resources/tw-gal.json",
    "revision": "83e129f4a55208a7258fa5d12f971c95"
  }, {
    "url": "resources/tw-heb.json",
    "revision": "d3c71a3c8162d8d1bcb5c350ef9d11b8"
  }, {
    "url": "resources/tw-history.json",
    "revision": "e021800192632286d6be336f0e0d4636"
  }, {
    "url": "resources/tw-jas.json",
    "revision": "c413eea4d073a3328de66dc8dbaacc55"
  }, {
    "url": "resources/tw-joh.json",
    "revision": "a1ea1b7af5f84615a25b0a285f4dd349"
  }, {
    "url": "resources/tw-jud.json",
    "revision": "768b4063374fdc95aed731b3386c93f8"
  }, {
    "url": "resources/tw-lk.json",
    "revision": "12325887ad560952659e0af869406694"
  }, {
    "url": "resources/tw-mk.json",
    "revision": "286367ffc784f3ce074da98c199eb1d0"
  }, {
    "url": "resources/tw-mt.json",
    "revision": "e272be543b562e071955dea9d268e93e"
  }, {
    "url": "resources/tw-phi.json",
    "revision": "eefbd54537a9baac55d6327117c51f26"
  }, {
    "url": "resources/tw-phm.json",
    "revision": "2b90c59bd1a4f92d2bf42d437f4f8b30"
  }, {
    "url": "resources/tw-preface.json",
    "revision": "e25b39224d86f4e06cdff7b226c60ece"
  }, {
    "url": "resources/tw-rev.json",
    "revision": "74fb3ad31a58629f2e26114f174290d9"
  }, {
    "url": "resources/tw-rom.json",
    "revision": "08826aaf52fdc2b3df811a56d6eb8045"
  }, {
    "url": "resources/tw-tit.json",
    "revision": "2f8f08c5ae217a98eaf9a637e0f8bddf"
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
