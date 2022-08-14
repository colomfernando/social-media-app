const createAvatarUrl = (name, lastname) => {
  const validName = !name || typeof name !== 'string' ? 'John' : name;
  const validLastname =
    !lastname || typeof lastname !== 'string' ? 'Doe' : lastname;

  return `https://eu.ui-avatars.com/api/?name=${validName}+${validLastname}&size=250`;
};

module.exports = createAvatarUrl;
