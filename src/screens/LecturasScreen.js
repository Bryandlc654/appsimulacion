import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { API_HOST_USER } from "../Api/api";
import Pdf from "react-native-pdf";



const LecturasScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfSource, setPdfSource] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;

  // Fetch PDFs from the API
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch(`${API_HOST_USER}/dpf-archive`);
        const data = await response.json();
        setPdfs(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setFilteredPdfs(data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  // Filter PDFs based on search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = pdfs.filter((pdf) =>
      pdf.nombre.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredPdfs(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setPage(1);
  }, [searchQuery, pdfs]);

  // Get the current page PDFs
  const currentPagePdfs = filteredPdfs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleOpenPdf = (pdfUrl) => {
    setPdfSource({ uri: pdfUrl, cache: true });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={24}
            color="#1C1D32"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Elige una lectura</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.searchBox}>
          <Icon
            name="search"
            size={24}
            color="#1C1D32"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#1C1D32" />
        ) : (
          <FlatList
            data={currentPagePdfs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={styles.button}
                onPress={() => handleOpenPdf(item.pdfUrl)}
              >
                <Text style={styles.buttonText}>{item.nombre}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text>No se encontraron lecturas</Text>}
          />
        )}

        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            style={[styles.paginationButton, { backgroundColor: page === 1 ? "#d3d3d3" : "#1C1D32" }]}
          >
            <Text style={styles.paginationButtonText}>Anterior</Text>
          </TouchableOpacity>
          <Text style={styles.paginationText}>
            {`Página ${page} de ${totalPages}`}
          </Text>
          <TouchableOpacity
            onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            style={[styles.paginationButton, { backgroundColor: page === totalPages ? "#d3d3d3" : "#1C1D32" }]}
          >
            <Text style={styles.paginationButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for displaying PDF */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          {pdfSource && (
            <Pdf
              trustAllCerts={false}
              source={pdfSource}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "#7cdaf9",
  },
  header: {
    backgroundColor: "#7cdaf9",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
   
  },
  backIcon: {
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1D32",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingTop: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1D32',
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#1C1D32",
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  paginationButton: {
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  paginationText: {
    fontSize: 16,
    color: "#1C1D32",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  pdf: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 100,
  },
  closeButton: {
    backgroundColor: "#1C1D32",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LecturasScreen;
