const generateSlugNames = (items) =>
  items.map((item) => {
    const slugName = item.name.toLowerCase().replace(/ /g, "-");
    return { ...item, slugName };
  });

module.exports = generateSlugNames;
