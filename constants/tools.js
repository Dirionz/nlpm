'use strict'

module.exports = Object.freeze({
    PACMAN_RESTORE_COMMAND: 'sudo pacman -S --noconfirm',
    PACMAN_UPDATE_COMMAND: 'sudo pacman -Syu',
    TRIZEN_RESTORE_COMMAND: './tools/trizen -S --noconfirm',
    TRIZEN_UPDATE_COMMAND: './tools/trizen -Syu',
});
