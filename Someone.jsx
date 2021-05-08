const { React, getModuleByDisplayName, getModule, channels } = require("powercord/webpack");
const { Generic } = getModuleByDisplayName("AutoComplete", false);
const { sendMessage } = getModule(["sendMessage"], false);

function getRandomUserID() {
  const Members = getModule(["getMemberIds"], false).getMemberIds(getModule(["getLastSelectedGuildId"], false).getLastSelectedGuildId());
  return Members[Math.floor(Math.random() * Members.length)];
}

module.exports = () => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Generic
      description="Mentions Someone!"
      text="@someone"
      selected={selected}
      index={selected ? 1 : 0}
      onHover={() => {
        // TODO: unselect somehow
        setSelected(true);
      }}
      // TODO: Close modal
      onClick={() => sendMessage(channels.getChannelId(), { content: `<@${getRandomUserID()}>` })}
    />
  );
};
