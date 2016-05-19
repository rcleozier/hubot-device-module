# Device Management

Script to assist with device management. Allows users to list, checkout and return devices.

### Comands:

```
- [bot] seed devices - Perform initial seed of devices
- [bot] devices - Get list of devices
- [bot] add device {name} - Add device by name
- [bot] remove device {id} - Remove device by id
- [bot] checkout {id} - Checkout device with id
- [bot] return {id} - Return device with id
```

### Installation

In hubot project repo, run:

```
    npm install hubot-device-module --save
```

Then add hubot-device-management to your external-scripts.json:

```
    ["hubot-device-module"]
```