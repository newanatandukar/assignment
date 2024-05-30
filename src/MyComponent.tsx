import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';

interface Item {
  id: string;
  name: string;
}

interface MyComponentProps {
  data: Item[];
}
//infer types in the function

const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: T) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay) as any;
  };
};

const MyComponent: React.FC<MyComponentProps> = ({data}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [dataSource, setDataSource] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      setDataSource(data);
    } else {
      setDataSource([]);
    }
  }, [data]);

  const debouncedSearch = useRef(
    debounce((term: string) => {
      setDataSource(
        data.filter(item =>
          item.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    }, 1000),
  ).current;

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleSelect = (item: Item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(selectItem => selectItem.id !== item.id),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.clear();
      setSearchTerm('');
      setDataSource(data);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        onChangeText={handleSearchTerm}
        value={searchTerm}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => `${item?.id}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleSelect(item)}>
            <Text style={styles.itemName}>{item?.name}</Text>
            <Text style={styles.itemStatus}>
              {selectedItems.includes(item) ? 'Selected' : 'Not selected'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  clearButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  itemName: {
    marginRight: 4,
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
  },
  itemStatus: {
    textAlign: 'right',
    marginRight: 4,
  },
});

export default MyComponent;
