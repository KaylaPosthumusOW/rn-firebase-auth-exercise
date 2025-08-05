import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView
} from 'react-native';
import { 
  ObjectItem, 
  getAllObjects, 
  addObject, 
  deleteObject, 
  listenToObjects 
} from '../services/objectService';
import { auth } from '../firebase';

const ObjectsScreen = () => {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newObject, setNewObject] = useState({
    title: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    // Set up real-time listener
    const unsubscribe = listenToObjects((updatedObjects) => {
      setObjects(updatedObjects);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const handleAddObject = async () => {
    if (!newObject.title.trim() || !newObject.description.trim() || !newObject.category.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await addObject({
        ...newObject,
        userId: auth.currentUser?.uid || ''
      });
      
      // Reset form
      setNewObject({ title: '', description: '', category: '' });
      setModalVisible(false);
      Alert.alert('Success', 'Object added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add object');
      console.error('Error adding object:', error);
    }
  };

  const handleDeleteObject = (id: string) => {
    Alert.alert(
      'Delete Object',
      'Are you sure you want to delete this object?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteObject(id);
              Alert.alert('Success', 'Object deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete object');
              console.error('Error deleting object:', error);
            }
          }
        }
      ]
    );
  };

  const renderObjectItem = ({ item }: { item: ObjectItem }) => (
    <View style={styles.objectItem}>
      <View style={styles.objectHeader}>
        <Text style={styles.objectTitle}>{item.title}</Text>
        <TouchableOpacity
          onPress={() => item.id && handleDeleteObject(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.objectCategory}>Category: {item.category}</Text>
      <Text style={styles.objectDescription}>{item.description}</Text>
      <Text style={styles.objectDate}>
        Created: {item.createdAt.toLocaleDateString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading objects...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Objects</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Object</Text>
        </TouchableOpacity>
      </View>

      {objects.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No objects found</Text>
          <Text style={styles.emptySubtext}>Tap "Add Object" to create your first object</Text>
        </View>
      ) : (
        <FlatList
          data={objects}
          keyExtractor={(item) => item.id || ''}
          renderItem={renderObjectItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Add Object Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Add New Object</Text>
              
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.input}
                value={newObject.title}
                onChangeText={(text) => setNewObject({ ...newObject, title: text })}
                placeholder="Enter object title"
              />

              <Text style={styles.inputLabel}>Category</Text>
              <TextInput
                style={styles.input}
                value={newObject.category}
                onChangeText={(text) => setNewObject({ ...newObject, category: text })}
                placeholder="Enter category"
              />

              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newObject.description}
                onChangeText={(text) => setNewObject({ ...newObject, description: text })}
                placeholder="Enter description"
                multiline
                numberOfLines={4}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleAddObject}
                >
                  <Text style={styles.saveButtonText}>Add Object</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  objectItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  objectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  objectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  objectCategory: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 5,
  },
  objectDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  objectDate: {
    fontSize: 12,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ObjectsScreen;
