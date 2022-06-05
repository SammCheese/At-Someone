/* eslint-disable indent */
const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { getModule, React, messages } = require("powercord/webpack");

const {
  AUTOCOMPLETE_OPTIONS: { MENTIONS },
} = getModule(["AUTOCOMPLETE_OPTIONS"], false);

const { SomeonePatch, getRandomUserID } = require("./Someone");

module.exports = class atSomeone extends Plugin {
  async startPlugin() {
    this._injectAutoComplete();
    this._injectMessage();
    powercord.api.commands.registerCommand({
      command: '@/someone',
      aliases: ['@s'],
      description: 'Ats Someone',
      usage: '',
      async executor() {
        return {
          send: true,
          result: `<@${getRandomUserID()}>`
        };
      }
    });
  }

  _injectAutoComplete() {
    inject('as-mention-container', MENTIONS, 'renderResults', (args, res) => {
      if (!'someone'.includes(args[0].query.toLowerCase())) return res;

      res.props.children[3]?.unshift(React.createElement(SomeonePatch));
      return res;
    });
  }

  _injectMessage() {
    inject('as-message-container', messages, 'sendMessage', (args) => {
      if (args[1].content.includes('@!someone')) {
        var s = args[1].content.split(' ')
        for (var i = 0; i < s.length; i++) {
          if (s[i].includes('@!someone')) {
            s[i] = `<@${getRandomUserID()}>`
          }
        }
        args[1].content = s.toString().replace(/,/g, ' ')
      }
      return args;
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand('@/someone');
    uninject('as-mention-container');
    uninject('as-message-container');
  }
};
