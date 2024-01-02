class LocalStorage {
  static setItem(key, value) {
    const expiresOn = new Date();
    expiresOn.setMinutes(expiresOn.getMinutes() + 30);

    const item = {
      value: value,
      expiresOn: expiresOn,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  static getItem(key) {
    const item = JSON.parse(localStorage.getItem(key));

    if (item && new Date(item.expiresOn) > new Date()) {
      return item.value;
    } else {
      return null;
    }
  }
}

export default LocalStorage;
