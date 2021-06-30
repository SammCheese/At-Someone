/* eslint-disable indent */
const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { getModule, React } = require("powercord/webpack");

const {
  AUTOCOMPLETE_OPTIONS: { MENTIONS },
} = getModule(["AUTOCOMPLETE_OPTIONS"], false);

const { SomeonePatch, getRandomUserID } = require("./Someone");

module.exports = class atSomeone extends Plugin {
  async startPlugin() {
    this._injectAutoComplete();
    powercord.PluginManager.remount('pc-spotify')
    powercord.api.commands.registerCommand({
      command: "@/Someone",
      aliases: ["@s"],
      description: "Ats Someone",
      usage: "",
      async executor() {
        return {
          send: true,
          result: `<@${getRandomUserID()}>`
        };
      }
    });
  }

  _injectAutoComplete() {
    inject("as-mention-container", MENTIONS, "renderResults", (args, res) => {
      if (!"someone".includes(args[4].toLowerCase())) return res;

      res.props.children[3]?.unshift(React.createElement(SomeonePatch));
      return res;
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("@/Someone");
    uninject("as-mention-container");
  }
};
