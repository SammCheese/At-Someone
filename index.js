/* eslint-disable indent */
const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { findInReactTree } = require('powercord/util');
const { getModule } = require('powercord/webpack');

function getRandomUserID () {
    const Members = getModule([ 'getMemberIds' ], false)
        .getMemberIds(getModule([ 'getLastSelectedGuildId' ], false)
        .getLastSelectedGuildId());
    return Members[Math.floor(Math.random() * Members.length)];
}

module.exports = class atSomeone extends Plugin {
    async startPlugin () {
        this._injectAutoComplete();
        powercord.api.commands.registerCommand({
            command:    '@/Someone',
            aliases:    [ '@s' ],
            description:    'Ats Someone',
            usage:  '',
            async executor () {
                return {
                    send: true,
                    result: `<@${getRandomUserID()}>`
                };
            }
        });
    }

    async _injectAutoComplete () {
        const { AUTOCOMPLETE_OPTIONS: { MENTIONS } } = getModule([ 'AUTOCOMPLETE_OPTIONS' ], false);
        inject('as-mention-container', MENTIONS, 'renderResults', (args, res) => {
        if (args[7].globals.length === 2 || args[7].globals.length === 0) {
            args[7].globals.push({
                description: 'Mentions Someone!',
                text: '@someone'
            });
        }
        try {
            const sex = findInReactTree(res, ({ key }) => key === '@someone');
            sex.props.onClick = () => {
                const currentChannel = require('powercord/webpack').channels.getChannelId();
                require('powercord/webpack').getModule([ 'sendMessage' ], false)
                    .sendMessage(currentChannel, { content: '<@' + getRandomUserID() + '>' });
            };
        } catch {}
        return res;
        });
    }

    pluginWillUnload () {
        powercord.api.commands.unregisterCommand('@/Someone');
        uninject('as-mention-container');
    }
};
