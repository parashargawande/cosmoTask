import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import { useApp } from "src/context/appContext";
import { styles } from "src/screens/registerUser/styles";
import SignoutAvatar from "src/components/SignoutAvatar";

interface SettingsProps {
  navigation: NavigationProp<any>;
}

const LoadingIcon = (props: any) => <List.Icon {...props} icon="loading" />;
const PageIcon = ({ icon }: { icon: string }) => <List.Icon icon={icon} />;

const Settings = ({ navigation }: SettingsProps) => {
  const { user } = useApp();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 16,
    },
    listItem: {
      backgroundColor: theme.colors.surface,
      marginBottom: 8,
      borderRadius: 8,
    },
  });

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <List.Item title="Loading..." left={LoadingIcon} />
      </View>
    );
  }

  const pages = [
    { title: "My Details", icon: "account", route: "UserDetails" },
    { title: "My Horoscope", icon: "star", route: "MyHoroscope" },
    { title: "Signout", icon: "cog", route: "Signout" },
  ];

  const renderPageIcon = (icon: string) => <PageIcon icon={icon} />;

  return (
    <View style={styles.container}>
      {pages.map((page) => (
        <List.Item
          key={page.route}
          title={page.title}
          left={() => renderPageIcon(page.icon)}
          style={styles.listItem}
          onPress={() => navigation.navigate(page.route)}
        />
      ))}
    </View>
  );
};

const screenOptions = {
  headerShown: false,
  tabBarIcon: SignoutAvatar
};

export default Settings;
export { Settings as SettingsScreen, screenOptions };
