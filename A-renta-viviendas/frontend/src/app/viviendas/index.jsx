import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { listarViviendas } from "../../servicios/viviendaServices.js";

export default function Viviendas() {
  const [viviendas, setViviendas] = useState([]);

    
  const cargarViviendas = async () => {
      const datos = await listarViviendas();
      setViviendas(datos) 
  };
    

  useEffect(() => {
    cargarViviendas();
  }, []);

    
  return (
    <View >
          <Text>Lista de viviendas</Text>
          
        <FlatList
          data={viviendas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 15, marginVertical: 5 }}>
              <Text>{item.titulo}</Text>
              <Text>Dirección: {item.direccion}</Text>
              <Text>Precio mensual: {item.precioMensual}</Text>
              <Text>Habitaciones: {item.habitaciones}</Text>
              <Text>
                Disponibilidad: {item.disponible ? "Disponible" : "Ocupada"}
              </Text>
            </View>
          )}
        />
    </View>
  );
}
