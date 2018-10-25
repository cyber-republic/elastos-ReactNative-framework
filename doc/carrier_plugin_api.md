# Carrier Plugin API
So far is only available for iOS.

## Getting start

### Source file
```
/CR/plugin/Carrier
```

### Import plugin
```
import {plugin} from 'CR';
const Carrier = plugin.Carrier;

or

import Carrier from 'CR/plugin/Carrier'
```

### Initialize carrier
```
const carrier = new Carrier('app_name', {
    // carrier callback
});
await carrier.start();
```

## API List

### static getVersion
* return current Carrier version
```
Carrier.getVersion();
```

### static isValidAddress(address)
* check address is valid for carrier node or not.
* return boolean.
```
Carrier.isValidAddress('Xm4WXfsSbAHhwiAe6tdo3oxhH93p8jb6Kata9ywyohkjssBMAH8n') // true
Carrier.isValidAddress('abcde') //false
```

### getAddress
* return current instance address
```
const address = await carrier.getAddress();
```

### getSelfInfo
* return current node profile info.
```
const selfInfo = await carrier.getSelfInfo();
/*
 userId: 'EzhQQz9X3nR6NYb2makCpmZjnuiFsD11CGuak9FnE8hf',
 gender: 'male',
 region: 'China',
 phone: '123456789',
 email: 'carrier@elastos.org',
 description: 'I am a node for Elastos carrier',
 name: 'new world',
 */
```

### setSelfInfo(info)
* set self profile info for current node.
```
await carrier.setSelfInfo({
    gender: 'male',
    region: 'China',
    phone: '123456789',
    email: 'carrier@elastos.org',
    description: 'I am a node for Elastos carrier',
    name: 'new world',
});
```

### setSelfPresence(presence)
* set self presence status
```
// presence status
{
    'ONLINE' : 0,
    'AWAY' : 1,
    'BUSY' : 2
}

await carrier.setSelfPresence(Carrier.config.PRESENCE_STATUS.AWAY);
```

### addFriend(address, msg)
* pair with new carrier node as friend.
* return boolean.
```
await carrier.addFriend('Dg3h2TecXGzBU5NruvdYaMJoCdxGc3etPmJ6GVynKpLUm1whnQyE', 'hello');
```

### acceptFriend(userId)
* accpet pair request from another carrier node.
* userId is friend node userId, not address.
* return boolean
```
this.carrier.acceptFriend('4ni3UKYY9xHDcodNaP1edAWDGuF5cmWTU8QWH4JnNfwV');
```

### getFriendInfo(userId)
* return friend node info
```
const friendInfo = await carrier.getFriendInfo('4ni3UKYY9xHDcodNaP1edAWDGuF5cmWTU8QWH4JnNfwV');

/*
 gender: 'male',
 region: 'China',
 phone: '123456789',
 email: 'carrier@elastos.org',
 description: 'I am a node for Elastos carrier',
 name: 'new world',
 label: 'friend',
 status: 0,
 presence: 0
 */
```

### removeFriend(userId)
* remove friend.
```
await carrier.removeFriend('4ni3UKYY9xHDcodNaP1edAWDGuF5cmWTU8QWH4JnNfwV');
```

### getFriendList
* return current node friends list<FriendInfo>
* return data structure is friend info.
```
const friendList = await carrier.getFriendList();
```

### setLabel(friendId, label)
* set friend label
```
await carrier.setLabel('4ni3UKYY9xHDcodNaP1edAWDGuF5cmWTU8QWH4JnNfwV', 'label')
```

### sendMessage(friendId, message)
* send a message to friend.
* return boolean
```
await carrier.sendMessage('4ni3UKYY9xHDcodNaP1edAWDGuF5cmWTU8QWH4JnNfwV', 'hello world');
```

### close
* close carrier node

### clean
* remove carrier node file from device. that means the node will be gone.


## Notice
* only available for x86_84 for now.

## Carrier Session will be coming soon.

## to be continue.