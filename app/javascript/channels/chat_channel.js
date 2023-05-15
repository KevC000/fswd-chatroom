import consumer from "./consumer"
import $ from 'jquery';
import {
  indexChats,
} from "../lib/requests.js";

consumer.subscriptions.create("ChatChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Front-end: connected to the chat channel!");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("Front-end: disconnected from the chat channel!");
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log("Front-end: received data from the chat channel: ", data);
    indexChats(function (response) {
      var htmlString = response.chats.map(function (chat) {
        return `
          <li class="py-4">
            <div class="flex space-x-3">
              <div class="flex-1 space-y-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium">${chat.name}</h3>
                  <p class="text-sm text-gray-500">${chat.ago}</p>
                </div>
                <p class="text-sm text-gray-500">${chat.message}</p>
              </div>
            </div>
          </li>
        `;
      });
      $("#chats").html(htmlString);
    });
  }
});