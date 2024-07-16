import { View, StyleSheet, Text, ScrollView } from "react-native";

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.paragraph}>
        Bienvenido a nuestra aplicación, una herramienta integral diseñada para
        asistir a los aspirantes a formar parte de las fuerzas policiales en su
        proceso de preparación y estudio. Entendemos que el camino hacia una
        carrera en la policía es riguroso y desafiante, y por ello hemos
        desarrollado una plataforma que facilita el acceso a recursos educativos
        y evaluaciones prácticas.
      </Text>
      <Text style={styles.subTitle}>Objetivos y Funcionalidades</Text>
      <Text style={styles.paragraph}>
        Nuestra aplicación se centra en proporcionar un entorno de aprendizaje
        estructurado y accesible. Los usuarios pueden:
      </Text>
      <Text style={styles.bulletPoint}>
        • Realizar Exámenes Simulados: Ofrecemos una variedad de exámenes
        simulados que reflejan los formatos y contenidos de las pruebas
        oficiales. Esto permite a los aspirantes familiarizarse con el tipo de
        preguntas y mejorar sus habilidades de gestión del tiempo.
      </Text>
      <Text style={styles.bulletPoint}>
        • Buscar y Estudiar Preguntas: Contamos con una base de datos extensa de
        preguntas de práctica, organizadas por tema y dificultad. Los usuarios
        pueden buscar preguntas específicas o estudiar por categorías para
        fortalecer sus conocimientos en áreas particulares.
      </Text>
      
      <Text style={styles.subTitle}>Compromiso con la Excelencia</Text>
      <Text style={styles.paragraph}>
        Nos comprometemos a ofrecer una experiencia de usuario de alta calidad,
        con una interfaz intuitiva y recursos actualizados regularmente para
        reflejar los cambios en los procedimientos y contenidos de los exámenes
        oficiales.
      </Text>
      <Text style={styles.subTitle}>Seguridad y Privacidad</Text>
      <Text style={styles.paragraph}>
        Entendemos la importancia de la privacidad y seguridad de la información
        personal. Nuestra aplicación cumple con los más altos estándares de
        seguridad para proteger los datos de nuestros usuarios, asegurando que su
        información esté siempre segura y confidencial.
      </Text>
      <Text style={styles.subTitle}>Nuestro Equipo</Text>
      <Text style={styles.paragraph}>
        Nuestro equipo está compuesto por profesionales con experiencia en
        educación, tecnología y seguridad pública, todos dedicados a brindar el
        mejor soporte posible a los aspirantes a policías. Trabajamos
        constantemente para mejorar y actualizar nuestra aplicación, asegurando
        que nuestros usuarios tengan acceso a las mejores herramientas
        disponibles.
      </Text>
      <Text style={styles.subTitle}>Conclusión</Text>
      <Text style={styles.paragraph}>
        Nuestra aplicación es más que una herramienta de estudio; es un compañero
        en el camino hacia una carrera en la policía. A través de recursos
        educativos robustos, evaluaciones prácticas y un seguimiento continuo del
        progreso, buscamos empoderar a nuestros usuarios para que alcancen sus
        metas con confianza y preparación.
      </Text>
      <Text style={styles.paragraph}>
        Gracias por elegir nuestra aplicación como su recurso de estudio. Estamos
        aquí para apoyar su éxito en cada paso del camino.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#2c3e50",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#34495e",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#7f8c8d",
    textAlign: "justify",
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: "#7f8c8d",
    marginLeft: 10,
    textAlign: "justify",
  },
});

export default AboutScreen;
