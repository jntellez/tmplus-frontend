import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Logo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={135}
    height={45}
    viewBox="0 0 817 188"
    fill={props.color}
    {...props}
  >
    <Path d="M81.9 10.2C53.3 12.6 27.7 30 15.5 55.5 9.1 68.9 7.5 76 7.5 92c0 14.9 1.2 21 6.8 34l3.2 7.5h42l.3-8.7c.3-8.7.3-8.8 3.3-10.4 2.9-1.4 3-1.8 2.4-5.7-.5-3.2-1.6-5.1-4.7-7.8-2.2-2-3.5-3.8-2.9-4 1.2-.4-4.7-11.8-6.1-11.9-.4 0-1.5 1.4-2.4 3.2-1.6 3.1-1.7 3.1-3.1 1.2-1.3-1.7-1.2-1.9.6-2.2 2.5-.4 2.7-1.5.5-3.3-.9-.7-2.9-3.9-4.5-7.1-1.6-3.2-3.2-5.8-3.5-5.8-.3 0-1 1.3-1.5 3-.6 1.6-1.5 3-1.9 3-1.3 0-6.8-8.3-9.2-13.7l-2.1-4.7-2.8 5.6c-2.7 5.4-4.5 7.5-5.5 6.6-.2-.3.7-3.7 2.1-7.7C25 43.8 41 27.2 60.9 18.9c24.6-10.2 50.9-7.3 73.8 8.1 11.9 8.1 23.8 23.3 27.4 35.4 3.1 10.2 1.9 11.4-2.6 2.5-1.4-2.7-2.9-4.9-3.3-4.9-.5 0-1.6 1.7-2.6 3.7-2 4.4-7.8 13.3-8.7 13.3-.3 0-1.2-1.5-2.1-3.2l-1.5-3.3-1.8 3.5c-1 1.9-3.1 5.4-4.6 7.7-3.3 4.8-3.5 5.3-1.3 5.3.9 0 1.4.5 1.2 1.2-.8 2.3-2.8 1.9-3.9-.6-1.4-3-2.7-3.3-3.6-.9-.4 1-1.8 3.5-3.1 5.5-1.3 2.1-2.2 4.3-1.9 5 .2.7-1 2.4-2.9 3.8-3.4 2.6-4.4 4.6-4.4 9.2 0 2 .8 3.1 3 4.3 2.9 1.5 2.9 1.7 3.2 10.3l.3 8.7 19 .3c10.5.1 19.9 0 21.1-.2 1.5-.4 3-2.7 5.2-7.9 5.4-13 6.6-18.9 6.6-33.7 0-15.5-1.8-23.9-8-36.3-15.7-31.6-46.9-48.5-83.5-45.5zm-47 68.4c.5.4-.9 2.4-1.7 2.4-.4 0-1.3-.9-2-2.1-1.2-1.9-1.2-2 1-1.4 1.3.4 2.5.9 2.7 1.1zm114.1.9c-1.2 1.5-3 1.2-3-.5 0-.8 3.1-1.9 3.9-1.3.2.1-.2.9-.9 1.8z" />
    <Path d="M45.8 34.7c-1.2.3-1.8 1.4-1.8 3.2 0 1.9-.7 3.1-2.2 3.8l-2.3 1.1 2.8 1.3c2.4 1.1 3.1 1 5.7-.9 3.4-2.6 8.2-2.9 10.4-.6 2.2 2.2 2 3.4-.6 3.4-2.1.1-2.1.2-.5 1.1.9.5 1.7 1.6 1.7 2.3 0 1.6-7.3 3-7.8 1.6-.6-1.8-4.2-1-9.7 2.1-3 1.7-5.9 2.8-6.5 2.4-.5-.3-1-.1-1 .4 0 1.9 4.3 1.2 8.9-1.4 5-2.9 5.7-3 6.5-1 .6 1.7-8.1 7.8-10.1 7-.7-.2-1 .2-.6 1.1.7 1.9.8 1.9 7-1.6 2.9-1.7 6.6-3 8.3-3 1.7 0 3.9-.9 5-2s2.3-2 2.7-2C63 53 73 60.2 73 61.1c0 .4-.9 1-2 1.4-1.2.4-2.2 1.9-2.6 4.1-.5 2.8-1 3.5-2.5 3.1-1-.3-1.9-.1-2.1.4-.2.4-1.8.9-3.5 1.1-1.8.1-3.3.6-3.3 1 0 1.5 3.4 2.5 6.2 1.7l2.8-.8-2 2.9c-1.6 2.3-2 4.4-2 11.9 0 8.6.1 9.2 3 12.4 2.6 3 3 4.3 3 9.1 0 5.2-.2 5.7-3 7.1l-3 1.6v18.6l-9.7.6c-5.4.4-12 .8-14.8.8-5 .2-5 .2 1.5.9 3.6.4 10.2.8 14.8.9 6.3.1 8.2.4 8.2 1.5 0 .8 1.6 2.3 3.6 3.5 2.9 1.7 3.5 2.6 3.2 4.9-.3 2.4-.8 2.8-4.8 3.2-4.4.6-4.4.6 2.5 1.4 3.9.4 7.6.8 8.4.9.8.1 1.6.7 1.8 1.3.4 1.3-6.1 2.4-14.6 2.5-3.1 0-7.4.4-9.6.8-3.1.5-.7.9 10 1.5 7.7.4 14 .8 14.1.9.1.1.4 2.5.6 5.4.6 6.2.4 6.3-11.8 6.3-4.4 0-12.3.3-17.5.7l-9.4.8 6.5.6c3.6.4 11.3.7 17.1.8 12.4.1 20.1 1 19.3 2.2-.3.5-4.2 1-8.7 1-4.5.1-11.6.5-15.7.8l-7.5.7 6 .9c7.7 1.2 63.4 1.2 70 0l5-.9-7-.7c-3.8-.4-10.7-.7-15.2-.8-4.5 0-8.4-.5-8.7-1-.8-1.2 6.9-2.1 19.3-2.2 5.8-.1 13.5-.4 17.1-.8l6.5-.6-9.4-.8c-5.2-.4-13.1-.7-17.5-.7-12.2 0-12.4-.1-11.8-6.3.2-2.9.5-5.3.6-5.4.1-.1 6.5-.6 14.1-1 10.7-.5 13-.9 10-1.4-2.2-.4-6.9-.8-10.5-.9-8.7 0-14.2-1-13.7-2.4.2-.6 1-1.2 1.8-1.3.8-.1 4.6-.5 8.4-.9 6.9-.8 6.9-.8 2.5-1.4-4-.4-4.5-.8-4.8-3.2-.3-2.3.3-3.2 3.2-4.9 2-1.2 3.6-2.7 3.6-3.5 0-1.1 1.8-1.4 7.8-1.5 4.2-.1 10.9-.5 14.7-.9 6.5-.6 6.6-.7 2-.8-2.7-.1-9.4-.5-14.7-.9l-9.8-.6v-18.6l-3-1.6c-2.8-1.4-3-1.9-3-7.1 0-4.8.4-6.1 3-9.1 2.9-3.2 3-3.8 3-12.8 0-5.1-.4-9.7-1-10-.5-.3-1.5-1.5-2-2.5-.9-1.8-.8-1.9 1.2-1.2 1.3.5 3.1.7 4.1.4 3.2-.7 1.2-2.7-3.5-3.5-4.2-.8-4.7-1.2-5.2-4.2-.4-2.1-1.4-3.6-2.6-4-2.9-.9-2.5-1.7 3-5.8 5.7-4.3 6.3-4.4 9-1.7 1.1 1.1 3.3 2 5 2 1.7 0 5.5 1.4 8.4 3 3 1.7 5.7 2.7 5.9 2.3.3-.5-.6-1.4-2.1-2.1-4.8-2.1-8.3-5.6-7.3-7.1.8-1.3 1.7-1.1 5.9 1.2 2.7 1.5 6 2.7 7.2 2.7 1.4 0-.2-1.3-4.6-3.5-7-3.5-10.4-4.3-10.4-2.5 0 .7-1.4.8-3.7.4-4.8-.8-5-1.1-3.5-3.4 1-1.7 1-2-.3-2-2.1 0-1.9-2.7.4-4 3.1-1.6 6.9-1.2 10 1.1 2.4 1.8 3.2 1.9 5.1.9l2.2-1.2-2.1-1.9c-1.1-1-1.8-2.6-1.5-3.3.3-.8-.3-1.9-1.5-2.6-2.4-1.2-4.1-.6-4.1 1.6 0 1.6-3.9 3.4-7.5 3.4-1.7 0-2.7.9-3.8 3.8-.9 2.3-3.1 4.9-5.6 6.6-4.3 3-5.1 3.9-2.6 3 2.4-1 1.8 0-1.7 2.6-2.2 1.6-3 1.9-2.5.7.3-.8-.1-2.1-.9-2.7-1-.9-1.4-.9-1.4-.1 0 .6-.5 1.1-1.1 1.1-.6 0-.9-.7-.5-1.5.3-.9 0-1.5-.9-1.5-.8 0-1.9-.9-2.5-2-1.4-2.5-6.1-5-9.7-5-3.2 0-9.1 3.3-9.9 5.5-.4.8-1.2 1.5-2 1.5s-1.1.6-.8 1.5c.4.8.1 1.5-.5 1.5s-1.1-.5-1.1-1.1c0-.8-.4-.8-1.4.1-.8.6-1.2 1.9-.9 2.8.5 1.2-.1 1.1-2.5-.6-3.8-2.8-5.4-4.9-2.3-3.3 3.4 1.9 2.4.6-2-2.5-2.4-1.6-4.7-4.3-5.5-6.5-1.3-3.2-2-3.7-5.6-4.2-2.6-.4-4.9-1.4-6.2-3-1.2-1.4-2.8-2.2-3.8-2zm50 15.5c.8 1-.4 1.3-5.4 1.3-6 0-8-.7-5.1-1.8 2.5-1.1 9.5-.7 10.5.5zm3.9 8.2c4.6 5 4.1 7.2-.6 2.5-3.3-3.3-4.5-3.9-8.1-3.9-5.2 0-9.5 2.4-11.4 6.4-1.1 2.2-1.6 2.5-1.6 1.3 0-3 3.1-7.5 6.4-9.2 5.1-2.6 11.4-1.4 15.3 2.9zm-2.6 3.5c5.8 5.9 2.6 14.7-5.8 15.8-3.7.5-4.5.2-7.3-2.5-4.1-4.2-4.2-9.2-.1-13.3 4.1-4 9.1-4 13.2 0zM73 70c0 2.7-.4 5-1 5-.5 0-1-2.3-1-5 0-2.8.5-5 1-5 .6 0 1 2.2 1 5zm37 .1c0 6.6-2.4 6.2-2.8-.4-.2-3.7 0-4.7 1.2-4.7s1.6 1.2 1.6 5.1zM67.1 80.3c-.6.6-1.1 4.3-1.1 8.1 0 5-.3 6.6-1 5.6-1.7-2.7-1.2-14.1.8-16.3 1.5-1.8 1.7-1.8 2-.2.2.9-.1 2.2-.7 2.8zm49.9 6.3c0 4-.4 7.6-1 7.9-.6.4-1-2-1-6.4 0-3.8-.4-7.3-1-7.6-.5-.3-1-1.6-1-2.7 0-2 .1-2.1 2-.3 1.7 1.5 2 3.1 2 9.1zM73 78c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm37 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm2.8 5.9c.7.1 1 .5.7 1.1-.8 1.3-45.2 1.4-46 .1-.3-.5.2-1.1 1.2-1.3 1.3-.2 38.4-.1 44.1.1zm-16.5 5.8c-2.9.2-7.8.2-11 0s-.8-.3 5.2-.3c6.1 0 8.7.1 5.8.3zM73 92c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm37 0c0 .5-.5 1-1.1 1-.5 0-.7-.5-.4-1 .3-.6.8-1 1.1-1 .2 0 .4.4.4 1zm-37 4c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm25.6 2.4c4.3 4.3 4.5 6.2.4 4.1-1.6-.8-5.4-1.5-8.5-1.5-3.1 0-6.9.7-8.5 1.5-3.5 1.8-4.1.4-1.2-3.1 2.6-3.2 5.2-4.3 10.1-4.4 3.6 0 4.9.6 7.7 3.4zM110 96c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm-37 3c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm37 0c0 .5-.5 1-1.1 1-.5 0-.7-.5-.4-1 .3-.6.8-1 1.1-1 .2 0 .4.4.4 1zm-37 4c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm37 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm-16.5 2.2c1.4.6 2.6 1.4 2.6 1.7.5 2.3.4 50.1-.2 50.1-.9 0-1.9-9-2-19.5l-.2-9-.8 8.5c-.4 4.7-.7 15.1-.8 23.2-.1 12.5-.3 14.8-1.6 14.8s-1.5-2.8-1.6-18.8c0-10.3-.4-19.6-.9-20.7-.6-1.3-.9 1-.9 6.8-.1 6.6-.4 8.8-1.3 8.5-1.7-.6-2.3-4.8-.7-4.8.8 0 .8-.4.2-1.3-.6-.7-1-9.1-.9-19.7l.1-18.4 2.5-1.3c3.1-1.6 3.3-1.6 6.5-.1zM72.9 120c-.1 11.7-.4 14-1.7 14-1.1 0-1.3-.7-.8-3.1.3-1.7.6-8 .6-14 0-6.9.4-10.9 1-10.9.7 0 1 4.8.9 14zm37.1-2.4c0 8.8-.3 11.5-1.2 11.2-.9-.3-1.4-3.5-1.6-10.3-.3-10.2 0-12.5 1.8-12.5.6 0 1 4.3 1 11.6zm-9.3 34.6c-.1 6.8-.3 1.3-.3-12.2s.2-19 .3-12.3c.2 6.8.2 17.8 0 24.5zM67 119.5c-1 1.2-1 1.9-.2 2.7.7.7 1.2 2.7 1.2 4.5 0 2.6-.4 3.3-2 3.3-1.8 0-2-.7-2-5.4 0-5.1.6-6.3 3.4-6.5.5-.1.3.6-.4 1.4zm48.4-.9c1.2.5 1.6 2 1.6 6 0 4.7-.2 5.4-2 5.4-1.6 0-2-.7-2-3.3 0-1.8.5-3.8 1.1-4.4.8-.8.8-1.3 0-1.7-.6-.4-1.1-1.1-1.1-1.7 0-1.1.3-1.1 2.4-.3zm-34.7 31.1c-.1 5.4-.3 1-.3-9.7s.2-15.1.3-9.8c.2 5.4.2 14.2 0 19.5zm30.3-17.1c0 1.7-2.6 1.9-3.6.3-.7-1.2 1.5-3.1 2.8-2.3.4.3.8 1.2.8 2zM86 155c0 1.1-.4 2-1 2-.5 0-1-.9-1-2s.5-2 1-2c.6 0 1 .9 1 2zm11 6.6c0 .8-.4 1.4-1 1.4-.5 0-1-.9-1-2.1 0-1.1.5-1.7 1-1.4.6.3 1 1.3 1 2.1zm-11-.1c0 .8-.4 1.5-1 1.5-.5 0-1-.7-1-1.5s.5-1.5 1-1.5c.6 0 1 .7 1 1.5zm0 8c0 1.3-.4 2.7-1 3-.6.4-1-.8-1-3s.4-3.4 1-3c.6.3 1 1.7 1 3zm10.9.7c0 2.8-.2 3-.9 1.3-1.2-2.8-1.2-4.5 0-4.5.6 0 1 1.5.9 3.2z" />
    <Path d="M85.4 73.9c1.2 1.3 3.1 2.1 5.1 2.1 2 0 3.9-.8 5.1-2.1 1.9-2.2 1.9-2.2-.3-1-1.2.6-3.4 1.1-4.8 1.1s-3.6-.5-4.8-1.1c-2.2-1.2-2.2-1.2-.3 1zM765.5 47.3c-14 3.7-22.1 12.3-23.2 24.7-1 11.1 4.5 20.4 14.8 24.9 2.5 1.2 10.5 3.4 17.7 5 14.3 3.3 16.6 4.1 18.2 7.2 2.4 4.3-4 8.9-12.4 8.9-5.5 0-11.1-2.4-15.4-6.7L761 107l-10.5 3.6c-5.8 2-10.5 4.1-10.5 4.7 0 .6.9 3 2 5.3 2.9 5.9 10.5 12.7 17.6 15.5 5.1 2.1 7.5 2.4 18.9 2.4 12.2 0 13.4-.2 19.2-2.9 7.5-3.4 14.7-10.6 16.2-16.2 1.8-6.6 1.3-14.4-1.3-20-4.1-8.7-10.2-12.3-28.9-16.5-14.3-3.3-17.4-4.5-19.1-7.2-2.6-4.2 3.4-7.8 13-7.8 7.3 0 12.1 2.1 14.1 6.2.7 1.3 1.6 2.4 2 2.4 2.2 0 18.6-7 19-8.2.8-2-4.2-9.7-8.9-13.7-2.3-2-6.7-4.5-9.7-5.7-7-2.7-21.4-3.4-28.6-1.6zM193.7 47.7c-.4.3-.7 4.6-.7 9.4v8.8l12.3.3 12.2.3.3 35.7.2 35.8h21l.2-35.8.3-35.7 12.3-.3 12.2-.3v-7.8c0-4.4-.3-8.6-.6-9.5-.5-1.4-4.6-1.6-34.8-1.6-18.9 0-34.6.3-34.9.7zM295.7 47.7c-.4.3-.7 20.8-.7 45.5V138h22l.2-20.6.3-20.7 8.5 20.7 8.4 20.7 11.9-.3 11.9-.3 8.7-20.8 8.6-20.8.3 21 .2 21.1h22l-.2-45.3-.3-45.2-12.6-.3-12.6-.3L359.5 78c-7 17.1-13.1 30.7-13.5 30.3-.4-.4-5.6-12.5-11.5-26.8S323 53.6 322 51.2l-1.9-4.2h-11.9c-6.5 0-12.2.3-12.5.7zM429 92.4V138h21V108.3l14.3-.6c7.8-.3 15.9-1.1 17.9-1.7 6.7-2.3 13-8 16.6-15 3.2-6.1 3.3-7 3-14.5-.6-12.7-6.1-21-17.8-26.7-4.2-2.2-5.9-2.3-29.7-2.6l-25.3-.4v45.6zm45.6-24.9c5.9 2.4 8.1 10.3 4.4 16.2-2.5 4.2-7.3 5.5-19.2 5.1l-9.3-.3-.3-9.9c-.1-5.5 0-10.6.2-11.3.8-1.9 19.5-1.8 24.2.2zM534.7 47.7c-.4.3-.7 20.8-.7 45.5V138h62v-19h-41V47h-9.8c-5.4 0-10.2.3-10.5.7zM627.7 47.6c-.4.4-.7 12.5-.7 26.8 0 29.7 1 36.7 6.2 45.4 4.2 6.9 9.6 11.6 17.8 15.6 6 2.9 7.3 3.1 17 3.1 9.8 0 11-.2 17-3.2 8.3-4.1 15.2-11 19.3-19.3l3.2-6.5.3-31.3.3-31.3-10.3.3-10.3.3L687 76c-.5 28.6-.7 30.2-4.2 35.3-5.6 8-20 9-28.2 1.8-4.8-4.2-5.1-5.9-5.6-36.6l-.5-29-10.1-.3c-5.5-.1-10.3 0-10.7.4z" />
  </Svg>
);
export default Logo;
