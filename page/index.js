import { gettext } from 'i18n'

Page({
  build() {
    let text = ""
    const preview = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 10,
      y: 40,
      w: 172,
      h: 200,
      text: ' ',
      text_style: hmUI.text_style.WRAP,
      color: '0xffffff'
    });
    const run = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 10,
      y: 80,
      w: 172,
      h: 200,
      text: ' ',
      text_style: hmUI.text_style.WRAP,
      color: '0xffffff'
    });
    // 创建一个数组包含所有的按钮
    // 创建按钮
    // console.log(hmFS.readir);
    const buttons = [
      ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
      ...Array.from({ length: 10 }, (_, i) => String(i)),
       ',','+', '-', '*', '/', '=', '.', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?',
    ];
    for (let i = 0; i < buttons.length; i++) {
      const button = hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 0 + (i % 5) * 40,
        y: 180 + Math.floor(i / 5) * 40,
        w: 40,
        h: 40,
        text: buttons[i],
        normal_color: 0x101010,
        press_color: 0x262626,
        radius: '10',
        click_func: () => {
          // 将按钮的字母添加到编辑器
          text += buttons[i]
          // 更新预览
          preview.setProperty(hmUI.prop.TEXT, text);
          // if ( currentText == undefined ) editor.setProperty(hmUI.prop.TEXT,'');preview.setProperty(hmUI.prop.TEXT, '');
        },
      });
    }

    // 创建删除按钮
    const deleteButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: 0,
      w: 40,
      h: 40,
      text: 'DEL',
      normal_color: 0x101010,
      press_color: 0x262626,
      radius: '10',
      click_func: () => {
        // 删除最后一个字符
        text = text.slice(0, -1);
        preview.setProperty(hmUI.prop.TEXT, text);
      },
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 100,
      y: 0,
      w: 40,
      h: 40,
      text: "ENT",
      normal_color: 0x101010,
      press_color: 0x262626,
      radius: '10',
      click_func: () => {
        text += '\n';
        preview.setProperty(hmUI.prop.TEXT, text);
      },
    });
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 150,
      y: 0,
      w: 40,
      h: 40,
      text: 'SPA',
      normal_color: 0x101010,
      press_color: 0x262626,
      radius: '10',
      click_func: () => {
        text += ' ';
        preview.setProperty(hmUI.prop.TEXT, text);
      },
    });
    const document = {
      getElementById: (widget) => widget.getProperty(hmUI.prop.MORE, {}),
    };
    // 创建运行按钮
    const glob = globalThis;
    if (!glob.Buffer)
      glob.Buffer = DeviceRuntimeCore.Buffer;
    if (!glob.Logger)
      glob.Buffer = DeviceRuntimeCore.HmLogger;
    if (!glob.setTimeout) {
      glob.setTimeout = (func, interval = 1) => {
        const tmp = timer.createTimer(interval, Number.MAX_SAFE_INTEGER, () => {
          glob.clearTimeout(tmp);
          func();
        }, {});
        return tmp;
      };
      glob.setInterval = (func, interval) => {
        return timer.createTimer(1, interval, () => func(), {});
      };
      glob.setImmediate = (func) => glob.setTimeout(func);
      glob.clearTimeout = glob.clearInterval = glob.clearImmediate = (ref) => timer.stopTimer(ref);
    }
    const functionCtor = (function () { }).constructor;
    glob.Function = function (...args) {
      return new functionCtor(...args);
    };
    const consoleTime = {};
    glob.console.time = function (tag) {
      if (tag in consoleTime)
        console.log(`Timer '${tag}' already exists`);
      consoleTime[tag] = new Date().valueOf();
    };
    glob.console.timeEnd = function (tag) {
      if (!(tag in consoleTime)) {
        console.log(`Timer '${tag}' does not exist`);
      }
      else {
        console.log(`${tag}: ${new Date().valueOf() - consoleTime[tag]} ms`);
        delete consoleTime[tag];
      }
    };
    glob.eval = function (...args) {
      return new functionCtor(...args);
    };
    const runButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 50,
      y: 0,
      w: 40,
      h: 40,
      text: 'RUN',
      normal_color: 0x101010,
      press_color: 0x262626,
      radius: '10',
      click_func: () => {
        const functionsCode = `
            const document = {
      getElementById: (widget) => widget.getProperty(hmUI.prop.MORE, {}),
    };
    // 创建运行按钮
    const glob = globalThis;
    if (!glob.Buffer)
      glob.Buffer = DeviceRuntimeCore.Buffer;
    if (!glob.Logger)
      glob.Buffer = DeviceRuntimeCore.HmLogger;
    if (!glob.setTimeout) {
      glob.setTimeout = (func, interval = 1) => {
        const tmp = timer.createTimer(interval, Number.MAX_SAFE_INTEGER, () => {
          glob.clearTimeout(tmp);
          func();
        }, {});
        return tmp;
      };
      glob.setInterval = (func, interval) => {
        return timer.createTimer(1, interval, () => func(), {});
      };
      glob.setImmediate = (func) => glob.setTimeout(func);
      glob.clearTimeout = glob.clearInterval = glob.clearImmediate = (ref) => timer.stopTimer(ref);
    }
    const functionCtor = (function () { }).constructor;
    glob.Function = function (...args) {
      return new functionCtor(...args);
    };
    const consoleTime = {};
    glob.console.time = function (tag) {
      if (tag in consoleTime)
        console.log("Timer " + tag + " already exists");
      consoleTime[tag] = new Date().valueOf();
    };
    glob.console.timeEnd = function (tag) {
      if (!(tag in consoleTime)) {
        console.log("Timer " + tag + " does not exist");
      }
      else {
        console.log(tag + ": " + new Date().valueOf() - consoleTime[tag] + " ms");
        delete consoleTime[tag];
      }
    };
    glob.eval = function (...args) {
      return new functionCtor(...args);
    };
          const getDateFormat = () => {
            let value;
            switch (hmSetting.getDateFormat()) {
              case 0:
                value = "DATE_FORMAT_YMD";
                break;
              case 1:
                value = "DATE_FORMAT_DMY";
                break;
              case 2:
                value = "DATE_FORMAT_MDY";
                break;
            }
            return value;
          };
          const getDistanceUnit = () => {
            switch (hmSetting.getMileageUnit()) {
              case 0:
                return "DISTANCE_UNIT_METRIC";
                break;
              case 1:
                return "DISTANCE_UNIT_IMPERIAL";
                break;
            }
          };
          const getLanguage = () => hmSetting.getLanguage();
          const getSleepTarget = () => hmSetting.getSleepTarget();
          const getTimeFormat = () => {
            switch (hmSetting.getTimeFormat()) {
              case 0:
                return "TIME_HOUR_FORMAT_12";
                break;
              case 1:
                return "TIME_HOUR_FORMAT_24";
                break;
            }
          };
          const getWeightTarget = () => hmSetting.getWeightTarget();
          const getWeightUnit = () => {
            switch (hmSetting.getWeightUnit()) {
              case 0:
                return "WEIGHT_UNIT_KILOGRAM";
                break;
              case 1:
                return "WEIGHT_UNIT_JIN";
                break;
              case 2:
                return "WEIGHT_UNIT_POUND";
                break;
              case 3:
                return "WEIGHT_UNIT_STONE";
                break;
            }
          };
          const getAutoBrightness = () => hmSetting.getScreenAutoBright();
          const getBrightness = () => hmSetting.getBrightness();
          const setAutoBrightness = (page) => hmSetting.setScreenAutoBright(page.autoBright);
          const setBrightness = (page) => hmSetting.setBrightness(page.brightness);
          const setScreenOff = () => hmSetting.setScreenOff();
          const setWakeUpRelaunch = (option) => hmApp.setScreenKeep(option.relaunch);
          const getDeviceInfo = () => {
            return {
              width: hmSetting.getDeviceInfo().width,
              height: hmSetting.getDeviceInfo().height,
              screenShape: null,
              deviceName: hmSetting.getDeviceInfo().deviceName,
              keyNumber: hmSetting.getDeviceInfo().keyNumber,
              deviceSource: hmSetting.getDeviceInfo().deviceSource,
            };
          };
          const getDiskInfo = () => {
            return {
              total: hmSetting.getDiskInfo().total / 1024 / 1024,
              free: hmSetting.getDiskInfo().free / 1024 / 1024,
              app: hmSetting.getDiskInfo().app / 1024 / 1024,
              watchface: hmSetting.getDiskInfo().watchface / 1024 / 1024,
              music: hmSetting.getDiskInfo().music / 1024 / 1024,
              system: hmSetting.getDiskInfo().system / 1024 / 1024,
            };
          };
          const getProfile = () => {
            return {
              age: hmSetting.getUserData().age,
              height: hmSetting.getUserData().height,
              weight: hmSetting.getUserData().weight,
              gender: null,
              nickName: hmSetting.getUserData().nickName,
              region: hmSetting.getUserData().region,
            };
          };
          const console = {
            log(value) {
              run.setProperty(hmUI.prop.TEXT, String(value));
            }, error(value) {
              run.setProperty(hmUI.prop.TEXT, 'Error: ' + String(value));
            },
          };
          const set_text_color = (color, widget) => {
            if (color.startsWith('0x') || color.startsWith('#')) {
              widget.setProperty(hmUI.prop.COLOR, color);
            }
            else {
              if (color.startsWith('rgb')) {
                let regex = /rgb((\d+),\s*(\d+),\s*(\d+))/;
                let match = color.match(regex);
                if (match) {
                  let hex = '#';
                  for (let i = 1; i <= 3; i++) {
                    hex += parseInt(match[i]).toString(16).padStart(2, '0');
                  }
                  widget.setProperty(hmUI.prop.COLOR, hex);
                }
                else {
                  throw new Error("Invalid color format: " + color);
                }
              }
              else {
                let colorMap = {
                  'white': '#FFFFFF',
                  'black': '#000000',
                  'red': '#FF0000',
                  'green': '#00FF00',
                  'blue': '#0000FF',
                  'yellow': '#FFFF00',
                  'pink': '#FFC0CB',
                  'orange': '#FFA500',
                  'purple': '#800080',
                  'brown': '#A52A2A',
                  'gray': '#808080',
                  'cyan': '#00FFFF',
                  'magenta': '#FF00FF',
                  'lime': '#00FF00',
                  'maroon': '#800000',
                  'navy': '#000080',
                  'olive': '#808000',
                  'silver': '#C0C0C0',
                  'teal': '#008080'
                };
                if (color in colorMap) {
                  widget.setProperty(hmUI.prop.COLOR, colorMap[color]);
                }
                else {
                  throw new Error("Invalid color name: " + color);
                }
              }
            }
          };
        `;
        // functionsCode + code
        const code = text;
        try {
          new Function('run', 'preview',functionsCode + code)(run)
        }
        catch (ex) {
          console.log('ERROR: ' + ex);
        }
      },
    });

  }
})