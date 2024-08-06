import CardSkeleton from "@/components/CardSkeleton";
import Gap from "@/components/Gap";
import Loader from "@/components/Loader";
import Text from "@/components/Text";
import useRecipientStore, {
  RecipientModel,
} from "@/stores/Recipients/RecipientStore";
import useSessionStore, { SessionModel } from "@/stores/Sessions/SessionsStore";
import { Colors } from "@/themes/Colors";
import { GlobalTheme } from "@/themes/Styles";
import NavigationServices from "@/utils/NavigationServices";
import { scaleSize } from "@/utils/Normalize";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";

import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const Recipient = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { user }: any = useSessionStore((item: SessionModel) => item);
  const {
    data,
    initialLoading,
    loading,
    page,
    getRecipientByVillage,
    setLoading,
    setInitialLoading,
  }: any = useRecipientStore((state: RecipientModel) => state);

  useEffect(() => {
    setInitialLoading(true);
    getRecipientByVillage(page, user?.village?.id).then(() =>
      setDataFetched(true)
    );
  }, []);

  const loadMore = useCallback(() => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        getRecipientByVillage(page, user?.village?.id);
        setLoading(false);
      }, 1000);
    }
  }, [getRecipientByVillage, user, loading, page, setLoading]);

  const onRefresh = useCallback(() => {
    setInitialLoading(true);
    setRefreshing(true);
    getRecipientByVillage(1, user?.village?.id).then(() => {
      setRefreshing(false);
      setDataFetched(true);
    });
  }, [getRecipientByVillage, user, setInitialLoading]);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <View style={[styles.item, GlobalTheme.row]}>
        <Image
          style={styles.image}
          source={`https://ui-avatars.com/api/?name=${item?.name}`}
          contentFit="contain"
          transition={1000}
        />
        <Gap width={16} />
        <View style={styles.content}>
          <Text size="SM">{item.name}</Text>
          <Text size="SM">{item.nik}</Text>
        </View>
      </View>
    );
  }, []);

  const renderFooter = useCallback(
    () =>
      loading && (
        <>
          <Gap height={16} />
          <Loader active={loading} />
        </>
      ),
    [loading]
  );

  const renderEmptyState = useCallback(
    () =>
      !initialLoading && (
        <View style={[GlobalTheme.center, { marginTop: "75%" }]}>
          <Text type="SemiBold" size="LG">
            Belum Ada Data
          </Text>
        </View>
      ),
    [initialLoading]
  );

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 50;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onPress = useCallback(() => {
    NavigationServices.navigate("/distribution");
  }, []);

  return (
    <SafeAreaView style={[GlobalTheme.full, { backgroundColor }]}>
      {initialLoading || !dataFetched ? (
        <View style={styles.container}>
          {[...Array(10)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </View>
      ) : (
        <FlashList
          keyExtractor={(_, index) => index.toString()}
          data={data}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              loadMore();
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.light.primary[500]]}
            />
          }
          estimatedItemSize={200}
        />
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.fab, GlobalTheme.center]}
        onPress={onPress}
      >
        <Ionicons name="add-outline" size={32} color={Colors.dark.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Recipient;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleSize(20),
  },
  item: {
    paddingVertical: scaleSize(12),
    borderBottomWidth: 0.2,
    borderColor: Colors.dark.neutral[500],
  },
  content: {
    width: "90%",
  },
  image: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
  },
  fab: {
    position: "absolute",
    bottom: scaleSize(20),
    right: scaleSize(20),
    width: scaleSize(48),
    height: scaleSize(48),
    borderRadius: scaleSize(24),
    backgroundColor: Colors.dark.primary[800],
  },
});
