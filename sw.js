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
    "url": "assets/index-BFy1ZZ2o.js",
    "revision": null
  }, {
    "url": "assets/index-DPXJu04c.css",
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
    "revision": "7a5ce312393097b0058c0bf408ddf038"
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
    "revision": "82137076371422b9e5206d5aacf73a43"
  }, {
    "url": "resources/cn-1jo.json",
    "revision": "916f78b2d961e814ec88fbbe8b3f7ec5"
  }, {
    "url": "resources/cn-1pe.json",
    "revision": "5eaa6f565a48197a1e6f3a10223679e6"
  }, {
    "url": "resources/cn-1th.json",
    "revision": "a308e84be72a84bbe232e0da2b77e687"
  }, {
    "url": "resources/cn-1ti.json",
    "revision": "e806df8499a9dd2bce258e0301033ec2"
  }, {
    "url": "resources/cn-2co.json",
    "revision": "228c825f4a0a7dfcac658089089da064"
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
    "revision": "f4210bac8375bc769952d378eb9792a1"
  }, {
    "url": "resources/cn-3jo.json",
    "revision": "2097157f75d72705e2dcc6c269051339"
  }, {
    "url": "resources/cn-act.json",
    "revision": "c3b8643b28a7cbe9abb1788cac6a6edc"
  }, {
    "url": "resources/cn-author-bio.json",
    "revision": "1898d6370b25b9eb1426d7c34f9b7636"
  }, {
    "url": "resources/cn-bibliography.json",
    "revision": "963775d7dc6eeeae0cf4ea73eb1d0607"
  }, {
    "url": "resources/cn-col.json",
    "revision": "1c2971e58ed6fb4a32549be5253dad33"
  }, {
    "url": "resources/cn-eph.json",
    "revision": "90b41db6f485f3f4bd4e00b4f716da37"
  }, {
    "url": "resources/cn-gal.json",
    "revision": "9230dcab2a0e3fc170f8ccb65834c965"
  }, {
    "url": "resources/cn-heb.json",
    "revision": "9a19c7f1c85b42653e9adc929e7212c7"
  }, {
    "url": "resources/cn-history.json",
    "revision": "b88c6fb6afa1eba7b2ea045fb9b6b699"
  }, {
    "url": "resources/cn-jas.json",
    "revision": "2a63ba96ffed8a849bfb05a77d16b41b"
  }, {
    "url": "resources/cn-joh.json",
    "revision": "aebecac6d6fda48fffedf539b7d98917"
  }, {
    "url": "resources/cn-jud.json",
    "revision": "08a432a1a4ee3dac6743fb20878fe176"
  }, {
    "url": "resources/cn-lk.json",
    "revision": "e6f74466363dca16105defffed408365"
  }, {
    "url": "resources/cn-mk.json",
    "revision": "d01ebf3d555cb2df206e046acaa379a1"
  }, {
    "url": "resources/cn-mt.json",
    "revision": "3ec6e6648018971c3c5392dd1d5cbca8"
  }, {
    "url": "resources/cn-phi.json",
    "revision": "adce808d0417992ed4bcdd9227ebcef3"
  }, {
    "url": "resources/cn-phm.json",
    "revision": "2d80027df8e9930487f8db0ea9b8e880"
  }, {
    "url": "resources/cn-preface.json",
    "revision": "e77fae90694ee0398ff032be19572742"
  }, {
    "url": "resources/cn-rev.json",
    "revision": "31e59eb09c2c21c6139ac01e5c86a41b"
  }, {
    "url": "resources/cn-rom.json",
    "revision": "47dc1984a2c6044f72e63a5617f71ef7"
  }, {
    "url": "resources/cn-tit.json",
    "revision": "2714f3168644b517fbc920c2a9bccda7"
  }, {
    "url": "resources/tw-1co.json",
    "revision": "f81cf56d19d1faa6bdb358180ce14d55"
  }, {
    "url": "resources/tw-1jo.json",
    "revision": "01322f7e9bc508f246f1a662bc031ac1"
  }, {
    "url": "resources/tw-1pe.json",
    "revision": "48a80ed4f4e82ad394f331475468f064"
  }, {
    "url": "resources/tw-1th.json",
    "revision": "45509d00347eee6d4ff46eab151ff631"
  }, {
    "url": "resources/tw-1ti.json",
    "revision": "5f1ee86d9fdacae695e8d0d45468f30f"
  }, {
    "url": "resources/tw-2co.json",
    "revision": "c2ff17944b97b065a4c7eff2ff7cc204"
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
    "revision": "752224f5695f77c619b8c78403fdd43a"
  }, {
    "url": "resources/tw-3jo.json",
    "revision": "7181f28702c64801e8c90a9103c2fbde"
  }, {
    "url": "resources/tw-act.json",
    "revision": "a74ab7eb9a31727958ead729e5d11de3"
  }, {
    "url": "resources/tw-author-bio.json",
    "revision": "02a9d68a8c811f9463fb635c54727b56"
  }, {
    "url": "resources/tw-bibliography.json",
    "revision": "de08a669ea4e2f2dd8393a49a0bd16b6"
  }, {
    "url": "resources/tw-col.json",
    "revision": "c447821531d721c0f05778a2a03763de"
  }, {
    "url": "resources/tw-eph.json",
    "revision": "29bfaade1e2a1615c78801cb6905e2a4"
  }, {
    "url": "resources/tw-gal.json",
    "revision": "e370c4e49a49d1e6e4fd5b2899920b59"
  }, {
    "url": "resources/tw-heb.json",
    "revision": "8aa1f60fc633b4760dac5a2d93ffb400"
  }, {
    "url": "resources/tw-history.json",
    "revision": "b1b1b180802dc852af7d4fc28ad882a4"
  }, {
    "url": "resources/tw-jas.json",
    "revision": "0abd3b45ade50803104666f7ec6a9b0f"
  }, {
    "url": "resources/tw-joh.json",
    "revision": "9e9964d791d451922a5d7a8cd177f1cb"
  }, {
    "url": "resources/tw-jud.json",
    "revision": "ae5fffd3878375a7bf36043b5a98c461"
  }, {
    "url": "resources/tw-lk.json",
    "revision": "37e257bebc0edf323ef89225eb584640"
  }, {
    "url": "resources/tw-mk.json",
    "revision": "83a347e9537702bc5decf41c5df0750e"
  }, {
    "url": "resources/tw-mt.json",
    "revision": "fd567eb6c679b63f0245b5b71f1267b6"
  }, {
    "url": "resources/tw-phi.json",
    "revision": "14c79e8ecca0c16f52acc85b64c517e7"
  }, {
    "url": "resources/tw-phm.json",
    "revision": "2b90c59bd1a4f92d2bf42d437f4f8b30"
  }, {
    "url": "resources/tw-preface.json",
    "revision": "e25b39224d86f4e06cdff7b226c60ece"
  }, {
    "url": "resources/tw-rev.json",
    "revision": "9cb3dca4ee2daf5da3cd661bdce4489b"
  }, {
    "url": "resources/tw-rom.json",
    "revision": "9b1cc8d30741e5b9eb8e0786a53d394d"
  }, {
    "url": "resources/tw-tit.json",
    "revision": "06dd39a193d0522993de4f6e72eca3a3"
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
