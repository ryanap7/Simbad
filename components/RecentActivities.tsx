import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import { scaleSize } from "@/utils/Normalize";
import { NumberFormatter } from "@/utils/StringUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Gap from "./Gap";
import Text from "./Text";
import LoadingHelper from "@/utils/LoadingHelper";
import ToastHelper from "@/utils/ToastHelper";
import API from "@/config/Axios";
import useSessionStore, { SessionModel } from "@/stores/Sessions/SessionsStore";
import CardSkeleton from "./CardSkeleton";

const DATA: any[] = [1, 2, 3, 4, 5];

const RecentActivities = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const { user }: any = useSessionStore((state: SessionModel) => state);

  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const getLogs = useCallback(async () => {
    try {
      const res = await API.get(`/logs/${user?.id}`);

      const { data } = res.data;

      if (res.status === 200) {
        setData(data);

        setTimeout(() => {
          setDataFetched(true);
          setInitialLoading(false);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setDataFetched(true);
        setInitialLoading(false);
      }, 1000);
    }
  }, [user?.id]);

  useEffect(() => {
    getLogs();
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    const parts = item.message.split("sebesar");
    const name = parts[0].split("Kamu baru saja mendistribusikan ke")[1].trim();
    const nominal = parts[1].trim();

    return (
      <View style={[styles.item, GlobalTheme.row]}>
        <View
          style={[
            styles.icon,
            GlobalTheme.center,
            { backgroundColor: Colors.dark.neutral[200] },
          ]}
        >
          <Ionicons
            name="wallet-outline"
            size={20}
            color={Colors.dark.neutral[800]}
          />
        </View>
        <Gap width={16} />
        <View style={styles.content}>
          <Text size="SM">
            Kamu baru saja mendistribusikan ke{" "}
            <Text
              type="SemiBold"
              size="SM"
              lightColor={Colors.light.primary[800]}
              darkColor={Colors.light.primary[800]}
            >
              {name}
            </Text>
            {" sebesar "}
            <Text
              type="SemiBold"
              size="SM"
              lightColor={Colors.light.primary[800]}
              darkColor={Colors.light.primary[800]}
            >
              {nominal}
            </Text>
          </Text>
        </View>
      </View>
    );
  }, []);

  const renderHeader = useCallback(
    () => <Text type="Medium">Aktifitas Terbaru</Text>,
    []
  );

  const renderEmptyState = useCallback(
    () =>
      !initialLoading && (
        <View style={[GlobalTheme.center, { marginTop: "50%" }]}>
          <Text type="Medium" size="SM">
            Belum Ada Data
          </Text>
        </View>
      ),
    [initialLoading]
  );

  return (
    <View style={[styles.container, GlobalTheme.shadow, { backgroundColor }]}>
      {initialLoading || !dataFetched ? (
        <View style={styles.container}>
          {renderHeader()}
          {[...Array(5)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </View>
      ) : (
        <FlashList
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={styles.header}
          ListEmptyComponent={renderEmptyState}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          bounces={false}
        />
      )}
    </View>
  );
};

export default RecentActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scaleSize(16),
    paddingHorizontal: scaleSize(20),
  },
  header: {
    marginBottom: scaleSize(12),
  },
  item: {
    paddingVertical: scaleSize(12),
    borderBottomWidth: 0.2,
    borderColor: Colors.dark.neutral[500],
  },
  icon: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(8),
  },
  content: {
    width: "90%",
  },
});
