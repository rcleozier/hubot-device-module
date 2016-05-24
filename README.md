# Device Management

Script to assist with device management. Allows users to list, checkout and return devices.

### Comands:

```
- Hubot seed devices - Perform initial seed of devices
- Hubot devices - Get list of devices
- Hubot add device {name} - Add device by name
- Hubot remove device {id} - Remove device by id
- Hubot checkout {id} - Checkout device with id
- Hubot return {id} - Return device with id
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