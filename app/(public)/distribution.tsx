import Button from "@/components/Button";
import Datepicker from "@/components/Datepicker";
import Gap from "@/components/Gap";
import HeaderBack from "@/components/HeaderBack";
import Input from "@/components/Input";
import InputFile from "@/components/InputFile";
import KeyboardAvoiding from "@/components/KeyboardAvoiding";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import Text from "@/components/Text";
import RecipientServices from "@/services/recipientServices";
import {
  setDate,
  setDescription,
  setDistributionPhoto,
  setIdPhoto,
  setRecipient,
  setTotal,
} from "@/stores/Distributions/DistributionActions";
import {
  distributionReducer,
  initialState,
} from "@/stores/Distributions/DistributionsStore";
import useRecipientStore, {
  RecipientModel,
} from "@/stores/Recipients/RecipientStore";
import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import LoadingHelper from "@/utils/LoadingHelper";
import NavigationServices from "@/utils/NavigationServices";
import { scaleSize } from "@/utils/Normalize";
import { formatRupiah } from "@/utils/StringUtils";
import ToastHelper from "@/utils/ToastHelper";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import moment from "moment";
import "moment/locale/id";
import React, { useCallback, useReducer, useRef, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const BASE_URL = "http://202.10.36.37/";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const Distribution = () => {
  const ref = useRef<Modal | null>(null);

  const currentYear: number = moment().year();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const [state, dispatch] = useReducer(distributionReducer, initialState);

  const [dataFetched, setDataFetched] = useState(false);
  const [last, setLast] = useState<any>(null);
  const [isSelected, setIsSelected] = useState("");

  const { data }: any = useRecipientStore((state: RecipientModel) => state);

  const chooseImage = useCallback((label: string) => {
    setIsSelected(label);
    ref.current?.show();
  }, []);

  const takeAPhoto = useCallback(async () => {
    let response = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 0.5,
    });
    ref.current?.hide();
    const { assets }: any = response;
    const photo = {
      name: assets?.[0].fileName,
      type: assets?.[0].mimeType,
      uri:
        Platform.OS === "ios"
          ? assets?.[0].uri.replace("file://", "")
          : assets?.[0].uri,
    };

    if (!response.canceled) {
      if (assets?.[0].fileSize > MAX_FILE_SIZE) {
        ToastHelper.show({
          type: "danger",
          message: "Image size exceeds 10MB. Please choose a smaller image.",
        });
        return;
      }
      if (isSelected === "idPhoto") {
        dispatch(setIdPhoto(photo));
      }
      if (isSelected === "distributionPhoto") {
        dispatch(setDistributionPhoto(photo));
      }
    }
  }, [isSelected]);

  const chooseFromGallery = useCallback(async () => {
    let response = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      quality: 0.5,
    });
    ref.current?.hide();
    const { assets }: any = response;

    const photo = {
      name: assets?.[0].fileName,
      type: assets?.[0].mimeType,
      uri:
        Platform.OS === "ios"
          ? assets?.[0].uri.replace("file://", "")
          : assets?.[0].uri,
    };
    if (!response.canceled) {
      if (assets?.[0].fileSize > MAX_FILE_SIZE) {
        ToastHelper.show({
          type: "danger",
          message: "Image size exceeds 10MB. Please choose a smaller image.",
        });
        return;
      }
      if (isSelected === "idPhoto") {
        dispatch(setIdPhoto(photo));
      }
      if (isSelected === "distributionPhoto") {
        dispatch(setDistributionPhoto(photo));
      }
    }
  }, [isSelected]);

  const onSelectedRecipiet = useCallback(async (text: any) => {
    LoadingHelper.show();
    dispatch(setRecipient(text));
    try {
      const res = await RecipientServices.getLastDistribution(text.id);
      const { last_distribution, recipient } = res.data.data;

      if (res.status === 200) {
        setDataFetched(true);
        setLast(last_distribution);

        const split = recipient.ktp_photo.split("public");

        const reformatted = "storage" + split[1];

        const photo = {
          name: recipient.name,
          type: "image/png",
          uri: BASE_URL + reformatted,
        };
        dispatch(setIdPhoto(photo));
        setTimeout(() => {
          LoadingHelper.hide();
        }, 1000);
      }
    } catch (error: any) {
      setDataFetched(true);
      setLast(null);
      setTimeout(() => {
        LoadingHelper.hide();
      }, 1000);
    }
  }, []);

  const isFormComplete = useCallback(() => {
    return (
      state.recipient &&
      state.date &&
      state.total &&
      state.idPhoto &&
      state.distributionPhoto
    );
  }, [state]);

  const onSubmit = useCallback(async () => {
    LoadingHelper.show();
    const formData = new FormData();

    formData.append("recipient_id", state.recipient.id);
    formData.append("date", moment(state.date).format("DD-MM-YYYY"));
    formData.append("year", currentYear.toString());
    formData.append("stage", last?.stage ? last.stage + 1 : "1");
    formData.append("amount", state.total.replace(/[^,\d]/g, ""));
    formData.append("notes", state.description ?? "-");

    const createFile = (file: { name: string; type: string; uri: string }) => {
      return {
        uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
        name: file.name,
        type: file.type,
      };
    };

    if (state.idPhoto) {
      const idPhoto = createFile({
        name: state.idPhoto.name,
        type: state.idPhoto.type,
        uri: state.idPhoto.uri,
      });
      formData.append("ktp_photo", idPhoto as any);
    }

    if (state.distributionPhoto) {
      const distributionPhoto = createFile({
        name: state.distributionPhoto.name,
        type: state.distributionPhoto.type,
        uri:
          Platform.OS === "ios"
            ? state.distributionPhoto.uri.replace("file://", "")
            : state.distributionPhoto.uri,
      });
      formData.append("recipient_photo", distributionPhoto as any);
    }

    try {
      const res = await RecipientServices.submitDistribution(formData);

      if (res.status === 201) {
        LoadingHelper.hide();
        ToastHelper.show({
          type: "success",
          message: "Data berhasil disimpan",
        });
        NavigationServices.goBack();
      }
    } catch (error: any) {
      LoadingHelper.hide();
      ToastHelper.show({
        type: "danger",
        message: error.message,
      });
    }
  }, [state]);

  const handleTotalChange = useCallback((text: string) => {
    const formattedText = formatRupiah(text);
    dispatch(setTotal(formattedText));
  }, []);

  return (
    <SafeAreaView style={[GlobalTheme.full, { backgroundColor }]}>
      <View style={styles.page}>
        <HeaderBack title="Distribusikan" />
        <KeyboardAvoiding>
          <Select
            data={data}
            label="Penerima"
            value={state?.recipient?.name ?? "Pilih Penerima"}
            onPress={(text) => onSelectedRecipiet(text)}
          />
          <Gap height={16} />
          <Select
            data={[]}
            label="Tahun"
            value={currentYear.toString()}
            disabled
          />
          <Gap height={16} />
          <Select
            data={[]}
            label="Tahap"
            value={dataFetched && last?.stage ? last.stage + 1 : "1"}
            disabled
          />
          <Gap height={16} />
          <Input
            label="Jumlah"
            value={state.total}
            placeholder="Masukkan Jumlah"
            onChangeText={handleTotalChange}
            keyboardType="number-pad"
          />
          <Gap height={16} />
          <Datepicker
            label="Tanggal"
            value={state.date}
            onPress={(date) => dispatch(setDate(date))}
          />
          <Gap height={16} />
          <InputFile
            value={state.idPhoto}
            label="Foto KTP"
            onPress={() => chooseImage("idPhoto")}
          />
          <Gap height={16} />
          <InputFile
            value={state.distributionPhoto}
            label="Bukti Pendistribusian"
            onPress={() => chooseImage("distributionPhoto")}
          />
          <Gap height={16} />
          <Input
            value={state.description}
            label="Keterangan"
            placeholder="Masukkan Keterangan"
            onChangeText={(text) => dispatch(setDescription(text))}
          />
          <Gap height={24} />
          <Button
            text="Simpan"
            onPress={onSubmit}
            disabled={!isFormComplete()}
          />
          <Gap height={64} />
        </KeyboardAvoiding>
      </View>

      <Modal ref={ref}>
        <View style={styles.modal}>
          <Text type="SemiBold" size="SM">
            Pilih dari
          </Text>
          <Gap height={12} />
          <View style={[GlobalTheme.row, GlobalTheme.center]}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={GlobalTheme.center}
              onPress={takeAPhoto}
            >
              <Ionicons
                name="camera-outline"
                size={40}
                color={Colors.light.neutral[700]}
              />
              <Text size="XS">Kamera</Text>
            </TouchableOpacity>
            <Gap width={32} />
            <TouchableOpacity
              activeOpacity={0.7}
              style={GlobalTheme.center}
              onPress={chooseFromGallery}
            >
              <Ionicons
                name="image-outline"
                size={40}
                color={Colors.light.neutral[700]}
              />
              <Text size="XS">Galeri</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Distribution;

const styles = StyleSheet.create({
  page: {
    padding: scaleSize(20),
  },
  modal: {
    width: "100%",
    padding: scaleSize(20),
    backgroundColor: Colors.light.white,
    borderRadius: scaleSize(16),
  },
});
