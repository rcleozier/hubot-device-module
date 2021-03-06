// Description:
// Device management for Hubot
//
// Commands:
// Hubot seed devices - Perform initial seed of devices
// Hubot devices - Get list of devices
// Hubot add device {name} - Add device by name
// Hubot remove device {id} - Remove device by id
// Hubot checkout {id} - Checkout device with id
// Hubot return {id} - Return device with id
//
// Author:
// Robbins Cleozier

module.exports = function(robot) {

    var seed = [
      {
        'name' : 'Apple Iphone 5',
      },
      {
        'name' : 'Apple Iphone 6',
      },
      {
        'name' : 'Samsung Galaxy S4',
      },
      {
        'name' : 'HTC One',
      },
      {
        'name' : 'Google Nexus 7',
      },
      {
        'name' : 'Galaxy Tab',
      },
      {
        'name' : 'Apple Ipad',
      },
      {
        'name' : 'Apple Ipad Mini',
      },
      {
        'name' : 'Lenevo Thinkpad',
      },
      {
        'name' : 'Digital Loaner Laptop',
      },
      {
        'name' : 'Apple Iphone Charger',
      },
      {
        'name' : 'Android Charger',
      },
    ];

    var generateId = function() {
      return Math.random().toString(36).substr(2, 3);
    };

    var setDevices = function(devices) {
      robot.brain.set('hubot-device:devices', devices);
    };

    var getDevices = function() {
      return robot.brain.get('hubot-device:devices');
    };

    var titleCase = function(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };

    var bold = function(text) {
      if (robot.adapter.constructor.name === 'IrcBot') {
        return "\x02"+text+"\x02";
      } else if (robot.adapterName === 'slack') {
        return "*"+text+"*";
      } else {
        return text;
      }
    };

    robot.respond(/(return) (.*)/i, function(msg) {
      var deviceId = msg.match[2].trim().toLowerCase();
      var user = msg.message.user.name;
      var devices = getDevices();
      var found = false;

      devices.forEach(function(device) {
        if (deviceId == device.id ) {
          found = true;
          if (device.out != user) {
            msg.send("You haven't checked out the " + device.name);
          } else {
            device.out = false;
            setDevices(devices);
            msg.send("You have returned the " + device.name);
          }
        }
      });

      if (!found) {
        msg.send("Device could not be found " + deviceId);
      }
    });

    robot.respond(/(checkout) (.*)/i, function(msg) {
      var deviceId = msg.match[2].trim().toLowerCase();
      var user = msg.message.user.name;
      var devices = getDevices();
      var found = false;

      devices.forEach(function(device) {
        if (deviceId == device.id ) {
          found = true;
          if (device.out !== false) {
            msg.send(device.name + " is currently checked out by " + device.out);
          } else {
            device.out = user;
            setDevices(devices);
            msg.send("You have checked out the " + device.name);
          }
        }
      });

      if (!found) {
        msg.send("Device could not be found " + deviceId);
      }
    });

    robot.respond(/(seed all devices)/i, function(msg) {
      var devices = getDevices();

      if (!devices) {

        seed.forEach(function(s) {
          s.id = generateId();
          s.out = false;
        });

        setDevices(seed);

        msg.send("Successfully seeded devices");
      } else {
        msg.send("Already seeded devices");
      }
    });

    robot.respond(/(remove device) (.*)/i, function(msg) {
      var devices = getDevices();
      var deviceId = msg.match[2].trim().toLowerCase();

      for(var i = devices.length - 1; i >= 0; i--) {
        if(devices[i].id === deviceId) {
          devices.splice(i, 1);
          setDevices(devices);
          msg.send('Successfully removed device');
          return true;
        }
      }

      msg.send('Device not found to be removed');
    });

    robot.respond(/(add device) (.*)/i, function(msg) {
      var devices = getDevices();
      var name = titleCase(msg.match[2].trim().toLowerCase());
      var newDevice = {
        'id' : generateId(),
        'name' : name,
        'out' : false
      };

      if (!devices) {
        devices = [newDevice];
      }
      else {
        devices.push(newDevice);
      }

      setDevices(devices);
      msg.send('Successfully added ' + name);
    });

    robot.respond(/(devices)/i, function(msg) {
      var devices = getDevices();

      if (!devices) {
        msg.send('No devices found.');
      }
      else {
        var message = '';

        devices.forEach(function(device) {
          if (device.out !== false) {
            message = message + "id: " + bold(device.id) + " " + device.name + " - Checked out by " + device.out + "\n";
          } else {
            message = message + "id: " + bold(device.id) + " " + device.name + "\n";
          }
        });

        msg.send(message);
        return;
      }
    });
};
