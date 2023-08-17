import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";

const UsuarioTable = () => {
  const [usuarioData, setUsuarioData] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    username: "",
    email: "",
    birthdate: "",
    gender: "",
    weight: "",
    height: "",
  });
  const [isModalUsuario, setIsModalUsuario] = useState(false);
  const [isModalInsert, setIsModalInsert] = useState(false);
  const [isModalDetails, setIsModalDetails] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  const handleShowDetails = (usuario) => {
    setSelectedUsuario(usuario);
    setIsModalDetails(true);
  };

  const fetchUsuarioData = async () => {
    try {
      const responseUsuario = await fetch(
        "http://172.18.4.15:8888/api/usuarios"
      );
      const jsonDataUsuario = await responseUsuario.json();
      setUsuarioData(jsonDataUsuario);
    } catch (error) {
      console.log("error fetching data:", error);
    }
  };

  const insertUsuario = async () => {
    try {
      const { _id, ...formData } = form;

      const response = await fetch("http://172.18.4.15:8888/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const jsonData = await response.json();
      console.log("Usuario insertado:", jsonData);
      fetchUsuarioData();
      setIsModalInsert(false);
    } catch (error) {
      console.log("Error al insertar el usuario:", error);
    }
  };

  const deleteUsuario = async (item) => {
    try {
      const confirmed = window.confirm("¿Estás seguro que quieres eliminar el usuario?");
      if (confirmed) {
        const response = await fetch(
          `http://172.18.4.15:8888/api/usuarios/${item._id}`,
          {
            method: "DELETE",
          }
        );
        const jsonData = await response.json();
        console.log("Usuario eliminado:", jsonData);
        fetchUsuarioData();
      }
    } catch (error) {
      console.log("Error al eliminar el usuario:", error);
    }
  };
  

  const updateUsuario = async () => {
    try {
      const response = await fetch(
        `http://172.18.4.15:8888/api/usuarios/${form._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const jsonData = await response.json();
      console.log("Usuario actualizado:", jsonData);
      fetchUsuarioData();
      setIsModalUsuario(false);
    } catch (error) {
      console.log("Error al actualizar el usuario:", error);
    }
  };

  const handleEditUsuario = (item) => {
    setForm(item);
    setIsModalUsuario(true);
  };

  const handleChange = (name, value) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleModalInsert = () => {
    setIsModalInsert(!isModalInsert);
    setForm({
      _id: "",
      username: "",
      email: "",
      birthdate: "",
      gender: "",
      weight: "",
      height: "",
    });
  };

  useEffect(() => {
    fetchUsuarioData();
  }, []);

  const renderRowUsuario = ({ item }) => {
    return (
      <View style={styles.row} key={item._id}>
        <Text style={styles.column}>{item.username}</Text>
        <Text style={styles.column}>{item.email}</Text>
        <Text style={styles.column}>{item.birthdate}</Text>
        <View style={styles.actionsColumn}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modalButtonInsertSmall}
              onPress={() => handleEditUsuario(item)}
            >
              <Text style={styles.buttonTextSmall}>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonInsertSmall}
              onPress={() => handleShowDetails(item)}
            >
              <Text style={styles.buttonTextSmall}>Detalles</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonDeleteSmall}
              onPress={() => deleteUsuario(item)}
            >
              <Text style={styles.buttonTextSmall}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Text style={styles.title}>Usuario</Text>
        <Button
          style={styles.insertButton}
          title="Insert"
          onPress={toggleModalInsert}
        />
        <View style={styles.headerRow}>
          <Text style={styles.headerColumn}>Nombre</Text>
          <Text style={styles.headerColumn}>Correo</Text>
          <Text style={styles.headerColumn}>Fecha de Nacimiento</Text>
          <Text style={styles.headerColumn}>Acciones</Text>
        </View>
        <FlatList
          data={usuarioData}
          renderItem={renderRowUsuario}
          keyExtractor={(item) => item._id}
        />
      </View>
      <Modal visible={isModalUsuario} animationType="fade">
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Usuario</Text>
            <TextInput
              style={styles.modalInput}
              value={form.username}
              onChangeText={(value) => handleChange("username", value)}
            />
            <TextInput
              style={styles.modalInput}
              value={form.email}
              onChangeText={(value) => handleChange("email", value)}
            />
            <TextInput
              style={styles.modalInput}
              value={form.birthdate}
              onChangeText={(value) => handleChange("birthdate", value)}
            />
            <TextInput
              style={styles.modalInput}
              value={form.gender}
              onChangeText={(value) => handleChange("gender", value)}
            />
            <TextInput
              style={styles.modalInput}
              value={form.weight}
              onChangeText={(value) => handleChange("weight", value)}
            />
            <TextInput
              style={styles.modalInput}
              value={form.height}
              onChangeText={(value) => handleChange("height", value)}
            />
            {/* Add more TextInput components for other attributes */}
            <TouchableOpacity
              style={styles.modalButtonInsert}
              title="Guardar"
              onPress={updateUsuario}
            >
              <Text style={styles.modalButtonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonDelete}
              title="Cerrar"
              onPress={() => setIsModalUsuario(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
      <Modal visible={isModalDetails} animationType="fade">
        <View style={styles.modalContainer}>
          <SafeAreaView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles de Usuario</Text>
            {selectedUsuario && (
              <View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Nombre:</Text>
                  <Text style={styles.detailText}>{selectedUsuario.username}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Correo:</Text>
                  <Text style={styles.detailText}>{selectedUsuario.email}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Fecha de Nacimiento:</Text>
                  <Text style={styles.detailText}>{selectedUsuario.birthdate}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Género:</Text>
                  <Text style={styles.detailText}>{selectedUsuario.gender}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Peso:</Text>
                  <Text style={styles.detailText}>{selectedUsuario.weight}</Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Altura:</Text>
                  <Text style={styles.detailText}>{selectedUsuario.height}</Text>
                </View>
              </View>
            )}
            <TouchableOpacity
              style={styles.modalButtonDelete}
              title="Cerrar"
              onPress={() => setIsModalDetails(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};



const UsuarioScreenContent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <UsuarioTable />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
    // marginTop: 460,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  column: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f0f0f0", // Color de fondo para la fila de encabezados
  },
  headerColumn: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold", // Fuente en negrita para los encabezados
  },
  tableContainer: {
    marginBottom: 16,
  },
  tableSpacing: {
    height: 39,
  },
  actionsColumn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeModalText: {
    paddingTop: 50,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(218, 192, 163)', // Fondo semi-transparente
    borderRadius: 20, // Bordes redondeados
    padding: 20, // Espacio interno
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombras en Android
  },
  modalContent: {
    backgroundColor: '#F8F0E5', // Color de fondo para el contenido de la ventana modal
    borderRadius: 10, // Bordes redondeados para el contenido
    elevation: 5, // Sombras en Android para el contenido
    padding: 20, // Espacio interno para el contenido
  },
  modalTitle: {
    paddingTop: 16,
    paddingBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  },
  modalnames: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
    color: "#000"
  },
  modalinput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  modalButtonInsertSmall: {
    borderRadius: 8,
    paddingVertical: 6, // Tamaño del padding vertical más pequeño
    paddingHorizontal: 12, // Tamaño del padding horizontal más pequeño
    marginVertical: 5, // Espacio vertical entre botones
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#102C57", // Color amarillo
  },
  modalButtonDeleteSmall: {
    borderRadius: 8,
    paddingVertical: 6, // Tamaño del padding vertical más pequeño
    paddingHorizontal: 12, // Tamaño del padding horizontal más pequeño
    marginVertical: 5, // Espacio vertical entre botones
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000", // Color rojo
  },
  buttonTextSmall: {
    fontSize: 12, // Tamaño del texto más pequeño
    color: "#ffffff", // Texto blanco para botones
  },
  modalButtonInsert: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0077B6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonDelete: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#ffff",
  },

  // Estilos para botones de texto en ventanas modales
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detailLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  detailText: {
    flex: 2,
    fontSize: 18,
    color: "#666",
  },
});

export default UsuarioScreenContent;
