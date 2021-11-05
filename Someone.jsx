const {
  React,
  getModuleByDisplayName,
  getModule,
  channels,
} = require("powercord/webpack");
const { Generic } = getModuleByDisplayName("Autocomplete", false);
const { sendMessage } = getModule(["sendMessage"], false);

let toggleBool = true;

function getRandomUserID() {
  const Members = getModule(["getMemberIds"], false).getMemberIds(
    getModule(["getLastSelectedGuildId"], false).getLastSelectedGuildId()
  );
  return Members[Math.floor(Math.random() * Members.length)];
}

module.exports = {
  SomeonePatch: () => {
    const [selected, setSelected] = React.useState(false);
    return (
      <div
        onMouseEnter={() => {
          setSelected(true);
        }}
        onMouseLeave={() => {
          setSelected(false);
        }}
      >
        <Generic
          description="Mentions Someone!"
          text="@someone"
          selected={selected}
          index={selected ? 1 : 0}
          onClick={() => {
            {
              sendMessage(channels.getChannelId(), {
                content: `<@${getRandomUserID()}>`,
              });
            }
            require('powercord/webpack').FluxDispatcher
              .dispatch({ type: 'DRAFT_CLEAR', channelId: 
              channels.getChannelId(), draftType: 0 });
          }}
        />
      </div>
    );
  },
  getRandomUserID,
};
