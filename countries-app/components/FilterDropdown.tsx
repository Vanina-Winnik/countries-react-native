import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface FilterDropdownProps {
  items: string[];
  onSelect: (item: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ items, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <View>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue) => {
          setSelectedItem(itemValue);
          onSelect(itemValue);
        }}
      >
        {items.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
};
