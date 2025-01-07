'use strict';

var form_vue_vue_type_script_setup_true_lang = require('./src/form.vue2.cjs');
var formItem_setup = require('./src/form-item.setup.cjs');
var withInstall = require('../../utils/with-install.cjs');
var form = require('./src/form.cjs');
var formItem = require('./src/form-item.cjs');

const JvForm = withInstall.withInstall(form_vue_vue_type_script_setup_true_lang.default);
const JvFormItem = withInstall.withInstall(formItem_setup.default);

exports.converArray = form.converArray;
exports.formEmits = form.formEmits;
exports.formProps = form.formProps;
exports.formProviderKey = form.formProviderKey;
exports.formSlots = form.formSlots;
exports.VALIDATE_STATE = formItem.VALIDATE_STATE;
exports.formItemEmits = formItem.formItemEmits;
exports.formItemExpose = formItem.formItemExpose;
exports.formItemProps = formItem.formItemProps;
exports.formItemProviderKey = formItem.formItemProviderKey;
exports.formItemSlots = formItem.formItemSlots;
exports.JvForm = JvForm;
exports.JvFormItem = JvFormItem;
//# sourceMappingURL=index.cjs.map
