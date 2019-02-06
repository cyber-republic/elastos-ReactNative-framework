export default {
  STREAM_HANDSHACK_RANDOM : '__session_handshack__',
  STREAM_IMAGE_MESSAGE_START : '[image]start',
  STREAM_IMAGE_MESSAGE_END : '[image]end',
  STREAM_IMAGE_MESSAGE_END_REG : new RegExp('\\\[image\\\]end$', 'g')
};