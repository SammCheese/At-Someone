const {
  React,
  getModuleByDisplayName,
  getModule,
  channels,
} = require('powercord/webpack');
const { Generic } = getModuleByDisplayName('Autocomplete', false);
const { sendMessage } = getModule(['sendMessage'], false);
const { ComponentDispatch } = getModule(['ComponentDispatch'], false);

let toggleBool = true;
let textContent = document.querySelector("div[class*='slateTextArea']").childNodes[0].childNodes[0];
let textSave;

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
