import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
interface FilterDropdownProps {
  items: string[];
  onSelect: (item: string) => void;
  selectedValue: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ items, onSelect, selectedValue }) => {
  const [selectedItem, setSelectedItem] = useState(selectedValue);

  useEffect(() => {
    setSelectedItem(selectedValue);
  }, [selectedValue]);

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
          <Picker.Item key={item} label={item || ''} value={item} />
        ))}
      </Picker>
    </View>
  );
};
