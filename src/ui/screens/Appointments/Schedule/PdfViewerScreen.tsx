import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "@themes/ThemeContext";
import { WebView } from "react-native-webview";

function getPublicDropboxUrl(url: string): string {
  // Si es un link de dropbox, transformar a formato público descargable
  if (url.includes("dropbox.com")) {
    // Reemplazar /preview/ o /s/ o /sh/ por /s/ y forzar ?dl=1
    let newUrl = url.replace("/preview", "");
    newUrl = newUrl.replace("?dl=0", "?dl=1");
    if (!newUrl.endsWith("?dl=1")) {
      if (newUrl.includes("?")) {
        newUrl = newUrl.split("?")[0] + "?dl=1";
      } else {
        newUrl += "?dl=1";
      }
    }
    return newUrl;
  }
  return url;
}

function getPublicDriveUrl(url: string): string {
  // Si es un link de Google Drive, transformar a formato público
  // Ejemplo: https://drive.google.com/file/d/ID/view?usp=sharing
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/([\w-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return url;
}

const PdfViewerScreen = () => {
  const route = useRoute();
  const { theme } = useTheme();
  const { pdfUrl, pdfName } = route.params as {
    pdfUrl: string;
    pdfName: string;
  };

  let publicUrl = getPublicDropboxUrl(pdfUrl);
  publicUrl = getPublicDriveUrl(publicUrl);
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(publicUrl)}`;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <WebView
        source={{ uri: viewerUrl }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: "100%",
  },
});

export default PdfViewerScreen;
