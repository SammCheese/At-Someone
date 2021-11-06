const {
  React,
  getModuleByDisplayName,
  getModule
} = require('powercord/webpack');
const { Generic } = getModuleByDisplayName('Autocomplete', false);
const { ComponentDispatch } = getModule(['ComponentDispatch'], false);

function getRandomUserID() {
  const Members = getModule(['getMemberIds'], false).getMemberIds(
    getModule(['getLastSelectedGuildId'], false).getLastSelectedGuildId()
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
          description='Mentions Someone!'
          text='@someone'
          selected={selected}
          index={selected ? 1 : 0}
          onClick={() => {
            {
              ComponentDispatch.dispatchToLastSubscribed('INSERT_TEXT', {
                content: '@!someone'
              })
            }
          }}
        />
      </div>
    );
  },
  getRandomUserID
};
