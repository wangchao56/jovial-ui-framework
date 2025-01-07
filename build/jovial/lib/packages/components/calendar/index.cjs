'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var calendar_vue_vue_type_script_setup_true_lang = require('./src/calendar.vue2.cjs');
var withInstall = require('../../utils/with-install.cjs');
var calendar = require('./src/calendar.cjs');

const JvCalendar = withInstall.withInstall(calendar_vue_vue_type_script_setup_true_lang.default);

exports.CalendarDateCellType = calendar.CalendarDateCellType;
exports.CalendarPeriod = calendar.CalendarPeriod;
exports.actionsMap = calendar.actionsMap;
exports.actionsMapEntries = calendar.actionsMapEntries;
exports.calendarEmits = calendar.calendarEmits;
exports.calendarProps = calendar.calendarProps;
exports.calendarSlots = calendar.calendarSlots;
exports.weekMaping = calendar.weekMaping;
exports.default = JvCalendar;
//# sourceMappingURL=index.cjs.map
