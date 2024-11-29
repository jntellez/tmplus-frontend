import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions, // Importar Dimensions
} from "react-native";
import CustomCheckBox from "../../components/CustomCheckBox"; // Checkbox personalizado
import colors from "../../theme/colors";

const windowWidth = Dimensions.get("window").width; // Obtén el ancho de la pantalla

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false); // Estado para mostrar el modal
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      if (!name || !email || !password) {
        setError("Por favor ingresa todos los campos");
      } else if (!acceptTerms) {
        setError("Debes aceptar los términos y condiciones");
      } else {
        // Registro exitoso (tu lógica aquí)
      }
    } catch (error) {
      setError("Error al registrar el usuario. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.fullScreenContainer}>
      {" "}
      {/* Contenedor que ocupa toda la pantalla */}
      <View
        style={[styles.container, { width: windowWidth > 768 ? "50%" : "90%" }]}
      >
        {" "}
        {/* Contenedor ajustado dentro del contenedor principal */}
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.secondaryTextLight}
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={colors.secondaryTextLight}
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={colors.secondaryTextLight}
        />
        {/* Checkbox con enlace a términos */}
        <View style={styles.checkboxContainer}>
          <CustomCheckBox value={acceptTerms} onChange={setAcceptTerms} />
          <Text style={styles.checkboxLabel}>
            Acepto los{" "}
            <Text
              style={styles.link}
              onPress={() => setShowTerms(true)} // Abrir el modal al presionar
            >
              términos y condiciones
            </Text>
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={colors.secondaryTextLight} />
        ) : (
          <Button
            title="Registrarse"
            onPress={handleRegister}
            color={colors.primaryButtonColor}
          />
        )}
        {error && <Text style={styles.error}>{error}</Text>}
        {/* Modal de términos y condiciones */}
        <Modal visible={showTerms} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { width: windowWidth > 768 ? "50%" : "90%" },
              ]}
            >
              <Text style={styles.modalTitle}>Términos y Condiciones</Text>
              <ScrollView style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  {`Última actualización: 27 de noviembre de 2024

Bienvenido a Transporte Motorizado Plus (TMPlus). Al utilizar nuestra aplicación, usted acepta cumplir con estos Términos y Condiciones. Si no está de acuerdo con ellos, no debe utilizar la aplicación.

1. Definiciones
1.1. TMPlus: Plataforma que conecta a propietarios de motocicletas con usuarios interesados en alquilarlas.
1.2. Usuario: Persona que utiliza la aplicación, ya sea como propietario, arrendatario o visitante.
1.3. Propietario: Usuario que ofrece su motocicleta para alquilarla a través de la aplicación.
1.4. Arrendatario: Usuario que alquila una motocicleta a través de la plataforma.

2. Uso de la Plataforma
2.1. Registro: El uso de TMPlus requiere un registro válido con información real y actualizada.
2.2. Edad Mínima: Los usuarios deben tener al menos 18 años para utilizar la plataforma.
2.3. Responsabilidad del Usuario: Los usuarios son responsables de mantener la confidencialidad de su cuenta y aceptan todas las actividades realizadas bajo su nombre de usuario.

3. Condiciones del Alquiler
3.1. Propietarios:
- Los propietarios son responsables de garantizar que las motocicletas que ponen a disposición cumplen con todas las leyes locales, están en buen estado mecánico y cuentan con los seguros necesarios para el alquiler.
- TMPlus no asume ninguna responsabilidad por los daños, accidentes o incidentes que ocurran durante el uso de las motocicletas registradas en la plataforma.

3.2. Arrendatarios:
- Los arrendatarios son responsables de verificar el estado de la motocicleta antes de alquilarla y de cumplir con las condiciones establecidas por el propietario.
- Los arrendatarios son responsables de cualquier daño o pérdida ocurrida durante el periodo de alquiler.

4. Limitación de Responsabilidad
4.1. **Deslinde de Responsabilidad**:
- TMPlus actúa únicamente como intermediario y no es responsable de los acuerdos entre los propietarios y arrendatarios, ni de los daños que puedan ocurrir durante el alquiler de la motocicleta.
- TMPlus no asume ninguna responsabilidad por accidentes, daños a la propiedad, daños a la persona, pérdidas, costos o cualquier otro tipo de daño que pueda surgir como resultado de la interacción entre los usuarios.
- Los usuarios aceptan que utilizan la plataforma bajo su propio riesgo.

5. Conducta Prohibida
Los usuarios se comprometen a no:
- Usar la plataforma para actividades ilegales, fraudulentas o no autorizadas.
- Realizar cualquier tipo de daño o alteración a la plataforma de TMPlus.
- Registrarse motocicletas que no sean de su propiedad o que no tengan autorización para alquilarse.

6. Pagos y Tarifas
6.1. **Transacciones**:
- Todas las tarifas relacionadas con el alquiler deben ser procesadas a través de los medios establecidos por TMPlus. El usuario es responsable de pagar todas las tarifas correspondientes al alquiler.
- TMPlus se reserva el derecho de cobrar una comisión por cada transacción realizada a través de la plataforma.

7. Privacidad
7.1. TMPlus respeta la privacidad de sus usuarios y maneja la información personal conforme a su Política de Privacidad.

8. Modificaciones
TMPlus se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las actualizaciones serán publicadas en la plataforma y su uso continuado implica la aceptación de los cambios.

9. Terminación
TMPlus se reserva el derecho de suspender o cancelar las cuentas de usuarios que violen estos Términos y Condiciones. La cancelación de la cuenta no exime a los usuarios de sus responsabilidades previas.

10. Ley Aplicable
Estos Términos y Condiciones se rigen por las leyes de México. Cualquier disputa relacionada con el uso de la plataforma será resuelta en los tribunales de Michoacán, México.

11. Contacto
Si tiene preguntas o inquietudes sobre estos Términos y Condiciones, puede contactarnos en:
Correo: soporte.tmplus@gmail.com

Al utilizar TMPlus, usted confirma que ha leído, entendido y aceptado estos Términos y Condiciones y que exime a TMPlus de cualquier responsabilidad relacionada con el uso de la plataforma.`}
                </Text>
              </ScrollView>
              <Button title="Cerrar" onPress={() => setShowTerms(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Centrado horizontal y vertical
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Para agregar sombra en dispositivos Android
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: colors.borderColor,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: colors.primaryTextLight,
    borderRadius: 4,
  },
  errorInput: {
    borderColor: "red",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    color: colors.primaryTextLight,
    marginLeft: 10,
  },
  link: {
    color: colors.primaryButtonColor,
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primaryTextLight,
    marginBottom: 10,
  },
  termsContainer: {
    marginBottom: 20,
    maxHeight: 300,
  },
  termsText: {
    color: colors.primaryTextLight,
  },
});
