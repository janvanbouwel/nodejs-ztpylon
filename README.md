# Node ZT Pylon

Clone of [ZeroTier Pylon](https://github.com/zerotier/pylon) in Node.js to serve as an example project using [libzt-node](https://github.com/janvanbouwel/libzt-node) and to test the underlying bindings.

## Installation

Not (yet) on npm, so first clone this repo and cd into it, then:

Global install:

```bash
npm install -g ztpylon
```

Ephemeral:

```bash
npx ztpylon <args>
```

## Usage

See the original [ZeroTier Pylon](https://github.com/zerotier/pylon). Currently only implements `pylon refract`, without relay and without the option to specify UDP port.

```bash
ztpylon refract <nwid> --listen-addr <0.0.0.0|address> --listen-port <port>
```
