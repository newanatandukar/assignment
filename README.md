# Error Notes

1. Typescripting is required to ensure correct type of props passed, states and ref used.

2. What is the use of setTimeOut? What happens if the user types too quickly i.e. before 1000ms?
   The setTimeOut used seems to be useless because setTimeOut will wait 1000ms before filtering and
   the useEffect hook filters the dataSource based on the whenever the searchTerm state changes. This might cause race condition.
   Better to use debounce to handle delay dynamically.

3. Handle select only sets selected items but doesn’t handle the case when the items need to be deselected.

4. Text Input Ref is not utilized properly.

# Improvements

1. Search term scenarios can be altered by case of input.
   It is a good practice to convert to same case for searching.

2. Key Extractor is based on id.
   Unexpected behaviours may arise if id is same. Better to add index to prevent such scenario. In case of rengering large lists (which we are unsure in this scenario), pagination can be done.

# Testing

I would implement unit testing for this component using React Testing Library and Jest framework to ensure proper interaction and rendering. But for other testing essentials I would refer to frameworks such as Appium or Detox
