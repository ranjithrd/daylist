# Daylist

See deployed version: [daylist.netlify.app](https://daylist.netlify.app)

To build desktop, ensure that you have nativefier installed. To build for Windows on a mac, please install `wine-stable` through `homebrew`. If you are on Windows, nothing else's required to build for Windows.

The command to build is:
windows: `yarn run pack:windows`
mac: `yarn run pack:mac`
linux: `yarn run pack:linux`

If you are on mac, you can build all of them together via:
`yarn run pack`
