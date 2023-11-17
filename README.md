# Standard UI
The standard UI is the default UI attached to experiences by the SDK when embedding an experience within a application
or website.

## Installation
To get started developing the standard UI, clone the QuickStitch-Server:

```console
git clone git@github.com:EmperiaLtd/QuickStitch-Server.git QS
```

Install the QuickStitch-Server by following the instructions within it's
[README](https://github.com/EmperiaLtd/QuickStitch-Server/blob/Production/README.md).

Then download and install the Standard-UI client using the following command from within the CLI:

```console
./o create -git@github.com:EmperiaLtd/Standard-UI.git -standard
```

You will probably want to go to the `./config/server.json` file and set your `INDEX` to `standard`.

## Usage
Enter the CLI using `./o` from within the QuickStitch-Server directory, and then use the `run` command.
You can now make changes to the Standard-UI client and they'll hot-reload within your browser.

To create a production build, use the `build -all` command or alternatively `build -standard`.
It's important that you do this from within the CLI and not manually via NPM, so that you don't have to manually
handle environment variables, SEO features, meta data, optimizations and infrastructure related configurations.
