const addItems = (name) => {
  const items = [];

  for (let i = 0; i < 20; i++) {
    items.push({
      name: name + i,
      amount: 100,
      price: 99,
      desc: 'amazing ' + name + i
    });
  }

  return items;
};

module.exports = {addItems};