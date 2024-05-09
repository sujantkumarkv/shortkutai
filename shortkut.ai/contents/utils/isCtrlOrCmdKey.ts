function isCmdOrCtrlKey(event: KeyboardEvent): boolean {
    return Boolean(event.ctrlKey ||
        event.metaKey ||
        event.keyCode === 91 ||
        event.keyCode === 93 ||
        event.keyCode === 224 ||
        event.keyCode === 17);
}

export default isCmdOrCtrlKey;