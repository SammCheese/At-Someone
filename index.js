const { Plugin } = require('powercord/entities')
const { getModule } = require('powercord/webpack')

function getRandomUserID() {
    const Members = getModule(['getMemberIds'], false).getMemberIds(getModule(['getLastSelectedGuildId'], false).getLastSelectedGuildId())
    return Members[Math.floor(Math.random() * Members.length)]
}

module.exports = class atSomeone extends Plugin {

    startPlugin() {
        powercord.api.commands.registerCommand({
            command: "@/Someone",
            aliases: ["@s"], 
            description: "Ats Someone",
            usage: "",
            async executor() {
                return {
                    send: true,
                    result: '<@'+getRandomUserID()+'>'
                }
            }
        })
    }

    pluginWillUnload () {
        powercord.api.commands.unregisterCommand("@/Someone")
    }
}