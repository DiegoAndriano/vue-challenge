/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    env: {
        node: true,
    },
    root: true,
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/eslint-config-prettier",
    ],
};
