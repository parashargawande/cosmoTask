import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CommonActions, NavigationProp } from "@react-navigation/native";

import CrossPlatformDatePicker from "./CrossPlatformDatePicker";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LocationInput from "./LocationInput";
import { useApp } from "../../context/appContext";
import {
  addUserDetails,
  readUserDetails,
} from "src/services/userDetail.service";
import { styles } from "./styles";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  birthLocation: yup
    .object({
      name: yup.string().required("Location name is required"),
      coordinates: yup.string().required("Coordinates are required"),
    })
    .required("Birth location is required"),
  dob: yup.string().required("Date of birth is required"),
  birthTime: yup.string().required("Time of birth is required"),
});

interface IRegisterUser {
  navigation: NavigationProp<any>;
}

const RegisterUser = ({ navigation }: IRegisterUser) => {
  const [birthTime, setBirthTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useApp();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
    const setForm = (form: any) => {
      if (form) {
        setValue("fullName", form.fullName);
        setValue("dob", form.dob);
        setValue("birthTime", form.birthTime);
        setValue("birthLocation", form.birthLocation);

        const state = navigation.getState();
        const previousRoute = state.routes[state.index - 1]?.name || null;
        if (previousRoute === "Login") {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "MainApp" }],
            })
          );
        }
      }
      setLoading(false);
    };
    try {
      const unsubscribe = readUserDetails(setForm);
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.log("Error reading user details:", error);
    }
  }, [user, navigation]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log("Form submitted with data:", data);
    console.log(data);

    try {
      await addUserDetails(data);
      Alert.alert("Success", "User registered successfully!");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        })
      );
    } catch (error) {
      console.error("Error adding user details:", error);
      Alert.alert("Error", "Failed to register user. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f0f4f8",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>Full Name</Text>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.fullName && (
        <Text style={styles.error}>{errors.fullName.message}</Text>
      )}

      <Text style={styles.label}>Birth Location</Text>
      <Controller
        control={control}
        name="birthLocation"
        rules={{ required: "Birth location is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <LocationInput value={value} onChange={onChange} />
            {error && <Text style={{ color: "red" }}>{error.message}</Text>}
          </>
        )}
      />
      {errors.birthLocation && (
        <Text style={styles.error}>{errors.birthLocation.message}</Text>
      )}

      <Text style={styles.label}>Date of Birth</Text>
      <Controller
        control={control}
        name="dob"
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.pickerButton}
          >
            <Text>
              {value
                ? new Date(value).toDateString()
                : birthTime.toDateString()}
            </Text>
          </TouchableOpacity>
        )}
      />
      {showDatePicker && (
        <CrossPlatformDatePicker
          setShowDtPicker={setShowDatePicker}
          setValue={setValue}
          dateTime={birthTime}
          setDateTime={setBirthTime}
          mode="date"
          fieldName="dob"
        />
      )}
      {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}

      <Text style={styles.label}>Time of Birth</Text>
      <Controller
        control={control}
        name="birthTime"
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={styles.pickerButton}
          >
            <Text>
              {value
                ? new Date(value).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : birthTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
            </Text>
          </TouchableOpacity>
        )}
      />
      {showTimePicker && (
        <CrossPlatformDatePicker
          setShowDtPicker={setShowTimePicker}
          setValue={setValue}
          dateTime={birthTime}
          setDateTime={setBirthTime}
          mode="time"
          fieldName="birthTime"
        />
      )}
      {errors.birthTime && (
        <Text style={styles.error}>{errors.birthTime.message}</Text>
      )}

      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Register" onPress={handleSubmit(onSubmit)} />
        )}
      </View>
    </View>
  );
};

export default RegisterUser;
