export const transformData = (
  data: Record<string, Record<string, number>>,
  categories: { id: number; name: string }[],
) => {
  const transformedData: Record<string, Record<string, number>> = {};

  // Loop through each workCategory
  Object.keys(data).forEach((workCategory) => {
    // Create an object to hold data for each category
    const categoryData: Record<string, number> = {};

    // Loop through categories
    categories.forEach((category) => {
      // Get the price for the current workCategory and category
      const price = data[workCategory][category.id];

      // Add the price to categoryData object
      categoryData[category.name] = price || 0;

      if (transformedData[workCategory] === undefined) {
        transformedData[workCategory] = {};
        transformedData[workCategory][category.name] = price || 0;
      } else if (transformedData[workCategory][category.name] === undefined) {
        transformedData[workCategory][category.name] = price || 0;
      } else {
        transformedData[workCategory][category.name] += price || 0;
      }
    });
  });
  return transformedData;
};
